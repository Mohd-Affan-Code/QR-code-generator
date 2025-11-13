import React, { useState } from "react";
import { Plus, Moon, Sun } from "lucide-react";

function Header() {
  const [theme, setTheme] = useState(true);
  function handleMode() {
    document.documentElement.classList.toggle("dark");
    if (document.documentElement.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
      setTheme(false);
    } else {
      localStorage.setItem("theme", "light");
      setTheme(true);
    }
  }

  if (localStorage.getItem("theme") === "dark") {
    document.documentElement.classList.add("dark");
  }
  return (
    <header className="  bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4 mb-3.5">
      <div className=" flex justify-between max-w-7xl mx-auto">
        <div className="flex items-center gap-3 ">
          <span className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-lg shadow-sm">
            <Plus size={20} />
          </span>
          <div>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              QR Code Generator
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Generate nice QR codes instantly
            </p>
          </div>
        </div>
        <div className="flex items-center">
          <button
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            onClick={handleMode}
          >
            {theme ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
