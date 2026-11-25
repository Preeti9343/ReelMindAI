# ReelMind AI 🎬
### From Raw Footage to Creative Stories

ReelMind AI is an AI-powered video creation and editing platform that transforms long videos, multiple clips, and raw footage into engaging short-form videos.

The vision is to make video creation easier for everyone—from casual creators to content creators—by combining AI-powered video understanding, intelligent storytelling, automatic editing, and customizable creative controls.

**Core idea:** Upload your footage. Let AI understand the content, find meaningful moments, and help turn them into creative stories.

> **Project Status:** In Development  
> Core video processing, scene detection, speech transcription, and reel rendering are implemented. Advanced AI-powered selection, automatic storytelling, and editing features are planned.

---

## 📌 The Problem

Creating a good reel from raw footage can take significant time and effort.

Creators often need to:
- Watch long videos to find interesting moments.
- Sort and arrange multiple clips.
- Trim footage and create a coherent sequence.
- Adjust video framing for different platforms.
- Add captions, music, and voiceovers.
- Manually edit and export each version.

ReelMind AI aims to simplify this process with intelligent video analysis and AI-assisted editing.

---

## 💡 Our Vision

ReelMind AI is being designed as a universal reel creator that can work with different types of footage, including:

- Travel and vacation videos
- Weddings, birthdays, and celebrations
- Friends, family, and everyday moments
- Cooking, food, and lifestyle videos
- Dance, fitness, and sports
- Nature and outdoor footage
- Education, lectures, and tutorials
- Podcasts, interviews, and talking videos
- Mixed or randomly recorded camera clips

The AI should understand the actual content of the footage instead of relying only on fixed templates.

---

## ✨ Core Features

### 1. Multiple Ways to Create Reels

ReelMind AI is planned to support different creation workflows:

**Long Video → Multiple Reels**
- Analyze a long video.
- Identify interesting moments and potential hooks.
- Generate multiple short reels from different sections.

**Multiple Clips → One Storytelling Reel**
- Analyze multiple uploaded clips.
- Understand their content and context.
- Select and arrange suitable clips into one coherent story.

**Multiple Clips → Individual Reels**
- Create separate reels from individual clips or selected groups of clips.

**Mixed Footage → Creative Stories**
- Work with unrelated or randomly recorded clips.
- Identify possible connections between clips.
- Suggest a coherent sequence or multiple story ideas.

Users should be able to choose whether they want one reel, multiple reels, or individual clip-based reels.

### 2. AI-Powered Video Understanding

The AI is planned to analyze video content, including:

- Scenes and scene changes
- Objects, people, and activities
- Actions and interactions
- Expressions and reactions
- Speech, dialogue, and meaningful sounds
- Music and silence
- Interesting moments and potential hooks
- Context and relationships between clips

The goal is to select moments based on what is actually happening in the footage.

### 3. Intelligent Moment Selection

ReelMind AI aims to identify moments that may work well in short-form content.

Planned capabilities:
- Detect interesting or meaningful moments.
- Identify potential opening hooks.
- Find highlights, reactions, and key actions.
- Use speech and visual context to understand a moment.
- Rank candidate moments for relevance and storytelling potential.
- Suggest multiple possible reel sequences.

AI selections should remain editable so users can choose, remove, or rearrange clips.

### 4. Storytelling and Automatic Editing

For multiple clips, the AI should help create a coherent sequence rather than simply joining clips randomly.

Planned capabilities:
- Select suitable clips.
- Suggest a beginning, middle, and ending.
- Arrange clips into a meaningful order.
- Trim unnecessary or less relevant portions.
- Suggest transitions and pacing.
- Create one story or multiple alternative versions.
- Allow manual editing before export.

### 5. Smart Fit and Content-Aware Reframing

Users should be able to choose the output format, while AI helps fit the footage into that format.

Planned output options:
- Portrait — 9:16
- Landscape — 16:9
- Square — 1:1
- Custom width and height

Planned fit options:
- **Auto Smart Fit:** AI analyzes the footage and suggests a suitable framing.
- **Blur Background:** Preserve the full original frame with a blurred background.
- **Fill / Crop:** Fill the output frame by cropping where appropriate.
- **Original Fit:** Preserve the original aspect ratio.
- **Manual Adjust:** Let users adjust framing themselves.
- **Custom Dimensions:** Choose a specific output width and height.

The long-term goal is to analyze subject position, important visual content, and scene context before choosing how each scene should be framed.

Different scenes may need different framing. Users should be able to override AI suggestions and adjust the result manually.

### 6. Video Editing Controls

Planned editing controls include:

- Trim and split clips
- Reorder and merge clips
- Remove selected clips
- Adjust clip duration
- Change aspect ratio and output dimensions
- Crop and reposition footage
- Apply transitions
- Adjust speed and slow motion
- Add zoom and visual effects
- Add on-screen text
- Preview edits before export
- Manually adjust AI-generated edits

### 7. Captions and Content Generation

ReelMind AI aims to generate content suggestions based on the actual video.

Planned capabilities:
- Speech transcription with timestamps
- Automatic captions and subtitles
- Caption styling and positioning
- Hook suggestions
- Reel titles and descriptions
- Social media captions
- Hashtag suggestions
- Calls to action
- Voiceover script suggestions

