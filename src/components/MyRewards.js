import React, { useState } from "react";
import "../styles/MyRewards.css";
import { QrScanner } from "@yudiel/react-qr-scanner";

function MyRewards() {
  const [first, setfirst] = useState(false);
  const [msg, setmsg] = useState("");
  return (
    <div>
      <div className="no-rewards-container">
        <div className="no-rewards-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
            className="icon"
          >
            <path d="m98-537 168-168q14-14 33-20t39-2l52 11q-54 64-85 116t-60 126L98-537Zm205 91q23-72 62.5-136T461-702q88-88 201-131.5T873-860q17 98-26 211T716-448q-55 55-120 95.5T459-289L303-446Zm276-120q23 23 56.5 23t56.5-23q23-23 23-56.5T692-679q-23-23-56.5-23T579-679q-23 23-23 56.5t23 56.5ZM551-85l-64-147q74-29 126.5-60T730-377l10 52q4 20-2 39.5T718-252L551-85ZM162-318q35-35 85-35.5t85 34.5q35 35 35 85t-35 85q-25 25-83.5 43T87-74q14-103 32-161t43-83Z" />
          </svg>
        </div>
        <div className="no-rewards-info">
          <span className="no-rewards-info-title">
            Get tickets and get started!
          </span>
          <span className="no-rewards-info-description">
            Start by scanning your ticket.
          </span>
        </div>
      </div>
      <button onClick={() => setfirst(!first)}>Scan Doc</button>
      {first ? (
        <QrScanner
          onDecode={(result) => {
            setmsg(result);
            setfirst(!first);
          }}
          onError={(error) => {
            setmsg(error?.message);
            setfirst(!first);
          }}
        />
      ) : null}
      {msg ? <p>{msg}</p> : null}
    </div>
  );
}

export default MyRewards;
