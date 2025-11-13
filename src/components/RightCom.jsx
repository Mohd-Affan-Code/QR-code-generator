import { QRCodeCanvas } from "qrcode.react";

function RightCom({ canvasRef, level, bgColor, fgColor, size, text, margin }) {
  console.log(canvasRef);
  return (
    <div className="bg-linear-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg dark:shadow-gray-900/30 p-8 flex flex-col items-center justify-center text-center border border-gray-200 dark:border-gray-700">
      {/* Header */}
      <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">
        Live Preview
      </div>

      {/* QR Code Box */}
      <div
        className="rounded-2xl p-6 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-inner flex items-center justify-center"
        style={{ width: "240px", height: "240px" }}
        ref={canvasRef}
      >
        <span className="text-gray-400 dark:text-gray-500 text-sm">
          <QRCodeCanvas
            value={text || "https://mohdaffanportfolio.vercel.app/"}
            size={size}
            includeMargin={true}
            level={level}
            bgColor={bgColor}
            fgColor={fgColor}
            marginSize={margin}
          />
        </span>
      </div>

      {/* Tip */}
      <p className="mt-6 text-sm text-gray-600 dark:text-gray-300 max-w-sm">
        💡 <span className="font-medium">Tip:</span> Higher error level (H)
        makes the QR more robust but slightly denser.
      </p>
    </div>
  );
}

export default RightCom;
