
"use client";

import { useState } from "react";
import Link from "next/link";

const navItems = [
  ["Dashboard", "/dashboard"],
  ["Upload Videos", "/upload"],
  ["AI Analysis", "/analysis"],
  ["Reel Studio", "/studio"],
  ["Voice Studio", "/voice-studio"],
  ["AI Content Studio", "/content-studio"],
  ["My Projects", "/projects"],
  ["Settings", "/settings"],
];

export default function ContentStudio() {
  const [language, setLanguage] = useState("Hinglish");
  const [style, setStyle] = useState("Storytelling");
  const [platform, setPlatform] = useState("Instagram");
  const [topic, setTopic] = useState("");
  const [hook, setHook] = useState("");
  const [caption, setCaption] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [script, setScript] = useState("");
  const [notice, setNotice] = useState("");

  const demoNotice = (feature: string) => {
    setNotice(
      `${feature}: This is currently a UI demo. Real AI generation will be connected in a later development phase.`
    );
  };

  const selectClass =
    "w-full rounded-xl border border-white/10 bg-[#171923] px-4 py-3 text-sm text-white outline-none focus:border-purple-500";

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-[#171923] px-4 py-3 text-sm text-white outline-none placeholder:text-gray-500 focus:border-purple-500";

  const cardClass =
    "rounded-2xl border border-white/10 bg-[#11131c] p-5";

  const buttonClass =
    "rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90";

  return (
    <div className="min-h-screen bg-[#090b12] text-white">
      <div className="flex min-h-screen">
        <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-[#0e1018] p-5 lg:block">
          <Link href="/dashboard" className="mb-10 block">
            <h1 className="text-2xl font-bold">
              ReelMind<span className="text-purple-400"> AI</span>
            </h1>
            <p className="mt-1 text-xs text-gray-500">
              From Raw Footage to Creative Stories
            </p>
          </Link>

          <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-500">
            Workspace
          </p>

          <nav className="space-y-2">
            {navItems.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className={`block rounded-xl px-4 py-3 text-sm transition ${
                  href === "/content-studio"
                    ? "bg-purple-600/20 text-purple-300"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="mt-12 rounded-2xl border border-purple-500/20 bg-purple-500/10 p-4">
            <p className="font-semibold text-purple-300">Creative Studio</p>
            <p className="mt-2 text-xs leading-5 text-gray-400">
              Turn your video ideas into engaging social media content.
            </p>
          </div>
        </aside>

        <main className="min-w-0 flex-1 p-5 md:p-8">
          <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-purple-400">Creative Workspace</p>
              <h2 className="mt-1 text-3xl font-bold">
                AI Content Studio ✨
              </h2>
              <p className="mt-2 text-sm text-gray-400">
                Create hooks, captions, hashtags and voiceover scripts.
              </p>
            </div>

            <Link
              href="/dashboard"
              className="rounded-xl border border-white/10 px-4 py-2 text-sm text-gray-300 hover:bg-white/5"
            >
              ← Dashboard
            </Link>
          </header>

          {notice && (
            <div className="mb-6 flex items-start justify-between gap-4 rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-4 text-sm text-yellow-200">
              <p>{notice}</p>
              <button
                onClick={() => setNotice("")}
                className="text-yellow-200"
              >
                ✕
              </button>
            </div>
          )}

          <section className={`${cardClass} mb-6`}>
            <h3 className="mb-5 text-lg font-semibold">
              Content Preferences
            </h3>

            <div className="grid gap-5 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Language
                </label>
                <select
                  className={selectClass}
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option>Hinglish</option>
                  <option>Hindi</option>
                  <option>English</option>
                  <option>Marathi</option>
                  <option>Punjabi</option>
                  <option>Tamil</option>
                  <option>Telugu</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Content Style
                </label>
                <select
                  className={selectClass}
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                >
                  <option>Storytelling</option>
                  <option>Cinematic</option>
                  <option>Funny</option>
                  <option>Emotional</option>
                  <option>Professional</option>
                  <option>Educational</option>
                  <option>Aesthetic</option>
                  <option>Fast-paced</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Platform
                </label>
                <select
                  className={selectClass}
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value)}
                >
                  <option>Instagram</option>
                  <option>YouTube Shorts</option>
                  <option>TikTok</option>
                  <option>Facebook</option>
                  <option>LinkedIn</option>
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm text-gray-400">
                Video Topic / Description
              </label>
              <textarea
                className={inputClass}
                rows={3}
                placeholder="Example: A beautiful trip to Manali with friends..."
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
              <p className="mt-2 text-xs text-gray-500">
                Selected: {language} · {style} · {platform}
              </p>
            </div>
          </section>

          <div className="grid gap-5 xl:grid-cols-2">
            <section className={cardClass}>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold">💡 AI Reel Ideas</h3>
                <span className="rounded-full bg-purple-500/15 px-3 py-1 text-xs text-purple-300">
                  Ideas
                </span>
              </div>
              <p className="mb-5 text-sm text-gray-400">
                Discover possible reel concepts based on your video content.
              </p>
              <div className="rounded-xl border border-dashed border-white/15 p-5 text-center">
                <p className="text-3xl">🎬</p>
                <p className="mt-3 text-sm text-gray-300">
                  Your reel ideas will appear here.
                </p>
              </div>
              <button
                className={`${buttonClass} mt-5 w-full`}
                onClick={() => demoNotice("AI Reel Ideas")}
              >
                Generate Reel Ideas
              </button>
            </section>

            <section className={cardClass}>
              <h3 className="mb-4 text-lg font-semibold">⚡ Hook Generator</h3>
              <p className="mb-4 text-sm text-gray-400">
                Create an attention-grabbing opening for your reel.
              </p>
              <textarea
                className={inputClass}
                rows={4}
                placeholder="Your generated hook will appear here..."
                value={hook}
                onChange={(e) => setHook(e.target.value)}
              />
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-gray-500">
                  {hook.length} characters
                </span>
                <button
                  className={buttonClass}
                  onClick={() => demoNotice("Hook Generator")}
                >
                  Generate Hook
                </button>
              </div>
            </section>

            <section className={cardClass}>
              <h3 className="mb-4 text-lg font-semibold">✍️ Caption Generator</h3>
              <p className="mb-4 text-sm text-gray-400">
                Write captions that match your reel and selected platform.
              </p>
              <textarea
                className={inputClass}
                rows={5}
                placeholder="Write or edit your caption here..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-gray-500">
                  {caption.length} characters
                </span>
                <button
                  className={buttonClass}
                  onClick={() => demoNotice("Caption Generator")}
                >
                  Generate Caption
                </button>
              </div>
            </section>

            <section className={cardClass}>
              <h3 className="mb-4 text-lg font-semibold">#️⃣ Hashtag Generator</h3>
              <p className="mb-4 text-sm text-gray-400">
                Prepare relevant hashtags for your content.
              </p>
              <textarea
                className={inputClass}
                rows={5}
                placeholder="#Travel #Reels #Memories..."
                value={hashtags}
                onChange={(e) => setHashtags(e.target.value)}
              />
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-gray-500">
                  {hashtags.length} characters
                </span>
                <button
                  className={buttonClass}
                  onClick={() => demoNotice("Hashtag Generator")}
                >
                  Generate Hashtags
                </button>
              </div>
            </section>

            <section className={`${cardClass} xl:col-span-2`}>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">
                    🎙️ AI Voiceover Script Studio
                  </h3>
                  <p className="mt-2 text-sm text-gray-400">
                    Create a script with an engaging opening, main story and ending.
                  </p>
                </div>
                <span className="rounded-full bg-pink-500/15 px-3 py-1 text-xs text-pink-300">
                  Script Editor
                </span>
              </div>

              <textarea
                className={inputClass}
                rows={8}
                placeholder="Your voiceover script will appear here. You can also write and edit it yourself..."
                value={script}
                onChange={(e) => setScript(e.target.value)}
              />

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs text-gray-500">
                  {script.length} characters
                </span>
                <button
                  className={buttonClass}
                  onClick={() => demoNotice("Voiceover Script Generator")}
                >
                  Generate Voiceover Script
                </button>
              </div>
            </section>

            <section className={cardClass}>
              <h3 className="mb-3 text-lg font-semibold">🎯 Call to Action</h3>
              <p className="mb-4 text-sm text-gray-400">
                Suggest a closing line that encourages viewers to engage.
              </p>
              <div className="rounded-xl border border-white/10 bg-[#171923] p-4 text-sm text-gray-500">
                Your CTA suggestions will appear here.
              </div>
              <button
                className={`${buttonClass} mt-4 w-full`}
                onClick={() => demoNotice("CTA Generator")}
              >
                Generate CTA
              </button>
            </section>

            <section className={cardClass}>
              <h3 className="mb-3 text-lg font-semibold">📋 Content Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-gray-400">Language</span>
                  <span>{language}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-gray-400">Style</span>
                  <span>{style}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-gray-400">Platform</span>
                  <span>{platform}</span>
                </div>
                <div className="flex justify-between gap-3">
                  <span className="text-gray-400">Topic provided</span>
                  <span>{topic.trim() ? "Yes" : "No"}</span>
                </div>
              </div>
              <button
                className={`${buttonClass} mt-5 w-full`}
                onClick={() => demoNotice("Content Package")}
              >
                Create Content Package
              </button>
            </section>
          </div>

          <footer className="mt-8 border-t border-white/10 pt-5 text-center text-xs text-gray-500">
            ReelMind AI · From Raw Footage to Creative Stories
          </footer>
        </main>
      </div>
    </div>
  );
}
