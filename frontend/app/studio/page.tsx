
"use client";

import { useState } from "react";
import Link from "next/link";

const styles = [
  "Cinematic",
  "Aesthetic",
  "Storytelling",
  "Funny",
  "Professional",
  "Fast-paced",
  "Emotional",
  "Minimal",
];

const transitions = ["None", "Fade", "Zoom", "Swipe", "Dissolve"];
const ratios = ["9:16", "16:9", "1:1", "4:5"];

export default function ReelStudio() {
  const [style, setStyle] = useState("Cinematic");
  const [ratio, setRatio] = useState("9:16");
  const [transition, setTransition] = useState("Fade");
  const [speed, setSpeed] = useState("1x");
  const [caption, setCaption] = useState(true);
  const [music, setMusic] = useState(true);
  const [clips, setClips] = useState([
    { id: 1, name: "Clip 01", duration: "00:12", color: "bg-purple-600" },
    { id: 2, name: "Clip 02", duration: "00:08", color: "bg-pink-600" },
    { id: 3, name: "Clip 03", duration: "00:15", color: "bg-blue-600" },
  ]);
  const [notice, setNotice] = useState("");

  function moveClip(index: number, direction: number) {
    const next = [...clips];
    const target = index + direction;

    if (target < 0 || target >= next.length) return;

    [next[index], next[target]] = [next[target], next[index]];
    setClips(next);
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
            <Link href="/studio" className="block rounded-xl bg-purple-600/20 px-4 py-3 text-purple-300">◉ Reel Studio</Link>
            <Link href="/voice-studio" className="block rounded-xl px-4 py-3 text-gray-400 hover:bg-white/10">♫ Voice Studio</Link>
            <Link href="/content-studio" className="block rounded-xl px-4 py-3 text-gray-400 hover:bg-white/10">✎ Content Studio</Link>
            <Link href="/projects" className="block rounded-xl px-4 py-3 text-gray-400 hover:bg-white/10">▤ My Projects</Link>
            <Link href="/settings" className="block rounded-xl px-4 py-3 text-gray-400 hover:bg-white/10">⚙ Settings</Link>
          </nav>
        </aside>

        <section className="min-w-0 flex-1 p-5 md:p-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <Link href="/dashboard" className="text-sm text-purple-400">← Dashboard</Link>
                <h1 className="mt-3 text-3xl font-bold">Reel Studio</h1>
                <p className="mt-2 text-sm text-gray-400">
                  Create, customize and arrange your next amazing reel.
                </p>
              </div>
              <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-xs text-purple-300">
                EDITING WORKSPACE
              </span>
            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-[1fr_350px]">
              <div className="space-y-6">
                <div className="rounded-2xl border border-white/10 bg-[#14111e] p-5">
                  <div className="mb-5 flex items-center justify-between">
                    <h2 className="font-semibold">Video Preview</h2>
                    <span className="text-xs text-gray-500">Preview placeholder</span>
                  </div>

                  <div className="flex min-h-[390px] items-center justify-center rounded-xl bg-black p-5">
                    <div className={`flex flex-col items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-purple-900 via-[#24133f] to-black text-center ${
                      ratio === "9:16" ? "aspect-[9/16] w-48" :
                      ratio === "1:1" ? "aspect-square w-64" :
                      ratio === "4:5" ? "aspect-[4/5] w-52" :
                      "aspect-video w-full max-w-lg"
                    }`}>
                      <span className="text-5xl">🎬</span>
                      <p className="mt-4 font-semibold">Your Reel Preview</p>
                      <p className="mt-2 text-xs text-gray-400">Your edited video will appear here</p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                    <button onClick={() => setNotice("Preview player will be connected to your actual video later.")} className="rounded-lg bg-white/10 px-5 py-2 text-sm hover:bg-white/20">▶ Preview</button>
                    <button onClick={() => setNotice("Previous frame preview is not connected yet.")} className="rounded-lg bg-white/10 px-4 py-2 text-sm">|◀</button>
                    <button onClick={() => setNotice("Next frame preview is not connected yet.")} className="rounded-lg bg-white/10 px-4 py-2 text-sm">▶|</button>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#14111e] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="font-semibold">Clip Timeline</h2>
                      <p className="mt-1 text-xs text-gray-500">Arrange the order of your clips.</p>
                    </div>
                    <span className="text-xs text-purple-300">{clips.length} clips</span>
                  </div>

                  <div className="mt-5 space-y-3">
                    {clips.map((clip, index) => (
                      <div key={clip.id} className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                        <span className={`flex h-12 w-16 items-center justify-center rounded-lg text-xs font-bold ${clip.color}`}>
                          {clip.id}
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium">{clip.name}</p>
                          <p className="mt-1 text-xs text-gray-500">{clip.duration} · Demo clip</p>
                        </div>
                        <button onClick={() => moveClip(index, -1)} disabled={index === 0} className="rounded-lg bg-white/10 px-3 py-2 text-sm disabled:opacity-30">↑</button>
                        <button onClick={() => moveClip(index, 1)} disabled={index === clips.length - 1} className="rounded-lg bg-white/10 px-3 py-2 text-sm disabled:opacity-30">↓</button>
                        <button onClick={() => setClips(clips.filter((item) => item.id !== clip.id))} className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">✕</button>
                      </div>
                    ))}
                    {clips.length === 0 && (
                      <p className="rounded-xl bg-white/5 p-6 text-center text-sm text-gray-500">
                        No demo clips remaining.
                      </p>
                    )}
                  </div>

                  <button onClick={() => setNotice("Adding real uploaded clips will be connected later.")} className="mt-4 w-full rounded-xl border border-dashed border-purple-500/40 py-3 text-sm text-purple-300 hover:bg-purple-500/10">
                    + Add More Clips
                  </button>
                </div>
              </div>

              <div className="space-y-5">
                <div className="rounded-2xl border border-white/10 bg-[#14111e] p-5">
                  <h2 className="font-semibold">Canvas Format</h2>
                  <p className="mt-1 text-xs text-gray-500">Choose your video dimensions.</p>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {ratios.map((item) => (
                      <button key={item} onClick={() => setRatio(item)} className={`rounded-xl border p-3 text-sm ${ratio === item ? "border-purple-500 bg-purple-500/20 text-purple-300" : "border-white/10 bg-white/5 text-gray-400"}`}>
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#14111e] p-5">
                  <h2 className="font-semibold">Editing Style</h2>
                  <p className="mt-1 text-xs text-gray-500">Choose the mood of your reel.</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {styles.map((item) => (
                      <button key={item} onClick={() => setStyle(item)} className={`rounded-full border px-3 py-2 text-xs ${style === item ? "border-purple-500 bg-purple-500/20 text-purple-300" : "border-white/10 text-gray-400 hover:bg-white/10"}`}>
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#14111e] p-5">
                  <h2 className="font-semibold">Transitions & Speed</h2>
                  <label className="mt-4 block text-xs text-gray-400">Transition</label>
                  <select value={transition} onChange={(e) => setTransition(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#201a2c] p-3 text-sm">
                    {transitions.map((item) => <option key={item}>{item}</option>)}
                  </select>

                  <label className="mt-4 block text-xs text-gray-400">Playback Speed</label>
                  <select value={speed} onChange={(e) => setSpeed(e.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-[#201a2c] p-3 text-sm">
                    {["0.5x", "0.75x", "1x", "1.25x", "1.5x", "2x"].map((item) => <option key={item}>{item}</option>)}
                  </select>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#14111e] p-5">
                  <h2 className="font-semibold">Audio & Captions</h2>
                  <label className="mt-5 flex items-center justify-between text-sm">
                    Enable Captions
                    <input type="checkbox" checked={caption} onChange={(e) => setCaption(e.target.checked)} className="h-4 w-4 accent-purple-500" />
                  </label>
                  <label className="mt-5 flex items-center justify-between text-sm">
                    Background Music
                    <input type="checkbox" checked={music} onChange={(e) => setMusic(e.target.checked)} className="h-4 w-4 accent-purple-500" />
                  </label>
                </div>

                <div className="rounded-2xl border border-purple-500/30 bg-purple-500/10 p-5">
                  <h2 className="font-semibold">Your Edit Settings</h2>
                  <div className="mt-3 space-y-2 text-xs text-gray-300">
                    <p>Style: {style}</p>
                    <p>Format: {ratio}</p>
                    <p>Transition: {transition}</p>
                    <p>Speed: {speed}</p>
                    <p>Captions: {caption ? "On" : "Off"}</p>
                    <p>Music: {music ? "On" : "Off"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
              <p className="text-xs text-gray-500">
                UI demo: actual video rendering is not connected yet.
              </p>
              <button onClick={() => setNotice("Your settings are visible in the Edit Settings panel. Actual rendering will be connected later.")} className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-7 py-3 text-sm font-semibold hover:opacity-90">
                Save Editing Settings
              </button>
            </div>

            {notice && (
              <div className="mt-5 flex items-center justify-between gap-3 rounded-xl border border-purple-500/30 bg-purple-500/10 p-4 text-sm text-purple-200">
                {notice}
                <button onClick={() => setNotice("")} className="text-white">✕</button>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
