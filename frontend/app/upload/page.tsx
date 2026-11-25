
"use client";

import { useRef, useState } from "react";
import Link from "next/link";

type UploadResult = {
  message: string;
  status: string;
  file_id: string;
  filename: string;
  saved_filename: string;
  size_bytes: number;
};

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedCount, setUploadedCount] = useState(0);
  const [uploadResults, setUploadResults] = useState<UploadResult[]>([]);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function addFiles(selectedFiles: FileList | File[]) {
    const videos = Array.from(selectedFiles).filter(
      (file) =>
        file.type.startsWith("video/") &&
        file.size <= 500 * 1024 * 1024
    );

    setFiles((previous) => {
      const combined = [...previous, ...videos];

      return combined.filter(
        (file, index) =>
          combined.findIndex(
            (item) => item.name === file.name && item.size === file.size
          ) === index
      );
    });

    setError("");
    setUploadResults([]);
    setUploadedCount(0);
  }

  function removeFile(index: number) {
    setFiles((previous) => previous.filter((_, i) => i !== index));
    setUploadResults([]);
    setUploadedCount(0);
  }

  function formatSize(bytes: number) {
    return bytes >= 1024 * 1024
      ? `${(bytes / (1024 * 1024)).toFixed(2)} MB`
      : `${(bytes / 1024).toFixed(2)} KB`;
  }

  async function uploadVideos() {
    if (files.length === 0 || uploading) return;

    setUploading(true);
    setError("");
    setUploadResults([]);
    setUploadedCount(0);

    const results: UploadResult[] = [];

    try {
      for (let index = 0; index < files.length; index++) {
        const formData = new FormData();
        formData.append("file", files[index]);

        const response = await fetch("http://127.0.0.1:8000/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            `${files[index].name}: ${
              data.detail || "Upload failed"
            }`
          );
        }

        results.push(data);
        setUploadResults([...results]);
        setUploadedCount(index + 1);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
      );
    } finally {
      setUploading(false);
    }
  }

  const allUploaded =
    files.length > 0 && uploadResults.length === files.length;

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
            <Link href="/upload" className="block rounded-xl bg-purple-600/20 px-4 py-3 text-purple-300">
              ↑ Upload Videos
            </Link>
            <Link href="/analysis" className="block rounded-xl px-4 py-3 text-gray-400 hover:bg-white/10">
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
          <div className="mx-auto max-w-5xl">
            <Link href="/dashboard" className="text-sm text-purple-400 hover:text-purple-300">
              ← Back to Dashboard
            </Link>

            <div className="mb-8 mt-6">
              <p className="text-sm font-medium text-purple-400">
                STEP 01 · GET STARTED
              </p>
              <h1 className="mt-3 text-3xl font-bold md:text-4xl">
                Upload Your Videos
              </h1>
              <p className="mt-3 text-gray-400">
                Bring your raw footage. Let AI discover the stories hidden inside.
              </p>
            </div>

            <div
              onDragOver={(event) => {
                event.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(event) => {
                event.preventDefault();
                setDragging(false);
                addFiles(event.dataTransfer.files);
              }}
              onClick={() => inputRef.current?.click()}
              className={`cursor-pointer rounded-3xl border-2 border-dashed p-10 text-center transition md:p-16 ${
                dragging
                  ? "border-purple-400 bg-purple-500/20"
                  : "border-purple-500/40 bg-[#171326] hover:border-purple-400 hover:bg-purple-500/10"
              }`}
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500/20 text-4xl">
                ↑
              </div>

              <h2 className="mt-5 text-xl font-semibold">
                Drag & Drop your videos here
              </h2>

              <p className="mt-2 text-sm text-gray-400">
                Or click to browse files from your computer
              </p>

              <span className="mt-6 inline-block rounded-xl bg-purple-600 px-6 py-3 text-sm font-semibold hover:bg-purple-500">
                Choose Videos
              </span>

              <p className="mt-4 text-xs text-gray-500">
                MP4, MOV, WEBM, M4V · Maximum 500 MB per video
              </p>

              <input
                ref={inputRef}
                type="file"
                accept="video/*"
                multiple
                hidden
                onChange={(event) => {
                  if (event.target.files) addFiles(event.target.files);
                  event.target.value = "";
                }}
              />
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-[#14111e] p-5">
              <h3 className="font-semibold">Before you upload</h3>
              <div className="mt-4 grid gap-4 text-sm text-gray-400 md:grid-cols-3">
                <p>🎬 <span className="text-gray-200">Multiple clips</span><br />Combine different video clips.</p>
                <p>⏱️ <span className="text-gray-200">Long videos</span><br />Upload podcasts, vlogs and recordings.</p>
                <p>🔒 <span className="text-gray-200">Local development storage</span><br />Videos are saved in the backend uploads folder.</p>
              </div>
            </div>

            <div className="mt-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold">Selected Videos</h2>
                  <p className="mt-1 text-sm text-gray-500">
                    {files.length} video(s) selected
                  </p>
                </div>

                {files.length > 0 && (
                  <button
                    disabled={uploading}
                    onClick={() => {
                      setFiles([]);
                      setUploadResults([]);
                      setUploadedCount(0);
                      setError("");
                    }}
                    className="text-sm text-red-400 hover:text-red-300 disabled:opacity-40"
                  >
                    Remove All
                  </button>
                )}
              </div>

              {files.length === 0 ? (
                <div className="mt-4 rounded-2xl border border-white/10 bg-[#14111e] p-8 text-center text-sm text-gray-500">
                  No videos selected yet. Choose videos to see them here.
                </div>
              ) : (
                <div className="mt-4 space-y-4">
                  {files.map((file, index) => (
                    <div
                      key={`${file.name}-${file.size}-${index}`}
                      className="flex flex-wrap items-center gap-4 rounded-2xl border border-white/10 bg-[#14111e] p-4"
                    >
                      <video
                        src={URL.createObjectURL(file)}
                        controls
                        className="h-24 w-36 rounded-lg bg-black object-cover"
                      />

                      <div className="min-w-0 flex-1">
                        <p className="break-all font-medium">{file.name}</p>
                        <p className="mt-1 text-sm text-gray-500">
                          {formatSize(file.size)}
                        </p>
                        <p className="mt-1 text-xs text-green-400">
                          ✓ Selected successfully
                        </p>
                      </div>

                      <button
                        disabled={uploading}
                        onClick={() => removeFile(index)}
                        className="rounded-lg border border-red-500/30 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 disabled:opacity-40"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {uploading && (
              <div className="mt-6 rounded-2xl border border-purple-500/30 bg-purple-500/10 p-5">
                <p className="font-semibold text-purple-300">
                  Uploading videos...
                </p>
                <p className="mt-2 text-sm text-gray-300">
                  {uploadedCount} of {files.length} videos uploaded
                </p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-purple-500 transition-all"
                    style={{
                      width: `${(uploadedCount / files.length) * 100}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
                Upload error: {error}
              </div>
            )}

            {allUploaded && (
              <div className="mt-6 rounded-2xl border border-green-500/30 bg-green-500/10 p-5">
                <h3 className="font-semibold text-green-400">
                  ✓ All videos uploaded successfully!
                </h3>

                <div className="mt-4 space-y-3">
                  {uploadResults.map((result) => (
                    <div
                      key={result.file_id}
                      className="rounded-xl bg-black/20 p-3 text-sm"
                    >
                      <p className="break-all font-medium">
                        {result.filename}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        File ID: {result.file_id}
                      </p>
                      <p className="mt-1 text-xs text-green-400">
                        {formatSize(result.size_bytes)} · Saved successfully
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
              <p className="text-sm text-gray-500">
                {files.length > 0
                  ? `${files.length} video(s) selected`
                  : "Select at least one video to continue."}
              </p>

              <button
                disabled={files.length === 0 || uploading || allUploaded}
                onClick={uploadVideos}
                className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-7 py-3 font-semibold transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {uploading
                  ? "Uploading..."
                  : allUploaded
                    ? "Upload Complete ✓"
                    : "Upload Videos →"}
              </button>
            </div>

            {allUploaded && (
              <div className="mt-5 text-right">
                <Link
                  href="/analysis"
                  className="inline-block rounded-xl border border-purple-500/40 px-6 py-3 font-semibold text-purple-300 hover:bg-purple-500/10"
                >
                  Continue to AI Analysis →
                </Link>
                <p className="mt-2 text-xs text-gray-500">
                  AI analysis is a separate feature and is not connected yet.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
