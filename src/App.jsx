import React, { useState, useRef } from "react";
import LeftCom from "./components/LeftCom";
import RightCom from "./components/RightCom";
import Footer from "./components/Footer";
import QRHeader from "./components/Header";

function App() {
  const [text, setText] = useState("https://your-website.com");
  const [size, setSize] = useState(200);
  const [margin, setMargin] = useState(2);
  const [level, setLevel] = useState("M"); // L, M, Q, H
  const [bgColor, setBgColor] = useState("#ffffff");
  const [fgColor, setFgColor] = useState("#000000");

  const canvasRef = useRef(null);
  const handleDownLoad = () => {
    const canvas = canvasRef.current?.querySelector("canvas");
    const imageURL = canvas.toDataURL("image/png"); // 🧠 canvas → image base64
    const link = document.createElement("a");
    link.href = imageURL;
    link.download = "myQR.png"; // download file name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setText("");
    setSize(200);
    setMargin(2);
    setLevel("M");
    setBgColor("#ffffff");
    setFgColor("#000000");
  };

  const userData = {
    text,
    setText,
    size,
    setSize,
    margin,
    setMargin,
    level,
    setLevel,
    bgColor,
    setBgColor,
    fgColor,
    setFgColor,
  };
  console.log(text);

  return (
    <>
      <QRHeader />
      <div className="flex flex-wrap gap-7 justify-center items-center">
        <LeftCom
          data={userData}
          handleReset={handleReset}
          handleDownLoad={handleDownLoad}
        />
        <RightCom
          text={text}
          canvasRef={canvasRef}
          size={size}
          level={level}
          fgColor={fgColor}
          bgColor={bgColor}
        />
      </div>
      <Footer />
    </>
  );
}

export default App;
