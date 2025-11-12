import React from "react";
import { Download, Copy, QrCode, RefreshCcw } from "lucide-react";

function LeftCom({ data, handleReset, handleDownLoad }) {
  async function fallbackCopyTextToClipboard(textToCopy) {
    return new Promise((resolve, reject) => {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        textArea.style.position = "fixed";
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.width = "1px";
        textArea.style.height = "1px";
        textArea.style.padding = "0";
        textArea.style.border = "none";
        textArea.style.outline = "none";
        textArea.style.boxShadow = "none";
        textArea.style.background = "transparent";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        const successful = document.execCommand("copy");
        document.body.removeChild(textArea);
        if (successful) resolve(true);
        else reject(new Error("execCommand returned false"));
      } catch (err) {
        reject(err);
      }
    });
  }

  const handleCopy = async () => {
    console.log(data.text);
    if (!data.text) {
      alert("Nothing to copy — please enter text or URL first.");
      return;
    }

    try {
      if (
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === "function"
      ) {
        await navigator.clipboard.writeText(data.text);
        alert("Text copied to clipboard!");
        return;
      }
    } catch (err) {
      console.warn("navigator.clipboard.writeText failed:", err);
    }

    // Fallback to execCommand approach
    try {
      await fallbackCopyTextToClipboard(data.text);
      alert("Text copied to clipboard (fallback).");
      return;
    } catch (err) {
      console.warn("Fallback copy failed:", err);
    }

    try {
      window.prompt("Copy the text below (Ctrl/Cmd+C):", data.text);
    } catch (err) {
      console.error("All copy methods failed:", err);
      alert(
        "Copy not available in this environment. Please select the text and copy manually."
      );
    }
  };
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6 w-full max-w-md">
      {/* Header */}
      <div className="flex items-center gap-3 border-b pb-3">
        <div className="p-2 bg-indigo-100 rounded-lg">
          <QrCode className="w-6 h-6 text-indigo-600" />
        </div>
        <h1 className="text-2xl font-semibold text-gray-800">
          QR Code Generator
        </h1>
      </div>

      {/* Input Field */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-2">
          Text / URL
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            name="inputValue"
            placeholder="Type text, URL, phone, etc."
            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none"
            value={data.text}
            onChange={(e) => data.setText(e.target.value)}
          />
          <button
            title="Copy"
            className="p-2 border rounded-xl hover:bg-gray-100 transition cursor-pointer"
            onClick={handleCopy}
            // disabled={!data.text}
          >
            <Copy className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Size: {data.size}px
          </label>
          <input
            type="range"
            min={128}
            max={250}
            step={10}
            value={data.size}
            className="w-full accent-indigo-600"
            onChange={(e) => data.setSize(parseInt(e.target.value, 10))}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Margin: {data.margin}px
          </label>
          <input
            type="range"
            min={0}
            max={16}
            value={data.margin}
            className="w-full accent-indigo-600"
            onChange={(e) => data.setMargin(parseInt(e.target.value, 10))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Error Level
          </label>
          <select
            className="w-full rounded-xl border px-2 py-2 text-gray-700 focus:ring-2 focus:ring-indigo-500 outline-none"
            value={data.level}
            onChange={(e) => data.setLevel(e.target.value)}
          >
            <option value="L">L (7%)</option>
            <option value="M">M (15%)</option>
            <option value="Q">Q (25%)</option>
            <option value="H">H (30%)</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              FG Color
            </label>
            <input
              type="color"
              className="w-full h-10 rounded"
              value={data.fgColor}
              onChange={(e) => data.setFgColor(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              BG Color
            </label>
            <input
              type="color"
              className="w-full h-10 rounded"
              value={data.bgColor}
              onChange={(e) => data.setBgColor(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-2">
        <button
          className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 shadow transition cursor-pointer"
          onClick={() => handleDownLoad()}
        >
          <Download className="w-4 h-4" /> Download PNG
        </button>
        <button
          className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 border border-gray-300 hover:bg-gray-100 text-gray-700 transition cursor-pointer"
          onClick={() => handleReset()}
        >
          <RefreshCcw className="w-4 h-4" /> Reset
        </button>
      </div>
    </div>
  );
}

export default LeftCom;
