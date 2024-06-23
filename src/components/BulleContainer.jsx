import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import "../style/BulleContainer.css";
import { Bulle } from "./Bulle";

export function BulleContainer({ text, align, author, date }) {
  const [message] = useState(text);
  const [position] = useState(align);
  // const [messageDate] = useState(date);
  // const [messageAuthor] = useState(author);

  return (
    <div className={"BulleContainer " + align}>
      <Bulle text={message} align={position} />
    </div>
  );
}
