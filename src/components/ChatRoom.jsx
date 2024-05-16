import "./Discussions.jsx";
import { Discussions } from "./Discussions.jsx";
import { Chat } from "./Chat.jsx";

import "../style/ChatRoom.css";

export function ChatRoom() {
  // Refuse to go back to the previous page (work only twice)
  window.history.pushState(null, "", window.location.href);

  return (
    <div className="chat-room">
      {/* barre latérale  */}
      {/* liste des discussions */}
      <Discussions />
      <Chat />
      {/* chat */}
    </div>
  );
}
