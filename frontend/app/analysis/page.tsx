
"use client";

import { useState } from "react";
import Link from "next/link";

const API_URL = "http://127.0.0.1:8000";

const analysisItems = [
  {
    number: "01",
    icon: "🎬",
    title: "Scene Detection",
    description: "Identify different scenes and scene transitions in your video.",
    detail: "Detects scene changes and organizes footage into segments.",
  },
  {
    number: "02",
    icon: "👁️",
    title: "Object & Activity Detection",
    description: "Understand objects, people and activities visible in footage.",
    detail: "Visual understanding will be added in a later phase.",
  },
  {
    number: "03",
    icon: "🎧",
    title: "Audio Analysis",
    description: "Understand speech, music, environmental sounds and silence.",
    detail: "Audio analysis will be added in a later phase.",
  },
  {
    number: "04",
    icon: "💬",
    title: "Speech Transcription",
    description: "Convert spoken words into text with timestamps.",
    detail: "Speech transcription will be added in a later phase.",
  },
  {
    number: "05",
    icon: "⭐",
    title: "Best Moment Detection",
    description: "Discover interesting, emotional and engaging moments.",
    detail: "Interesting moment ranking will be added in a later phase.",
  },
  {
    number: "06",
    icon: "✨",
    title: "AI Reel Suggestions",
    description: "Generate reel ideas and storytelling recommendations.",
    detail: "AI reel suggestions will be added in a later phase.",
  },
];

type Scene = {
  scene_number: number;
  start_seconds: number;
  end_seconds: number;
  duration_seconds: number;
  start_timecode: string;
  end_timecode: string;
};

type AnalysisResult = {
  status: string;
  message: string;
  file_id: string;
  filename: string;
  total_scenes: number;
  scenes: Scene[];
};

