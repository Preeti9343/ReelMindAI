
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

export default function SettingsPage() {
  const [name, setName] = useState("ReelMind User");
  const [email, setEmail] = useState("user@example.com");
  const [retention, setRetention] = useState("30 days");
  const [customDays, setCustomDays] = useState("45");
  const [autoDelete, setAutoDelete] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [privateAccount, setPrivateAccount] = useState(true);
  const [trainingConsent, setTrainingConsent] = useState(false);
  const [notice, setNotice] = useState("");

  const cardClass =
    "rounded-2xl border border-white/10 bg-[#11131c] p-5 md:p-6";

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-[#171923] px-4 py-3 text-sm text-white outline-none focus:border-purple-500";

  const toggle = (
    checked: boolean,
    onChange: (value: boolean) => void
  ) => (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
        checked ? "bg-purple-600" : "bg-gray-600"
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
          checked ? "left-6" : "left-1"
        }`}
      />
    </button>
  );

  const saveSettings = () => {
    setNotice(
      "Demo only: Settings have not been saved to a database. Backend integration is still required."
    );
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
                  href === "/settings"
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
          <header className="mb-8">
            <p className="text-sm text-purple-400">Account Management</p>
            <h2 className="mt-1 text-3xl font-bold">
              Settings & Privacy ⚙️
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Manage your account, security and data preferences.
            </p>
          </header>

          {notice && (
            <div className="mb-6 flex items-start justify-between gap-4 rounded-xl border border-yellow-500/20 bg-yellow-500/10 p-4 text-sm text-yellow-200">
              <p>{notice}</p>
              <button onClick={() => setNotice("")}>✕</button>
            </div>
          )}

          <div className="space-y-6">
            <section className={cardClass}>
              <div className="mb-5">
                <h3 className="text-xl font-semibold">👤 Profile Information</h3>
                <p className="mt-1 text-sm text-gray-400">
                  Manage your basic account details.
                </p>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm text-gray-400">
                    Full Name
                  </label>
                  <input
                    className={inputClass}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm text-gray-400">
                    Email Address
                  </label>
                  <input
                    className={inputClass}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </section>

            <section className={cardClass}>
              <h3 className="text-xl font-semibold">🔐 Account Security</h3>
              <p className="mt-1 text-sm text-gray-400">
                Security options for your account.
              </p>

              <div className="mt-5 divide-y divide-white/10">
                <div className="flex flex-wrap items-center justify-between gap-4 py-4">
                  <div>
                    <p className="font-medium">Two-Factor Authentication</p>
                    <p className="mt-1 text-xs text-gray-500">
                      Add an additional verification step when signing in.
                    </p>
                  </div>
                  {toggle(twoFactor, setTwoFactor)}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 py-4">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="mt-1 text-xs text-gray-500">
                      Receive important account and project updates.
                    </p>
                  </div>
                  {toggle(emailNotifications, setEmailNotifications)}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 py-4">
                  <div>
                    <p className="font-medium">Private Account</p>
                    <p className="mt-1 text-xs text-gray-500">
                      Keep your uploaded content private by default.
                    </p>
                  </div>
                  {toggle(privateAccount, setPrivateAccount)}
                </div>
              </div>
            </section>

            <section className={`${cardClass} border-purple-500/20`}>
              <div className="mb-5">
                <h3 className="text-xl font-semibold">
                  🗄️ Video Storage & Retention
                </h3>
                <p className="mt-1 text-sm text-gray-400">
                  Choose how long your videos and projects should be retained.
                </p>
              </div>

              <div>
                <label className="mb-3 block text-sm font-medium">
                  Retention Duration
                </label>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {[
                    "7 days",
                    "30 days",
                    "90 days",
                    "6 months",
                    "1 year",
                    "Custom",
                  ].map((duration) => (
                    <button
                      key={duration}
                      onClick={() => setRetention(duration)}
                      className={`rounded-xl border px-4 py-4 text-sm transition ${
                        retention === duration
                          ? "border-purple-500 bg-purple-500/15 text-purple-300"
                          : "border-white/10 bg-[#171923] text-gray-400 hover:border-white/30"
                      }`}
                    >
                      {duration}
                      {retention === duration && (
                        <span className="ml-2">✓</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {retention === "Custom" && (
                <div className="mt-5">
                  <label className="mb-2 block text-sm text-gray-400">
                    Custom duration (days)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="3650"
                    className={inputClass}
                    value={customDays}
                    onChange={(e) => setCustomDays(e.target.value)}
                  />
                </div>
              )}

              <div className="mt-6 border-t border-white/10 pt-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">Automatic Deletion</p>
                    <p className="mt-1 text-xs text-gray-500">
                      Automatically delete content after the selected retention period.
                    </p>
                  </div>
                  {toggle(autoDelete, setAutoDelete)}
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
                <p className="text-sm font-medium text-yellow-300">
                  Important Privacy Note
                </p>
                <p className="mt-2 text-xs leading-6 text-gray-400">
                  Retention settings are currently a frontend demonstration.
                  Actual scheduled deletion, backup cleanup and storage policies
                  must be implemented securely in the backend.
                </p>
              </div>
            </section>

            <section className={cardClass}>
              <h3 className="text-xl font-semibold">🛡️ Privacy & Data</h3>
              <p className="mt-1 text-sm text-gray-400">
                Control how your data is handled.
              </p>

              <div className="mt-5 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">AI Training Consent</p>
                    <p className="mt-1 text-xs text-gray-500">
                      Optional permission for using your content to improve AI.
                    </p>
                  </div>
                  {toggle(trainingConsent, setTrainingConsent)}
                </div>

                <div className="rounded-xl border border-white/10 bg-[#171923] p-4">
                  <p className="font-medium">Your Data Rights</p>
                  <ul className="mt-3 space-y-2 text-sm text-gray-400">
                    <li>• Request a copy of your personal data.</li>
                    <li>• Delete uploaded videos and generated reels.</li>
                    <li>• Request account deletion.</li>
                    <li>• Control how long your content is retained.</li>
                  </ul>
                  <p className="mt-3 text-xs text-gray-500">
                    These actions require backend and account-management integration.
                  </p>
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-red-500/20 bg-[#11131c] p-5 md:p-6">
              <h3 className="text-xl font-semibold text-red-400">
                ⚠️ Danger Zone
              </h3>
              <p className="mt-2 text-sm text-gray-400">
                Account deletion is permanent and should remove your account data
                according to the product's deletion policy.
              </p>
              <button
                onClick={() =>
                  setNotice(
                    "Account deletion is not connected yet. No account or data has been deleted."
                  )
                }
                className="mt-5 rounded-xl border border-red-500/30 px-5 py-3 text-sm text-red-400 hover:bg-red-500/10"
              >
                Delete My Account
              </button>
            </section>

            <div className="flex flex-wrap justify-end gap-3">
              <button
                onClick={() => {
                  setName("ReelMind User");
                  setEmail("user@example.com");
                  setRetention("30 days");
                  setCustomDays("45");
                  setAutoDelete(true);
                  setEmailNotifications(true);
                  setTwoFactor(false);
                  setPrivateAccount(true);
                  setTrainingConsent(false);
                  setNotice("Demo settings reset to their default values.");
                }}
                className="rounded-xl border border-white/10 px-5 py-3 text-sm text-gray-300 hover:bg-white/5"
              >
                Reset
              </button>

              <button
                onClick={saveSettings}
                className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-sm font-semibold"
              >
                Save Changes
              </button>
            </div>
          </div>

          <footer className="mt-10 border-t border-white/10 pt-5 text-center text-xs text-gray-500">
            ReelMind AI · Your Content, Your Control.
          </footer>
        </main>
      </div>
    </div>
  );
}
