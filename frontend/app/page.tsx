
"use client";

import { useEffect, useRef, useState } from "react";

type SelectedVideo = {
  file: File;
  previewUrl: string;
};

export default function Home() {
  const [selectedVideos, setSelectedVideos] = useState<SelectedVideo[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Select videos from computer
  const handleVideoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files ?? []);

    const videoFiles = files.filter((file) =>
      file.type.startsWith("video/")
    );

    const newVideos = videoFiles.map((file) => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setSelectedVideos(newVideos);
  };

  // Release temporary video preview URLs
  useEffect(() => {
    return () => {
      selectedVideos.forEach((video) => {
        URL.revokeObjectURL(video.previewUrl);
      });
    };
  }, [selectedVideos]);

  // Remove selected videos
  const clearVideos = () => {
    setSelectedVideos([]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <main className="min-h-screen bg-[#080B16] text-white">

      {/* NAVBAR */}
      <nav className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-6 py-5 md:px-12">
        <h1 className="text-2xl font-bold">
          ReelMind<span className="text-purple-400"> AI</span>
        </h1>

        <div className="flex items-center gap-6 text-sm text-gray-300">
          <a href="#features" className="hover:text-purple-400">
            Features
          </a>

          <a href="#how-it-works" className="hover:text-purple-400">
            How It Works
          </a>
        </div>

        <a
          href="#upload"
          className="rounded-full bg-purple-600 px-6 py-3 font-semibold transition hover:bg-purple-500"
        >
          Get Started
        </a>
      </nav>

      {/* HERO SECTION */}
      <section className="px-6 py-24 text-center md:py-32">

        <p className="mb-7 inline-block rounded-full border border-purple-400/30 bg-purple-400/10 px-5 py-2 text-sm text-purple-300">
          ✨ Your AI-powered video creator
        </p>

        <h2 className="mx-auto max-w-5xl text-5xl font-bold leading-tight md:text-7xl">
          Turn Raw Footage Into

          <span className="block text-purple-400">
            Creative Stories.
          </span>
        </h2>

        <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-gray-400">
          Transform your long videos and random clips into
          beautiful, engaging reels with the power of AI.
        </p>

        <a
          href="#upload"
          className="mt-10 inline-block rounded-full bg-purple-600 px-9 py-4 font-semibold transition hover:bg-purple-500"
        >
          Start Creating →
        </a>

      </section>

      {/* VIDEO UPLOAD SECTION */}
      <section
        id="upload"
        className="mx-auto max-w-5xl px-6 pb-24"
      >

        <div className="rounded-3xl border border-dashed border-purple-400/50 bg-white/5 p-8 text-center md:p-14">

          <div className="mb-6 text-6xl">
            🎬
          </div>

          <h3 className="text-2xl font-bold md:text-3xl">
            Bring Your Videos to Life
          </h3>

          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Upload your raw footage and let AI discover
            your best moments.
          </p>

          {/* FILE INPUT */}
          <div className="mt-9">

            <input
              ref={fileInputRef}
              id="video-upload"
              type="file"
              accept="video/*"
              multiple
              onChange={handleVideoChange}
              className="sr-only"
            />

            <label
              htmlFor="video-upload"
              className="inline-block cursor-pointer rounded-full bg-purple-600 px-8 py-4 font-semibold transition hover:bg-purple-500"
            >
              📁 Choose Videos
            </label>

            <p className="mt-4 text-sm text-gray-500">
              Select one or multiple videos from your computer.
            </p>

          </div>

          {/* SELECTED VIDEO INFORMATION */}
          {selectedVideos.length > 0 && (
            <div className="mt-12 text-left">

              <div className="mb-6 flex flex-wrap items-center justify-between gap-3">

                <h4 className="text-xl font-bold">
                  Selected Videos ({selectedVideos.length})
                </h4>

                <button
                  type="button"
                  onClick={clearVideos}
                  className="rounded-lg border border-red-400/30 px-4 py-2 text-sm text-red-400 transition hover:bg-red-400/10"
                >
                  Remove All
                </button>

              </div>

              <div className="grid gap-6 md:grid-cols-2">

                {selectedVideos.map((video, index) => (

                  <div
                    key={`${video.file.name}-${index}`}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-[#111525] p-4"
                  >

                    {/* VIDEO PREVIEW */}
                    <video
                      src={video.previewUrl}
                      controls
                      preload="metadata"
                      className="w-full rounded-xl"
                    />

                    {/* VIDEO DETAILS */}
                    <div className="mt-4">

                      <p className="break-all font-semibold">
                        {video.file.name}
                      </p>

                      <p className="mt-2 text-sm text-gray-400">
                        Size:{" "}
                        {(video.file.size / (1024 * 1024)).toFixed(2)}
                        {" MB"}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

              <p className="mt-7 text-sm text-green-400">
                ✓ Videos selected successfully!
              </p>

              <p className="mt-2 text-xs text-gray-500">
                These videos are currently available only for local
                preview. Secure server upload will be implemented
                with our backend.
              </p>

            </div>
          )}

        </div>

      </section>

      {/* FEATURES SECTION */}
      <section
        id="features"
        className="bg-white/5 px-6 py-20 md:px-12"
      >

        <h2 className="text-center text-4xl font-bold">
          Everything You Need
        </h2>

        <p className="mt-4 text-center text-gray-400">
          One platform. Endless creative possibilities.
        </p>

        <div className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-3">

          <div className="rounded-2xl border border-white/10 p-7 transition hover:border-purple-400/50">

            <div className="text-4xl">🧠</div>

            <h3 className="mt-5 text-xl font-bold">
              AI Video Understanding
            </h3>

            <p className="mt-3 leading-7 text-gray-400">
              AI analyzes your footage and discovers
              interesting moments, scenes and activities.
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 p-7 transition hover:border-purple-400/50">

            <div className="text-4xl">✂️</div>

            <h3 className="mt-5 text-xl font-bold">
              Smart Editing
            </h3>

            <p className="mt-3 leading-7 text-gray-400">
              Automatically select, trim and arrange
              your best clips into engaging reels.
            </p>

          </div>

          <div className="rounded-2xl border border-white/10 p-7 transition hover:border-purple-400/50">

            <div className="text-4xl">✨</div>

            <h3 className="mt-5 text-xl font-bold">
              AI Captions & Scripts
            </h3>

            <p className="mt-3 leading-7 text-gray-400">
              Generate creative hooks, captions and
              storytelling ideas for your videos.
            </p>

          </div>

        </div>

      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="px-6 py-24 text-center"
      >

        <h2 className="text-4xl font-bold">
          How It Works
        </h2>

        <p className="mt-4 text-gray-400">
          Three simple steps to create your next reel.
        </p>

        <div className="mx-auto mt-14 grid max-w-5xl gap-12 md:grid-cols-3">

          <div>
            <div className="text-5xl">📤</div>

            <h3 className="mt-5 text-xl font-bold">
              01. Upload
            </h3>

            <p className="mt-3 text-gray-400">
              Upload your long videos or multiple clips.
            </p>
          </div>

          <div>
            <div className="text-5xl">🤖</div>

            <h3 className="mt-5 text-xl font-bold">
              02. AI Analysis
            </h3>

            <p className="mt-3 text-gray-400">
              AI understands your content and finds
              the best moments.
            </p>
          </div>

          <div>
            <div className="text-5xl">🎥</div>

            <h3 className="mt-5 text-xl font-bold">
              03. Create
            </h3>

            <p className="mt-3 text-gray-400">
              Generate your reel and export your creation.
            </p>
          </div>

        </div>

      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-gray-400">

        <p>
          © 2026 ReelMind AI. All rights reserved.
        </p>

        <p className="mt-2">
          From Raw Footage to Creative Stories.
        </p>

      </footer>

    </main>
  );
}
