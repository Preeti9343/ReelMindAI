
import Link from "next/link";

const tools = [
  {
    icon: "🧠",
    title: "AI Video Analysis",
    description: "Discover scenes, activities and your best moments.",
    link: "/analysis",
  },
  {
    icon: "🎬",
    title: "Reel Creation Studio",
    description: "Turn your footage into engaging short-form reels.",
    link: "/studio",
  },
  {
    icon: "🎙️",
    title: "Voice Studio",
    description: "Create voiceovers and customize your audio.",
    link: "/voice-studio",
  },
  {
    icon: "✨",
    title: "AI Content Studio",
    description: "Generate hooks, scripts, captions and hashtags.",
    link: "/content-studio",
  },
];

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#090914] text-white">
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <aside className="hidden w-64 border-r border-white/10 bg-[#10101c] p-6 md:block">
          <h1 className="mb-10 text-2xl font-bold">
            ReelMind <span className="text-purple-400">AI</span>
          </h1>

          <p className="mb-4 text-xs uppercase tracking-widest text-gray-500">
            Workspace
          </p>

          <nav className="space-y-2">
            <Link href="/dashboard" className="block rounded-xl bg-purple-600/20 px-4 py-3 text-purple-300">
              🏠 Dashboard
            </Link>
            <Link href="/upload" className="block rounded-xl px-4 py-3 text-gray-300 hover:bg-white/5">
              📤 Upload Videos
            </Link>
            <Link href="/projects" className="block rounded-xl px-4 py-3 text-gray-300 hover:bg-white/5">
              📁 My Projects
            </Link>
            <Link href="/studio" className="block rounded-xl px-4 py-3 text-gray-300 hover:bg-white/5">
              🎬 Reel Studio
            </Link>
          </nav>

          <p className="mb-4 mt-10 text-xs uppercase tracking-widest text-gray-500">
            AI Tools
          </p>

          <nav className="space-y-2">
            <Link href="/analysis" className="block rounded-xl px-4 py-3 text-gray-300 hover:bg-white/5">
              🧠 AI Analysis
            </Link>
            <Link href="/voice-studio" className="block rounded-xl px-4 py-3 text-gray-300 hover:bg-white/5">
              🎙️ Voice Studio
            </Link>
            <Link href="/content-studio" className="block rounded-xl px-4 py-3 text-gray-300 hover:bg-white/5">
              ✨ Content Studio
            </Link>
          </nav>

          <div className="mt-16 border-t border-white/10 pt-5">
            <Link href="/settings" className="block rounded-xl px-4 py-3 text-gray-300 hover:bg-white/5">
              ⚙️ Settings
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <section className="min-w-0 flex-1 p-6 md:p-10">

          <header className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-purple-300">YOUR CREATIVE WORKSPACE</p>
              <h2 className="mt-2 text-3xl font-bold">
                Welcome to ReelMind AI 👋
              </h2>
              <p className="mt-2 text-gray-400">
                Turn your raw footage into creative stories.
              </p>
            </div>

            <Link href="/upload" className="rounded-xl bg-purple-600 px-6 py-3 font-semibold hover:bg-purple-500">
              + Create New Reel
            </Link>
          </header>

          {/* Stats */}
          <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["📹", "Uploaded Videos", "0"],
              ["🎬", "Projects", "0"],
              ["✨", "Reels Created", "0"],
              ["⏱️", "Processing", "0"],
            ].map(([icon, title, value]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-[#151522] p-5">
                <p className="text-2xl">{icon}</p>
                <p className="mt-4 text-sm text-gray-400">{title}</p>
                <p className="mt-1 text-3xl font-bold">{value}</p>
              </div>
            ))}
          </div>

          {/* Quick Start */}
          <div className="mb-10 rounded-2xl border border-purple-400/20 bg-linear-to-r from-purple-900/30 to-[#171326] p-7">
            <h3 className="text-2xl font-bold">Ready to create something amazing?</h3>
            <p className="mt-2 text-gray-400">
              Upload one long video or multiple clips and start your creative journey.
            </p>
            <Link href="/upload" className="mt-6 inline-block rounded-xl bg-purple-600 px-6 py-3 font-semibold hover:bg-purple-500">
              Upload Your Videos →
            </Link>
          </div>

          {/* AI Tools */}
          <div>
            <h3 className="mb-5 text-2xl font-bold">Explore AI Tools</h3>

            <div className="grid gap-5 sm:grid-cols-2">
              {tools.map((tool) => (
                <Link
                  href={tool.link}
                  key={tool.title}
                  className="rounded-2xl border border-white/10 bg-[#151522] p-6 transition hover:border-purple-400/60 hover:bg-[#1c1a2c]"
                >
                  <p className="text-3xl">{tool.icon}</p>
                  <h4 className="mt-4 text-xl font-semibold">{tool.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-gray-400">
                    {tool.description}
                  </p>
                  <p className="mt-5 text-sm font-semibold text-purple-300">
                    Explore Tool →
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Projects */}
          <div className="mt-12">
            <h3 className="text-2xl font-bold">Recent Projects</h3>
            <div className="mt-5 rounded-2xl border border-white/10 bg-[#151522] p-10 text-center">
              <p className="text-4xl">🎞️</p>
              <h4 className="mt-4 text-lg font-semibold">No projects yet</h4>
              <p className="mt-2 text-sm text-gray-400">
                Your uploaded videos and created reels will appear here.
              </p>
              <Link href="/upload" className="mt-5 inline-block text-purple-300 hover:text-purple-200">
                Create your first project →
              </Link>
            </div>
          </div>

        </section>
      </div>
    </main>
  );
}
