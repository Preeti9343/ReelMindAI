# ReelMind AI 🎬
### From Raw Footage to Creative Stories

ReelMind AI is an AI-powered video editing project designed to help turn raw footage into short, shareable videos.

The goal is to simplify video creation by combining video analysis, intelligent editing, and an easy-to-use workflow.

> **Project Status:** In Development

---

## ✨ Features

### Currently Implemented
- Upload video files through the backend.
- Detect scenes in uploaded videos.
- Transcribe speech using Faster Whisper.
- Retrieve video duration, resolution, and audio information.
- Trim and combine selected video segments.
- Render reels in portrait (9:16), landscape (16:9), and square (1:1) formats.
- Fit video into the selected aspect ratio using a blurred background.
- Download rendered reels as MP4 files.

### Planned Features
- AI-based selection of interesting moments and hooks.
- Automatic reel creation from long videos.
- AI-generated captions and subtitles.
- Music selection and audio mixing.
- Advanced content-aware reframing and editing controls.
- Persistent project management and user settings.

---

## 🛠️ Tech Stack

| Area | Technologies |
|---|---|
| Frontend | Next.js, React, TypeScript, Tailwind CSS |
| Backend | Python, FastAPI |
| Video Processing | FFmpeg |
| Scene Detection | PySceneDetect |
| Speech Recognition | Faster Whisper |

---

## 📁 Project Structure

```text
ReelMindAI/
├── backend/
│   ├── main.py
│   └── video_processor.py
├── frontend/
│   ├── app/
│   ├── public/
│   └── package.json
├── .gitignore
└── README.md
