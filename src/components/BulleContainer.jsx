import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import "../style/BulleContainer.css";
import { Bulle } from "./Bulle";

export function BulleContainer({ text, align, author, date }) {
  const [message, setMessage] = useState(text);

  const handleMessage = () => {
    setMessage(text);
  };

  return (
    <div className={"BulleContainer " + align}>
      <Bulle text={text} align={align} />
    </div>
  );
}
