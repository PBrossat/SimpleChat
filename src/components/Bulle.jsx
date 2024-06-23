import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import "../style/Bulle.css";

export function Bulle({ text, align }) {
  const [message, setMessage] = useState(text);

  const handleMessage = () => {
    setMessage(text);
  };

  const bubbleClass =
    align === "left" ? "message-bubble in" : "message-bubble out ";

  return (
    <div className="Bulle">
      <div className={bubbleClass}>{message}</div>
    </div>
  );
}
