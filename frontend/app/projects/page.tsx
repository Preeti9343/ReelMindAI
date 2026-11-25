
"use client";

import { useState } from "react";
import Link from "next/link";

const initialProjects = [
  {
    id: 1,
    name: "My First Travel Reel",
    category: "Travel",
    status: "Completed",
    date: "Demo Project",
    progress: 100,
    icon: "🏔️",
  },
  {
    id: 2,
    name: "Birthday Celebration",
    category: "Personal",
    status: "Processing",
    date: "Demo Project",
    progress: 65,
    icon: "🎂",
  },
  {
    id: 3,
    name: "Food & Cooking Video",
    category: "Food",
    status: "Draft",
    date: "Demo Project",
    progress: 0,
    icon: "🍳",
  },
];

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

export default function ProjectsPage() {
  const [projects, setProjects] = useState(initialProjects);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [notice, setNotice] = useState("");

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || project.status === filter;

    return matchesSearch && matchesFilter;
  });

  const deleteProject = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this demo project?"
    );

    if (confirmed) {
      setProjects((previous) =>
        previous.filter((project) => project.id !== id)
      );
      setNotice("Demo project removed from this page.");
    }
  };

  const statusStyle = (status: string) => {
    if (status === "Completed")
      return "bg-green-500/15 text-green-400";
    if (status === "Processing")
      return "bg-yellow-500/15 text-yellow-400";
    return "bg-gray-500/15 text-gray-400";
  };

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
                  href === "/projects"
                    ? "bg-purple-600/20 text-purple-300"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 p-5 md:p-8">
          <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm text-purple-400">Your Workspace</p>
              <h2 className="mt-1 text-3xl font-bold">My Projects</h2>
              <p className="mt-2 text-sm text-gray-400">
                Manage your video projects and generated reels.
              </p>
            </div>

            <Link
              href="/upload"
              className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-3 text-sm font-semibold"
            >
              + New Project
            </Link>
          </header>

          {notice && (
            <div className="mb-5 flex items-center justify-between rounded-xl border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-300">
              {notice}
              <button onClick={() => setNotice("")}>✕</button>
            </div>
          )}

          <section className="mb-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              {
                label: "Total Projects",
                value: projects.length,
                icon: "📁",
              },
              {
                label: "Completed",
                value: projects.filter((p) => p.status === "Completed").length,
                icon: "✅",
              },
              {
                label: "Processing",
                value: projects.filter((p) => p.status === "Processing").length,
                icon: "⚡",
              },
              {
                label: "Drafts",
                value: projects.filter((p) => p.status === "Draft").length,
                icon: "📝",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-[#11131c] p-5"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">{stat.label}</p>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <h3 className="mt-4 text-3xl font-bold">{stat.value}</h3>
              </div>
            ))}
          </section>

          <section className="mb-6 rounded-2xl border border-white/10 bg-[#11131c] p-5">
            <div className="flex flex-col gap-4 md:flex-row">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects..."
                className="min-w-0 flex-1 rounded-xl border border-white/10 bg-[#171923] px-4 py-3 text-sm outline-none focus:border-purple-500"
              />

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="rounded-xl border border-white/10 bg-[#171923] px-4 py-3 text-sm outline-none focus:border-purple-500"
              >
                <option>All</option>
                <option>Completed</option>
                <option>Processing</option>
                <option>Draft</option>
              </select>
            </div>
          </section>

          <section>
            <div className="mb-5 flex items-center justify-between">
              <h3 className="text-xl font-semibold">All Projects</h3>
              <span className="text-sm text-gray-500">
                {filteredProjects.length} projects
              </span>
            </div>

            {filteredProjects.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/15 bg-[#11131c] p-12 text-center">
                <p className="text-4xl">🔍</p>
                <h3 className="mt-4 font-semibold">No projects found</h3>
                <p className="mt-2 text-sm text-gray-500">
                  Try changing your search or filter.
                </p>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-[#11131c]"
                  >
                    <div className="flex h-40 items-center justify-center bg-gradient-to-br from-purple-900/40 via-[#171923] to-pink-900/30">
                      <span className="text-6xl">{project.icon}</span>
                    </div>

                    <div className="p-5">
                      <div className="mb-3 flex items-center justify-between gap-2">
                        <span className="text-xs text-purple-300">
                          {project.category}
                        </span>
                        <span
                          className={`rounded-full px-3 py-1 text-xs ${statusStyle(
                            project.status
                          )}`}
                        >
                          {project.status}
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold">
                        {project.name}
                      </h3>

                      <p className="mt-2 text-xs text-gray-500">
                        {project.date}
                      </p>

                      <div className="mt-5">
                        <div className="mb-2 flex justify-between text-xs">
                          <span className="text-gray-400">Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="mt-5 flex gap-2">
                        <button
                          onClick={() =>
                            setNotice(
                              `${project.name}: This is a demo project. Actual project opening will be connected with the backend later.`
                            )
                          }
                          className="flex-1 rounded-xl bg-purple-600/20 py-2.5 text-sm text-purple-300 hover:bg-purple-600/30"
                        >
                          Open Project
                        </button>

                        <button
                          onClick={() => deleteProject(project.id)}
                          className="rounded-xl border border-red-500/20 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <footer className="mt-10 border-t border-white/10 pt-5 text-center text-xs text-gray-500">
            ReelMind AI · From Raw Footage to Creative Stories
          </footer>
        </main>
      </div>
    </div>
  );
}