The AI should avoid inventing events or details that are not supported by the footage.

### 8. Voiceover and Audio Controls

Planned audio options:

- Keep original audio
- Music only
- Original voice + background music
- Mute audio

Planned voiceover features:
- Generate a voiceover script from the video.
- Preview AI-generated voiceovers.
- Choose between available AI voices.
- Record or upload the user's own voice.
- Use the user's voice or an AI voice for narration.
- Sync voiceover, captions, and video timing.
- Adjust audio levels and timing.
- Use properly licensed music.

### 9. Multiple Languages

The initial language focus is:

- Hindi
- English
- Hinglish

The longer-term vision includes support for additional languages for transcription, captions, and voiceover.

### 10. Projects and Export

Planned project workflow:
- Save and revisit projects.
- Keep original footage and generated reels organized.
- Preview the final reel.
- Export the selected version.
- Download completed videos.
- Manage generated reels and project files.

---

## 🔐 Privacy and Security

Privacy is an important part of the product vision.

Planned protections include:
- Secure user authentication.
- Email verification and password reset.
- Optional two-factor authentication.
- Private user uploads.
- Authorization checks to prevent access to another user's files.
- Secure storage and controlled download links.
- Encryption for stored data and transfers.
- User-controlled deletion and account deletion.
- Export of user data.
- No use of private uploads for model training without user opt-in.

ReelMind AI is not intended to use face recognition as a default feature.

### User-Controlled Storage and Retention

Users should be able to choose how long their content is retained.

Planned retention options:
- 7 days
- 30 days
- 90 days
- 6 months
- 1 year
- Custom duration

Users should be able to change retention settings and choose separate policies for original videos, generated reels, voice recordings, and project data.

The system should support automatic deletion, manual deletion, and clear information about when stored content will be removed.

---

## 🛠️ Technology Stack

The current implementation uses:

| Area | Technology |
|---|---|
| Frontend | Next.js, React, TypeScript, Tailwind CSS |
| Backend API | Python, FastAPI |
| Video Processing | FFmpeg |
| Scene Detection | PySceneDetect |
| Speech Recognition | Faster Whisper |

The broader technical direction may include:

- PostgreSQL for project and user metadata
- Redis and background workers for long-running jobs
- Object storage for video files
- Computer vision and audio analysis
- AI models for content understanding and moment selection
- Text-to-speech for voiceover generation
- Automated testing and containerized deployment

These additional components are part of the planned architecture and may change during development.

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
```

---

## 🚀 Getting Started

### Prerequisites

- Python 3.10 or later
- Node.js and npm
- FFmpeg installed and available in your system PATH
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Preeti9343/ReelMindAI.git
cd ReelMindAI
```

### 2. Set Up the Backend

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

Install the backend dependencies required by the project, then start the server:

```powershell
uvicorn main:app --reload
```

The backend runs at:

```text
http://127.0.0.1:8000
```

Interactive API documentation:

```text
http://127.0.0.1:8000/docs
```

### 3. Set Up the Frontend

Open a new terminal from the project root:

```powershell
cd frontend
npm install
npm run dev
```

Open the application at:

```text
http://localhost:3000
```

---

## 🔌 Current Backend API

| Method | Endpoint | Purpose |
|---|---|---|
| `GET` | `/health` | Check backend health |
| `POST` | `/upload` | Upload a video |
| `POST` | `/analyze/{file_id}` | Detect scenes |
| `POST` | `/transcribe/{file_id}` | Transcribe speech |
| `GET` | `/video-info/{file_id}` | Retrieve video information |
| `POST` | `/create-reel/{file_id}` | Render a reel from selected segments |
| `GET` | `/download/{reel_id}` | Download a rendered reel |

---

## 🗺️ Development Roadmap

### Current Foundation
- [x] Video upload
- [x] Scene detection
- [x] Speech transcription
- [x] Video information extraction
- [x] Segment-based reel rendering
- [x] Basic aspect ratio options
- [x] Blurred-background fit
- [x] Rendered reel download

### AI Reel Creation
- [ ] AI-powered moment selection
- [ ] Automatic highlight detection
- [ ] Long video to multiple reels
- [ ] Multiple clips to one storytelling reel
- [ ] Multiple clips to individual reels
- [ ] Mixed-footage story suggestions

### Editing and Content
- [ ] AI-generated captions and subtitles
- [ ] Hook, title, and caption suggestions
- [ ] Music selection and audio mixing
- [ ] Voiceover generation and synchronization
- [ ] Advanced content-aware reframing
- [ ] Custom output dimensions
- [ ] Advanced timeline editing

### Platform and Privacy
- [ ] User accounts and authentication
- [ ] Persistent project management
- [ ] Secure private storage
- [ ] User-controlled retention settings
- [ ] Automatic deletion and account deletion
- [ ] Production deployment and monitoring

---

## 🤝 Contributing

Suggestions, bug reports, and contributions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Submit a pull request describing the changes.

---

## 👩‍💻 Author

**Preeti Khachne**  
AI/ML Engineering | Computer Vision | NLP

GitHub: [@Preeti9343](https://github.com/Preeti9343)

---

## 📄 License

A license has not been added to this repository yet. Please check the repository for licensing information before reusing or distributing this project.
