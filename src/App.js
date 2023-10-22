import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

import img2 from "./assets/ticket.jpg";
import qrcodeimg from "./assets/qrcode.png";
import SetQRCode from "./components/SetQRCode";
import Header from "./components/Header";
import AddEvent from "./components/AddEvent";

function App() {
  const [ticketWithoutQR, setTicketWithoutQR] = useState("");
  const canvasRef = useRef(null);
  const [first, setfirst] = useState(1);
  const [position, setPosition] = useState({ x: 800, y: 50 });
  const [qrSize, setQrSize] = useState(100);

  const showCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Clear any previous content on the canvas
    const jsonData = [
      {
        eventName: "Music Festival",
        event_venue: "address",
        ticketImage: "2023-10-28",
        collection_name: "artist collection",
      },
    ];
    const jsonString = JSON.stringify(jsonData);
    const img = new Image();
    img.src = ticketWithoutQR;
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      QRCode.toDataURL(jsonString, function (err, url) {
        const qrCodeImage = new Image();

        qrCodeImage.src = url;

        qrCodeImage.onload = () => {
          ctx.drawImage(qrCodeImage, position.x, position.y, qrSize, qrSize); // Adjust x and y coordinates as needed
        };
      });
    };
    setfirst((prev) => prev + 1);
  };

  useEffect(() => {
    if (img2 && qrcodeimg) showCanvas();
  }, [position, qrSize]);

  const handleDownload = () => {
    const canvas = canvasRef.current;

    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "ticket_with_qr_code.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="App">
      <Header />
      <AddEvent
        setTicketWithoutQR={setTicketWithoutQR}
        ticketWithoutQR={ticketWithoutQR}
      />
      <div className="main-container">
        <button onClick={showCanvas} className="sample-ticket">
          Show Ticket with QR
        </button>
        {first && (
          <div>
            <canvas
              ref={canvasRef}
              id="canvas"
              height={"500px"}
              width={"1000px"}
              style={{ border: "1px solid white", padding: "10px" }}
            />
          </div>
        )}
        <SetQRCode
          position={position}
          setPosition={setPosition}
          setQrSize={setQrSize}
        />
        <button onClick={handleDownload}>download</button>
      </div>
    </div>
  );
}

export default App;
