import "./Discussions.jsx";
import React, { useState } from "react";
import { Discussions } from "./Discussions.jsx";
import "../style/ChatRoom.css";

export function ChatRoom() {
  const localStorage = window.localStorage;
  const [currentUser] = useState(JSON.parse(localStorage.getItem("user")));

  // Refuse to go back to the previous page (work only twice)
  window.history.pushState(null, "", window.location.href);

  return (
    <div className="chat-room">
      {/* barre latérale  */}
      {/* liste des discussions */}
      <Discussions />
      {/* chat */}
    </div>
  );
}
