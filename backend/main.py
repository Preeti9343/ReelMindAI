
from pathlib import Path
from uuid import uuid4, UUID

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from pydantic import BaseModel, Field
from typing import Literal

from scenedetect import open_video, SceneManager
from scenedetect.detectors import ContentDetector
from faster_whisper import WhisperModel

from video_processor import create_reel, get_video_info


app = FastAPI(
    title="ReelMind AI API",
    description="Backend API for ReelMind AI",
    version="1.3.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).parent

UPLOAD_DIR = BASE_DIR / "uploads"
OUTPUT_DIR = BASE_DIR / "outputs"

UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

MAX_FILE_SIZE = 500 * 1024 * 1024

ALLOWED_EXTENSIONS = {
    ".mp4",
    ".mov",
    ".webm",
    ".m4v",
}

whisper_model = None


class ReelSegment(BaseModel):
    start: float = Field(ge=0)
    end: float = Field(gt=0)


class ReelRequest(BaseModel):
    segments: list[ReelSegment] = Field(min_length=1)
    aspect_ratio: Literal["9:16", "16:9", "1:1"] = "9:16"


def get_whisper_model():
    global whisper_model

    if whisper_model is None:
        whisper_model = WhisperModel(
            "base",
            device="cpu",
            compute_type="int8",
        )

    return whisper_model


def get_video_path(file_id: str):
    try:
        valid_id = UUID(file_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid video ID")

    matching_files = list(UPLOAD_DIR.glob(f"{valid_id}.*"))

    if not matching_files:
        raise HTTPException(status_code=404, detail="Video not found")

    return valid_id, matching_files[0]


@app.get("/")
def home():
    return {
        "message": "Welcome to ReelMind AI Backend!",
        "status": "running",
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "ReelMind AI Backend",
    }


@app.post("/upload")
async def upload_video(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No filename provided")

    original_filename = Path(file.filename).name
    extension = Path(original_filename).suffix.lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Unsupported video format. Allowed: MP4, MOV, WEBM, M4V",
        )

    file_id = str(uuid4())
    saved_filename = f"{file_id}{extension}"
    file_path = UPLOAD_DIR / saved_filename

    total_size = 0

    try:
        with file_path.open("wb") as destination:
            while True:
                chunk = await file.read(1024 * 1024)

                if not chunk:
                    break

                total_size += len(chunk)

                if total_size > MAX_FILE_SIZE:
                    raise HTTPException(
                        status_code=413,
                        detail="Video is too large. Maximum size is 500 MB.",
                    )

                destination.write(chunk)

    except HTTPException:
        file_path.unlink(missing_ok=True)
        raise

    except Exception:
        file_path.unlink(missing_ok=True)
        raise HTTPException(
            status_code=500,
            detail="Could not save the uploaded video.",
        )

    finally:
        await file.close()

    return {
        "message": "Video uploaded successfully!",
        "status": "success",
        "file_id": file_id,
        "filename": original_filename,
        "saved_filename": saved_filename,
        "size_bytes": total_size,
    }


@app.post("/analyze/{file_id}")
def analyze_video(file_id: str):
    valid_id, video_path = get_video_path(file_id)

    try:
        video = open_video(str(video_path))

        scene_manager = SceneManager()
        scene_manager.add_detector(
            ContentDetector(
                threshold=27.0,
                min_scene_len=15,
            )
        )

        scene_manager.detect_scenes(video)
        scene_list = scene_manager.get_scene_list()

        scenes = []

        for index, (start, end) in enumerate(scene_list, start=1):
            scenes.append({
                "scene_number": index,
                "start_seconds": round(start.get_seconds(), 2),
                "end_seconds": round(end.get_seconds(), 2),
                "duration_seconds": round(
                    end.get_seconds() - start.get_seconds(), 2
                ),
                "start_timecode": start.get_timecode(),
                "end_timecode": end.get_timecode(),
            })

        return {
            "status": "success",
            "message": "Video scene detection completed!",
            "file_id": str(valid_id),
            "filename": video_path.name,
            "total_scenes": len(scenes),
            "scenes": scenes,
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Video analysis failed: {str(error)}",
        )


@app.post("/transcribe/{file_id}")
def transcribe_video(file_id: str):
    valid_id, video_path = get_video_path(file_id)

    try:
        model = get_whisper_model()

        segments, info = model.transcribe(
            str(video_path),
            beam_size=5,
            vad_filter=True,
        )

        transcript_segments = []

        for index, segment in enumerate(segments, start=1):
            transcript_segments.append({
                "segment_number": index,
                "start_seconds": round(segment.start, 2),
                "end_seconds": round(segment.end, 2),
                "text": segment.text.strip(),
            })

        full_text = " ".join(
            segment["text"] for segment in transcript_segments
        )

        return {
            "status": "success",
            "message": "Video transcription completed!",
            "file_id": str(valid_id),
            "filename": video_path.name,
            "language": info.language,
            "language_probability": round(
                info.language_probability, 3
            ),
            "total_segments": len(transcript_segments),
            "full_text": full_text,
            "segments": transcript_segments,
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Video transcription failed: {str(error)}",
        )


@app.get("/video-info/{file_id}")
def video_info(file_id: str):
    valid_id, video_path = get_video_path(file_id)

    try:
        info = get_video_info(video_path)

        return {
            "status": "success",
            "file_id": str(valid_id),
            "filename": video_path.name,
            **info,
        }

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail=f"Could not read video information: {str(error)}",
        )


@app.post("/create-reel/{file_id}")
def create_video_reel(file_id: str, request: ReelRequest):
    valid_id, video_path = get_video_path(file_id)

    reel_id = str(uuid4())
    output_path = OUTPUT_DIR / f"{reel_id}.mp4"

    segments = [
        {
            "start": segment.start,
            "end": segment.end,
        }
        for segment in request.segments
    ]

    try:
        result = create_reel(
            video_path=video_path,
            output_path=output_path,
            segments=segments,
            aspect_ratio=request.aspect_ratio,
        )

        return {
            "status": "success",
            "message": "Your reel has been created successfully!",
            "reel_id": reel_id,
            "source_file_id": str(valid_id),
            "filename": output_path.name,
            "duration_seconds": round(result["duration"], 2),
            "width": result["width"],
            "height": result["height"],
            "has_audio": result["has_audio"],
            "download_url": f"/download/{reel_id}",
        }

    except Exception as error:
        output_path.unlink(missing_ok=True)

        raise HTTPException(
            status_code=500,
            detail=f"Reel creation failed: {str(error)}",
        )


@app.get("/download/{reel_id}")
def download_reel(reel_id: str):
    try:
        valid_id = UUID(reel_id)
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid reel ID")

    output_path = OUTPUT_DIR / f"{valid_id}.mp4"

    if not output_path.is_file():
        raise HTTPException(status_code=404, detail="Reel not found")

    return FileResponse(
        path=output_path,
        media_type="video/mp4",
        filename=f"ReelMind_{valid_id}.mp4",
    )
