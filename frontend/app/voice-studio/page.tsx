
"use client";

import { useRef, useState } from "react";
import Link from "next/link";

const modes = [
  { id: "original", icon: "🔊", title: "Original Audio", desc: "Keep the original video sound." },
  { id: "music", icon: "🎵", title: "Music Only", desc: "Replace original audio with music." },
  { id: "mix", icon: "🎙️", title: "Voice + Music", desc: "Keep voice with background music." },
  { id: "mute", icon: "🔇", title: "Completely Mute", desc: "Remove all audio from the video." },
];

export default function VoiceStudio() {
  const [mode, setMode] = useState("original");
  const [language, setLanguage] = useState("Hindi");
  const [voice, setVoice] = useState("Female - Natural");
  const [script, setScript] = useState("");
  const [originalVolume, setOriginalVolume] = useState(80);
  const [musicVolume, setMusicVolume] = useState(25);
  const [voiceVolume, setVoiceVolume] = useState(100);
  const [musicMood, setMusicMood] = useState("Cinematic");
  const [notice, setNotice] = useState("");
  const [recording, setRecording] = useState(false);
  const [recordedAudio, setRecordedAudio] = useState("");
  const [uploadedAudio, setUploadedAudio] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function handleAudioUpload(file?: File) {
    if (!file) return;
    if (!file.type.startsWith("audio/")) {
      setNotice("Please select a valid audio file.");
      return;
    }
    setUploadedAudio(file.name);
    setNotice("Audio file selected successfully. Server upload is not connected yet.");
  }

  function startRecording() {
    setNotice("Browser microphone recording will be added in the next audio functionality phase.");
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
            <Link href="/dashboard" className="block rounded-xl px-4 py-3 text-gray-400 hover:bg-white/10">◈ Dashboard</Link>
            <Link href="/upload" className="block rounded-xl px-4 py-3 text-gray-400 hover:bg-white/10">↑ Upload Videos</Link>
            <Link href="/analysis" className="block rounded-xl px-4 py-3 text-gray-400 hover:bg-white/10">✧ AI Analysis</Link>
            <Link href="/studio" className="block rounded-xl px-4 py-3 text-gray-400 hover:bg-white/10">◉ Reel Studio</Link>
            <Link href="/voice-studio" className="block rounded-xl bg-purple-600/20 px-4 py-3 text-purple-300">♫ Voice Studio</Link>
            <Link href="/content-studio" className="block rounded-xl px-4 py-3 text-gray-400 hover:bg-white/10">✎ Content Studio</Link>
            <Link href="/projects" className="block rounded-xl px-4 py-3 text-gray-400 hover:bg-white/10">▤ My Projects</Link>
            <Link href="/settings" className="block rounded-xl px-4 py-3 text-gray-400 hover:bg-white/10">⚙ Settings</Link>
          </nav>
        </aside>

        <section className="min-w-0 flex-1 p-5 md:p-9">
          <div className="mx-auto max-w-6xl">
            <Link href="/dashboard" className="text-sm text-purple-400">← Back to Dashboard</Link>

            <div className="mb-8 mt-6">
              <p className="text-sm font-medium text-purple-400">STEP 04 · AUDIO & VOICE</p>
              <h1 className="mt-3 text-3xl font-bold md:text-4xl">Voice Studio</h1>
              <p className="mt-3 text-gray-400">
                Control your original audio, add music, create voiceovers and personalize your reel sound.
              </p>
            </div>

            <div className="rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-[#171326] p-6 md:p-8">
              <p className="text-sm text-purple-300">YOUR AUDIO WORKSPACE</p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-5">
                <div>
                  <h2 className="text-2xl font-bold">Give your story a voice.</h2>
                  <p className="mt-2 max-w-xl text-sm text-gray-400">
                    Choose how your video sounds. Keep your voice, add music or create an AI voiceover.
                  </p>
                </div>
                <span className="text-6xl">🎧</span>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold">Choose Audio Mode</h2>
              <p className="mt-1 text-sm text-gray-500">Select how audio should work in your final reel.</p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {modes.map((item) => (
                  <button key={item.id} onClick={() => setMode(item.id)}
                    className={`rounded-2xl border p-5 text-left transition ${mode === item.id ? "border-purple-500 bg-purple-500/15" : "border-white/10 bg-[#14111e] hover:border-purple-500/50"}`}>
                    <span className="text-3xl">{item.icon}</span>
                    <h3 className="mt-4 font-semibold">{item.title}</h3>
                    <p className="mt-2 text-xs leading-5 text-gray-400">{item.desc}</p>
                    <p className={`mt-4 text-xs ${mode === item.id ? "text-purple-300" : "text-gray-600"}`}>
                      {mode === item.id ? "✓ Selected" : "Select mode →"}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-[#14111e] p-6">
                <h2 className="text-lg font-bold">🎼 Background Music</h2>
                <p className="mt-1 text-sm text-gray-500">Choose a mood for your video.</p>

                <label className="mt-5 block text-xs text-gray-400">Music Mood</label>
                <select value={musicMood} onChange={(e) => setMusicMood(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-[#201a2c] p-3 text-sm">
                  {["Cinematic", "Happy", "Emotional", "Romantic", "Energetic", "Relaxing", "Funny", "Inspirational", "Professional"].map((item) => <option key={item}>{item}</option>)}
                </select>

                <label className="mt-5 block text-xs text-gray-400">Music Volume: {musicVolume}%</label>
                <input type="range" min="0" max="100" value={musicVolume} onChange={(e) => setMusicVolume(Number(e.target.value))} className="mt-3 w-full accent-purple-500" />

                <button onClick={() => setNotice("Music library and licensed tracks will be connected later.")}
                  className="mt-5 w-full rounded-xl border border-purple-500/40 py-3 text-sm text-purple-300 hover:bg-purple-500/10">
                  + Explore Music Library
                </button>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#14111e] p-6">
                <h2 className="text-lg font-bold">🎙️ AI Voiceover</h2>
                <p className="mt-1 text-sm text-gray-500">Prepare a script for your voiceover.</p>

                <label className="mt-5 block text-xs text-gray-400">Language</label>
                <select value={language} onChange={(e) => setLanguage(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-[#201a2c] p-3 text-sm">
                  {["Hindi", "English", "Hinglish", "Bengali", "Tamil", "Telugu", "Marathi", "Gujarati"].map((item) => <option key={item}>{item}</option>)}
                </select>

                <label className="mt-4 block text-xs text-gray-400">AI Voice</label>
                <select value={voice} onChange={(e) => setVoice(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-white/10 bg-[#201a2c] p-3 text-sm">
                  {["Female - Natural", "Male - Natural", "Female - Energetic", "Male - Deep", "Female - Calm", "Male - Friendly"].map((item) => <option key={item}>{item}</option>)}
                </select>

                <label className="mt-4 block text-xs text-gray-400">Voiceover Script</label>
                <textarea value={script} onChange={(e) => setScript(e.target.value)}
                  placeholder="Write your voiceover script here..."
                  rows={5}
                  className="mt-2 w-full resize-y rounded-xl border border-white/10 bg-[#201a2c] p-3 text-sm outline-none focus:border-purple-500" />

                <p className="mt-2 text-right text-xs text-gray-500">{script.length} characters</p>

                <button onClick={() => setNotice("AI voice generation will be connected later. Your script and voice settings are ready for the UI preview.")}
                  className="mt-4 w-full rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 py-3 text-sm font-semibold hover:opacity-90">
                  ✨ Generate AI Voiceover
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-[#14111e] p-6">
                <h2 className="text-lg font-bold">🎤 Record Your Own Voice</h2>
                <p className="mt-2 text-sm text-gray-400">
                  Use your own voice instead of an AI-generated voice.
                </p>
                <div className="mt-5 rounded-xl bg-white/5 p-5 text-center">
                  <span className="text-4xl">🎙️</span>
                  <p className="mt-3 text-sm font-medium">Voice Recording Studio</p>
                  <p className="mt-2 text-xs text-gray-500">
                    Microphone recording functionality will be connected later.
                  </p>
                  <button onClick={startRecording}
                    className="mt-5 rounded-xl border border-purple-500/40 px-5 py-3 text-sm text-purple-300 hover:bg-purple-500/10">
                    {recording ? "Stop Recording" : "● Start Recording"}
                  </button>
                </div>

                <input ref={fileRef} type="file" accept="audio/*" hidden onChange={(e) => handleAudioUpload(e.target.files?.[0])} />
                <button onClick={() => fileRef.current?.click()}
                  className="mt-4 w-full rounded-xl border border-white/10 py-3 text-sm text-gray-300 hover:bg-white/5">
                  ↑ Upload Recorded Audio
                </button>
                {uploadedAudio && <p className="mt-3 break-all text-xs text-green-400">Selected: {uploadedAudio}</p>}
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#14111e] p-6">
                <h2 className="text-lg font-bold">🎚️ Audio Mixer</h2>
                <p className="mt-1 text-sm text-gray-500">Adjust the volume of each audio layer.</p>

                <label className="mt-6 flex justify-between text-sm">
                  Original Video Audio <span>{originalVolume}%</span>
                </label>
                <input type="range" min="0" max="100" value={originalVolume} onChange={(e) => setOriginalVolume(Number(e.target.value))} className="mt-3 w-full accent-purple-500" />

                <label className="mt-6 flex justify-between text-sm">
                  Background Music <span>{musicVolume}%</span>
                </label>
                <input type="range" min="0" max="100" value={musicVolume} onChange={(e) => setMusicVolume(Number(e.target.value))} className="mt-3 w-full accent-purple-500" />

                <label className="mt-6 flex justify-between text-sm">
                  Voiceover <span>{voiceVolume}%</span>
                </label>
                <input type="range" min="0" max="100" value={voiceVolume} onChange={(e) => setVoiceVolume(Number(e.target.value))} className="mt-3 w-full accent-purple-500" />

                <div className="mt-6 rounded-xl bg-purple-500/10 p-4 text-xs text-purple-200">
                  Selected mode: {modes.find((item) => item.id === mode)?.title}
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-[#14111e] p-6">
              <h2 className="font-semibold">Your Audio Settings</h2>
              <div className="mt-4 grid gap-3 text-sm text-gray-400 sm:grid-cols-2 lg:grid-cols-4">
                <p>Mode: <span className="text-white">{modes.find((item) => item.id === mode)?.title}</span></p>
                <p>Language: <span className="text-white">{language}</span></p>
                <p>AI Voice: <span className="text-white">{voice}</span></p>
                <p>Music Mood: <span className="text-white">{musicMood}</span></p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
              <p className="text-xs text-gray-500">UI preview only · Actual audio processing is not connected.</p>
              <button onClick={() => setNotice("Your audio settings are shown above. Saving to a project will be connected later.")}
                className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-7 py-3 text-sm font-semibold hover:opacity-90">
                Save Audio Settings →
              </button>
            </div>

            {notice && (
              <div className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-purple-500/30 bg-purple-500/10 p-4 text-sm text-purple-200">
                {notice}
                <button onClick={() => setNotice("")}>✕</button>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