export default function AnalysisPage() {
  const [fileId, setFileId] = useState(
    "a0e498f3-1b76-43f8-b264-fd0f5cec09ad"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);

  async function analyzeVideo() {
    const cleanId = fileId.trim().replace(/^["']|["']$/g, "");

    if (!cleanId) {
      setError("Please enter your video ID.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(
        `${API_URL}/analyze/${encodeURIComponent(cleanId)}`,
        {
          method: "POST",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Video analysis failed.");
      }

      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#0b0912] text-white">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-[#100d1b] p-6 md:block">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-purple-400">Reel</span>Mind AI
          </Link>

          <p className="mb-8 mt-2 text-xs text-gray-500">
            From Raw Footage to Creative Stories
          </p>

          <nav className="space-y-2 text-sm">
            <Link href="/dashboard" className="block rounded-xl px-4 py-3 text-gray-400 hover:bg-white/10">
              ◈ Dashboard
            </Link>
            <Link href="/upload" className="block rounded-xl px-4 py-3 text-gray-400 hover:bg-white/10">
              ↑ Upload Videos
            </Link>
            <Link href="/analysis" className="block rounded-xl bg-purple-600/20 px-4 py-3 text-purple-300">
              ✧ AI Analysis
            </Link>
            <Link href="/studio" className="block rounded-xl px-4 py-3 text-gray-400 hover:bg-white/10">
              ◉ Reel Studio
            </Link>
            <Link href="/voice-studio" className="block rounded-xl px-4 py-3 text-gray-400 hover:bg-white/10">
              ♫ Voice Studio
            </Link>
            <Link href="/content-studio" className="block rounded-xl px-4 py-3 text-gray-400 hover:bg-white/10">
              ✎ Content Studio
            </Link>
            <Link href="/projects" className="block rounded-xl px-4 py-3 text-gray-400 hover:bg-white/10">
              ▤ My Projects
            </Link>
            <Link href="/settings" className="block rounded-xl px-4 py-3 text-gray-400 hover:bg-white/10">
              ⚙ Settings
            </Link>
          </nav>
        </aside>

        <section className="min-w-0 flex-1 p-5 md:p-10">
          <div className="mx-auto max-w-6xl">
            <Link href="/upload" className="text-sm text-purple-400 hover:text-purple-300">
              ← Back to Upload
            </Link>

            <div className="mb-8 mt-6">
              <p className="text-sm font-medium text-purple-400">
                STEP 02 · UNDERSTAND YOUR FOOTAGE
              </p>
              <h1 className="mt-3 text-3xl font-bold md:text-4xl">
                AI Video Analysis
              </h1>
              <p className="mt-3 max-w-2xl text-gray-400">
                Let ReelMind AI understand your footage, discover interesting
                moments and find the story hidden in your videos.
              </p>
            </div>

            <div className="mb-8 rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-[#171326] p-6 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-5">
                <div>
                  <p className="text-sm text-purple-300">YOUR AI WORKSPACE</p>
                  <h2 className="mt-2 text-2xl font-bold">
                    Discover the story in every frame.
                  </h2>
                  <p className="mt-2 max-w-xl text-sm text-gray-400">
                    Start with real scene detection powered by your backend.
                  </p>
                </div>
                <div className="text-6xl">🧠</div>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-white/10 px-4 py-2 text-xs text-gray-300">
                  Visual Intelligence
                </span>
                <span className="rounded-full bg-white/10 px-4 py-2 text-xs text-gray-300">
                  Audio Understanding
                </span>
                <span className="rounded-full bg-white/10 px-4 py-2 text-xs text-gray-300">
                  Smart Storytelling
                </span>
              </div>
            </div>

            <div className="mb-8 rounded-2xl border border-purple-500/30 bg-[#14111e] p-6">
              <h2 className="text-xl font-bold">Analyze Your Video</h2>
              <p className="mt-2 text-sm text-gray-400">
                Enter the file ID received after uploading your video.
              </p>

              <div className="mt-5">
                <label className="mb-2 block text-sm text-gray-300">
                  Video File ID
                </label>

                <input
                  type="text"
                  value={fileId}
                  onChange={(e) => setFileId(e.target.value)}
                  placeholder="Enter your video UUID"
                  className="w-full rounded-xl border border-white/10 bg-[#0b0912] px-4 py-3 text-sm text-white outline-none focus:border-purple-500"
                />
              </div>

              <button
                onClick={analyzeVideo}
                disabled={loading}
                className="mt-5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 font-semibold transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Analyzing Video..." : "🎬 Analyze Video →"}
              </button>

              {loading && (
                <p className="mt-4 text-sm text-purple-300">
                  Please wait. ReelMind AI is detecting scenes in your video.
                </p>
              )}

              {error && (
                <div className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
                  {error}
                </div>
              )}
            </div>

            {result && (
              <div className="mb-8 space-y-5">
                <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-6">
                  <p className="text-sm font-medium text-green-300">
                    ✓ VIDEO ANALYSIS COMPLETED
                  </p>
                  <h2 className="mt-2 text-xl font-bold">
                    {result.filename}
                  </h2>
                  <p className="mt-2 text-sm text-gray-400">
                    {result.message}
                  </p>

                  <div className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-black/20 p-4">
                      <p className="text-3xl font-bold text-purple-300">
                        {result.total_scenes}
                      </p>
                      <p className="mt-1 text-sm text-gray-400">
                        Scenes detected
                      </p>
                    </div>
                    <div className="rounded-xl bg-black/20 p-4">
                      <p className="break-all text-sm font-semibold text-purple-300">
                        {result.file_id}
                      </p>
                      <p className="mt-2 text-sm text-gray-400">
                        Video ID
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#14111e] p-6">
                  <h2 className="text-xl font-bold">Detected Scenes</h2>
                  <p className="mt-2 text-sm text-gray-400">
                    Actual scene boundaries detected by ReelMind AI.
                  </p>

                  <div className="mt-5 space-y-3">
                    {result.scenes.map((scene) => (
                      <div
                        key={scene.scene_number}
                        className="rounded-xl border border-white/10 bg-white/5 p-4"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <h3 className="font-semibold">
                            Scene {scene.scene_number}
                          </h3>
                          <span className="rounded-full bg-purple-500/20 px-3 py-1 text-xs text-purple-300">
                            {scene.duration_seconds} sec
                          </span>
                        </div>

                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                          <div>
                            <p className="text-xs text-gray-500">Start</p>
                            <p className="mt-1 text-sm text-gray-200">
                              {scene.start_timecode}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">End</p>
                            <p className="mt-1 text-sm text-gray-200">
                              {scene.end_timecode}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                            style={{
                              width: `${
                                result.scenes.length > 0
                                  ? Math.max(
                                      2,
                                      (scene.duration_seconds /
                                        result.scenes.reduce(
                                          (total, item) =>
                                            total + item.duration_seconds,
                                          0
                                        )) *
                                        100
                                    )
                                  : 0
                              }%`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold">Analysis Modules</h2>
                <p className="mt-1 text-sm text-gray-500">
                  Six types of AI understanding for your videos.
                </p>
              </div>
              <span className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-gray-400">
                6 modules
              </span>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {analysisItems.map((item) => (
                <div
                  key={item.number}
                  className="rounded-2xl border border-white/10 bg-[#14111e] p-5 transition hover:border-purple-500/50 hover:bg-[#191427]"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{item.icon}</span>
                    <span className="text-xs text-gray-600">{item.number}</span>
                  </div>
                  <h3 className="mt-5 font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    {item.description}
                  </p>
                  <p className="mt-4 border-t border-white/10 pt-3 text-xs leading-5 text-gray-500">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-[#14111e] p-6">
              <h2 className="text-lg font-bold">Analysis Workflow</h2>
              <p className="mt-2 text-sm text-gray-400">
                ReelMind follows this process to understand your footage.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  ["01", "Video Input", "Receive your footage"],
                  ["02", "Scene Detection", "Detect visual scene changes"],
                  ["03", "Moment Ranking", "Find interesting moments"],
                  ["04", "Reel Planning", "Prepare reel suggestions"],
                ].map(([number, title, description]) => (
                  <div key={number} className="rounded-xl bg-white/5 p-4">
                    <span className="text-xs text-purple-400">{number}</span>
                    <h3 className="mt-2 font-semibold">{title}</h3>
                    <p className="mt-1 text-xs text-gray-500">{description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-sm text-gray-500">
                Scene Detection is connected to the backend. Other AI modules
                are planned for upcoming development.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
