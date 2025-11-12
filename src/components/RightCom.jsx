import { QRCodeCanvas } from "qrcode.react";

function RightCom({ canvasRef, level, bgColor, fgColor, size, text }) {
  console.log(canvasRef);
  return (
    <div className="bg-linear-to-br from-gray-50 to-white rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center text-center">
      {/* Header */}
      <div className="text-sm font-medium text-gray-500 mb-3 uppercase tracking-wide">
        Live Preview
      </div>

      {/* QR Code Box */}
      <div
        className="rounded-2xl p-6 border border-gray-200 bg-white shadow-inner flex items-center justify-center"
        style={{ width: "240px", height: "240px" }}
        ref={canvasRef}
      >
        <span className="text-gray-400 text-sm">
          <QRCodeCanvas
            value={text || "https://mohdaffanportfolio.vercel.app/"}
            size={size}
            includeMargin={true}
            level={level}
            bgColor={bgColor}
            fgColor={fgColor}
          />
        </span>
      </div>

      {/* Tip */}
      <p className="mt-6 text-sm text-gray-600 max-w-sm">
        💡 <span className="font-medium">Tip:</span> Higher error level (H)
        makes the QR more robust but slightly denser.
      </p>
    </div>
  );
}

export default RightCom;
