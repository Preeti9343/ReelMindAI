
import json
import shutil
import subprocess
from pathlib import Path


def check_ffmpeg():
    if not shutil.which("ffmpeg") or not shutil.which("ffprobe"):
        raise RuntimeError("FFmpeg or FFprobe is not available in PATH.")


def get_video_info(video_path):
    check_ffmpeg()

    command = [
        "ffprobe", "-v", "error",
        "-show_entries",
        "format=duration:stream=codec_type,width,height",
        "-of", "json",
        str(video_path),
    ]

    result = subprocess.run(
        command,
        capture_output=True,
        text=True,
        check=True,
    )

    data = json.loads(result.stdout)
    streams = data.get("streams", [])

    video_stream = next(
        (s for s in streams if s.get("codec_type") == "video"),
        None,
    )

    if not video_stream:
        raise RuntimeError("No video stream found.")

    return {
        "duration": float(data["format"]["duration"]),
        "width": video_stream["width"],
        "height": video_stream["height"],
        "has_audio": any(
            s.get("codec_type") == "audio" for s in streams
        ),
    }


def create_reel(video_path, output_path, segments, aspect_ratio="9:16"):
    check_ffmpeg()

    video_path = Path(video_path)
    output_path = Path(output_path)

    if not video_path.exists():
        raise FileNotFoundError("Input video not found.")

    if not segments:
        raise ValueError("At least one segment is required.")

    info = get_video_info(video_path)
    duration = info["duration"]
    has_audio = info["has_audio"]

    if aspect_ratio == "9:16":
        width, height = 1080, 1920
    elif aspect_ratio == "16:9":
        width, height = 1920, 1080
    elif aspect_ratio == "1:1":
        width, height = 1080, 1080
    else:
        raise ValueError("Supported ratios: 9:16, 16:9, 1:1")

    validated_segments = []

    for segment in segments:
        start = float(segment["start"])
        end = float(segment["end"])

        if start < 0 or end <= start or end > duration:
            raise ValueError(
                f"Invalid segment {start}-{end}. "
                f"Video duration is {duration} seconds."
            )

        validated_segments.append((start, end))

    count = len(validated_segments)
    filters = []

    # Split video into one stream per selected segment.
    video_outputs = "".join(f"[vsrc{i}]" for i in range(count))
    filters.append(f"[0:v]split={count}{video_outputs}")

    if has_audio:
        audio_outputs = "".join(f"[asrc{i}]" for i in range(count))
        filters.append(f"[0:a]asplit={count}{audio_outputs}")

    for index, (start, end) in enumerate(validated_segments):

        # Trim selected segment.
        filters.append(
            f"[vsrc{index}]trim=start={start}:end={end},"
            f"setpts=PTS-STARTPTS,"
            f"setsar=1[base{index}]"
        )

        # Smart Fit:
        # Background fills the canvas and gets blurred.
        # Foreground fits completely without cropping.
        filters.append(
            f"[base{index}]split=2[bgsrc{index}][fgsrc{index}]"
        )

        filters.append(
            f"[bgsrc{index}]"
            f"scale={width}:{height}:force_original_aspect_ratio=increase,"
            f"crop={width}:{height},"
            f"gblur=sigma=30[bg{index}]"
        )

        filters.append(
            f"[fgsrc{index}]"
            f"scale={width}:{height}:force_original_aspect_ratio=decrease,"
            f"setsar=1[fg{index}]"
        )

        filters.append(
            f"[bg{index}][fg{index}]"
            f"overlay=(W-w)/2:(H-h)/2,"
            f"setsar=1[v{index}]"
        )

        if has_audio:
            filters.append(
                f"[asrc{index}]"
                f"atrim=start={start}:end={end},"
                f"asetpts=PTS-STARTPTS[a{index}]"
            )

    if has_audio:
        inputs = "".join(
            f"[v{i}][a{i}]" for i in range(count)
        )
        filters.append(
            f"{inputs}concat=n={count}:v=1:a=1[outv][outa]"
        )
    else:
        inputs = "".join(f"[v{i}]" for i in range(count))
        filters.append(
            f"{inputs}concat=n={count}:v=1:a=0[outv]"
        )

    command = [
        "ffmpeg", "-y",
        "-i", str(video_path),
        "-filter_complex", ";".join(filters),
        "-map", "[outv]",
        "-c:v", "libx264",
        "-preset", "veryfast",
        "-crf", "18",
        "-pix_fmt", "yuv420p",
        "-movflags", "+faststart",
    ]

    if has_audio:
        command.extend(["-map", "[outa]", "-c:a", "aac", "-b:a", "192k"])
    else:
        command.append("-an")

    output_path.parent.mkdir(parents=True, exist_ok=True)
    command.append(str(output_path))

    try:
        subprocess.run(
            command,
            capture_output=True,
            text=True,
            check=True,
        )
    except subprocess.CalledProcessError as error:
        raise RuntimeError(
            error.stderr[-3000:]
            if error.stderr
            else "FFmpeg rendering failed."
        ) from error

    return get_video_info(output_path)
