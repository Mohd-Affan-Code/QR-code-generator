import React, { useState } from "react";

export default function QRHeader({
  title = "QR Code Generator",
  onHome = () => {},
  onGenerate = () => {},
  onHistory = () => {},
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);

  return (
    <header className="w-full bg-white dark:bg-slate-900 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: logo + title */}
          <div className="flex items-center gap-3">
            <button
              onClick={onHome}
              className="flex items-center gap-3 focus:outline-none"
              aria-label="Home"
            >
              <svg
                className="w-9 h-9 rounded-md p-1 bg-indigo-50 dark:bg-indigo-900"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="24" height="24" rx="6" fill="currentColor" />
                <path
                  d="M7 12h10M12 7v10"
                  stroke="#fff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <div className="flex flex-col text-left">
                <span className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  {title}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Generate nice QR codes instantly
                </span>
              </div>
            </button>
          </div>

          {/* Middle: nav (hidden on small) */}
          <nav className="hidden md:flex items-center gap-4">
            <button
              onClick={onGenerate}
              className="px-3 py-1 rounded-md text-sm font-medium bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none"
            >
              Generate
            </button>

            <button
              onClick={onHistory}
              className="px-3 py-1 rounded-md text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
            >
              History
            </button>

            <a
              href="#features"
              className="px-3 py-1 rounded-md text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Features
            </a>
          </nav>

          {/* Right: actions */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            <button
              onClick={() => setDark((d) => !d)}
              className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
              aria-label="Toggle theme"
            >
              {dark ? (
                <svg
                  className="w-5 h-5 text-yellow-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-slate-700"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen((s) => !s)}
              className="md:hidden p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none"
              aria-label="Open menu"
            >
              <svg
                className="w-6 h-6"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileOpen && (
          <div className="md:hidden mt-3 pb-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex flex-col gap-2">
              <button
                onClick={onGenerate}
                className="w-full text-left px-3 py-2 rounded-md font-medium bg-indigo-600 text-white"
              >
                Generate
              </button>
              <button
                onClick={onHistory}
                className="w-full text-left px-3 py-2 rounded-md font-medium"
              >
                History
              </button>
              <a
                href="#features"
                className="w-full text-left px-3 py-2 rounded-md font-medium"
              >
                Features
              </a>
            </div>
          </div>
        )}
      </div>

      {/* small script to toggle a 'dark' class on body when dark state changes -- optional */}
      <style jsx>{`
        /* If you prefer automatic body class toggle, uncomment and adapt in your app */
      `}</style>
    </header>
  );
}
