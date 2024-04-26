import "./Discussions.jsx";
import React, { useState } from "react";
import { Discussions } from "./Discussions.jsx";
import "../style/ChatRoom.css";

export function ChatRoom() {
  const localStorage = window.localStorage;
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  return (
    <div className="chat-room">
      {/* barre latérale  */}
      {/* liste des discussions */}
      <Discussions />
      {/* chat */}
      Bonjour : {currentUser.username}
    </div>
  );
}
