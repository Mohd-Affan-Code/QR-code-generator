import React, { useRef, useState } from "react";
import { Download, Copy, QrCode, RefreshCcw } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

// Tailwind is assumed available. No external API keys needed.
// Install deps:
// npm i qrcode.react lucide-react
// Then use <QrGenerator /> in your App.

// NOTE about Clipboard in sandboxed environments:
// Some environments (like embedded sandboxes) block navigator.clipboard.writeText
// with a NotAllowedError. We try the modern Clipboard API first and then fall
// back to a classic textarea+execCommand('copy') approach. If both fail, we
// gracefully inform the user and do not crash the component.

export default function QrGenerator() {
const [text, setText] = useState("https://your-website.com");
const [size, setSize] = useState(256);
const [margin, setMargin] = useState(2);
const [level, setLevel] = useState("M"); // L, M, Q, H
const [bgColor, setBgColor] = useState("#ffffff");
const [fgColor, setFgColor] = useState("#000000");

const canvasRef = useRef(null);

const handleDownloadPNG = () => {
try {
const canvas = canvasRef.current?.querySelector("canvas");
if (!canvas) {
alert("No QR canvas found to download.");
return;
}
const link = document.createElement("a");
link.download = `qr-${Date.now()}.png`;
link.href = canvas.toDataURL("image/png");
link.click();
} catch (err) {
console.error("Download failed:", err);
alert("Download failed. See console for details.");
}
};

async function fallbackCopyTextToClipboard(textToCopy) {
// Classic fallback: create a temporary textarea, select and execCommand
return new Promise((resolve, reject) => {
try {
const textArea = document.createElement("textarea");
textArea.value = textToCopy;
// Avoid scrolling to bottom
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
if (!text) {
alert("Nothing to copy — please enter text or URL first.");
return;
}

    // First try the modern Clipboard API
    try {
      if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        await navigator.clipboard.writeText(text);
        alert("Text copied to clipboard!");
        return;
      }
    } catch (err) {
      // Common in sandboxed environments: NotAllowedError
      console.warn("navigator.clipboard.writeText failed:", err);
    }

    // Fallback to execCommand approach
    try {
      await fallbackCopyTextToClipboard(text);
      alert("Text copied to clipboard (fallback).");
      return;
    } catch (err) {
      console.warn("Fallback copy failed:", err);
    }

    // Final fallback: show the text in a prompt so user can copy manually
    try {
      // Use a simple prompt as last resort (user can Ctrl+C)
      // We avoid throwing — just inform the user.
      window.prompt("Copy the text below (Ctrl/Cmd+C):", text);
    } catch (err) {
      console.error("All copy methods failed:", err);
      alert("Copy not available in this environment. Please select the text and copy manually.");
    }

};

const handleReset = () => {
setText("");
setSize(256);
setMargin(2);
setLevel("M");
setBgColor("#ffffff");
setFgColor("#000000");
};

return (
<div className="min-h-screen w-full bg-gray-50 text-gray-900 p-6 md:p-10">
<div className="max-w-5xl mx-auto grid gap-6 md:grid-cols-2">
{/_ Left: Controls _/}
<div className="bg-white rounded-2xl shadow p-5 md:p-6 space-y-5">
<div className="flex items-center gap-3">
<QrCode className="w-6 h-6" />
<h1 className="text-2xl font-semibold">QR Code Generator</h1>
</div>

          <label className="block text-sm font-medium">Text / URL</label>
          <div className="flex gap-2">
            <input
              className="w-full rounded-xl border p-3 outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Type text, URL, phone, etc."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <button
              className="rounded-xl px-3 border hover:bg-gray-100"
              title="Copy"
              onClick={handleCopy}
              disabled={!text}
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Size: {size}px</label>
              <input
                type="range"
                min={128}
                max={768}
                step={16}
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value, 10))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Margin: {margin}px</label>
              <input
                type="range"
                min={0}
                max={16}
                value={margin}
                onChange={(e) => setMargin(parseInt(e.target.value, 10))}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Error Level</label>
              <select
                className="w-full rounded-xl border p-2"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
              >
                <option value="L">L (7%)</option>
                <option value="M">M (15%)</option>
                <option value="Q">Q (25%)</option>
                <option value="H">H (30%)</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium">FG Color</label>
                <input
                  type="color"
                  className="w-full h-10 rounded"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium">BG Color</label>
                <input
                  type="color"
                  className="w-full h-10 rounded"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 shadow"
              onClick={handleDownloadPNG}
            >
              <Download className="w-4 h-4" /> Download PNG
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 border hover:bg-gray-100"
              onClick={handleReset}
            >
              <RefreshCcw className="w-4 h-4" /> Reset
            </button>
          </div>
        </div>

        {/* Right: Preview */}
        <div className="bg-white rounded-2xl shadow p-5 md:p-6 flex flex-col items-center justify-center">
          <div className="text-sm text-gray-500 mb-2">Live preview</div>
          <div
            ref={canvasRef}
            className="rounded-2xl p-4 border"
            style={{ background: bgColor }}
          >
            {/* QR Code Canvas */}
            <QRCodeCanvas
              value={text || ""}
              size={size}
              includeMargin={true}
              level={level}
              bgColor={bgColor}
              fgColor={fgColor}
            />
          </div>
          <p className="mt-4 text-xs text-gray-500 text-center">
            Tip: Higher error level (H) makes the code more robust but slightly denser.
          </p>
        </div>
      </div>

      <footer className="max-w-5xl mx-auto mt-8 text-center text-xs text-gray-500">
        Built with <code>qrcode.react</code> • No tracking • Works offline
      </footer>
    </div>

);
}
