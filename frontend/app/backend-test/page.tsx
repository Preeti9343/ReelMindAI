
"use client";

import { useEffect, useState } from "react";

type BackendStatus = {
  status: string;
  service: string;
};

export default function BackendTestPage() {
  const [data, setData] = useState<BackendStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function checkBackend() {
    setLoading(true);
    setError("");
    setData(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/health");

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result: BackendStatus = await response.json();
      setData(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to connect to backend"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    checkBackend();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-xl rounded-3xl border border-slate-700 bg-slate-900 p-8 text-center shadow-2xl">
        <h1 className="text-3xl font-bold mb-3">ReelMind AI</h1>

        <p className="text-slate-400 mb-8">
          Frontend to Backend Integration Test
        </p>

        {loading && (
          <p className="text-yellow-400">Connecting to backend...</p>
        )}

        {data && (
          <div className="rounded-xl bg-green-500/10 border border-green-500/30 p-5">
            <p className="text-green-400 text-xl font-bold mb-3">
              Backend Connected!
            </p>
            <p className="text-slate-200">
              Service: {data.service}
            </p>
            <p className="text-slate-200">
              Status: {data.status}
            </p>
          </div>
        )}

        {error && (
          <div className="rounded-xl bg-red-500/10 border border-red-500/30 p-5">
            <p className="text-red-400 font-bold mb-2">
              Connection Failed
            </p>
            <p className="text-slate-300 text-sm">{error}</p>
          </div>
        )}

        <button
          onClick={checkBackend}
          disabled={loading}
          className="mt-7 rounded-xl bg-purple-600 px-6 py-3 font-semibold hover:bg-purple-500 disabled:opacity-50"
        >
          {loading ? "Checking..." : "Check Connection Again"}
        </button>
      </div>
    </main>
  );
}
