import "./Discussions.jsx";
import { Discussions } from "./Discussions.jsx";
import { Chat } from "./Chat.jsx";
import { useState } from "react";

import "../style/ChatRoom.css";
import { MessageInput } from "./MessageInput.jsx";
import { MessagesBox } from "./MessagesBox.jsx";

export function ChatRoom() {
  // Refuse to go back to the previous page (work only twice)
  window.history.pushState(null, "", window.location.href);
  const [isCreateDiscussionInputVisible, setIsCreateDiscussionInputVisible] =
    useState(false);
  const [discussionToDisplay, setDiscussionToDisplay] = useState(null);

  return (
    <div className="chat-room">
      {/* barre latérale  */}
      {/* liste des discussions */}
      <Discussions
        isCreateDiscussionInputVisible={isCreateDiscussionInputVisible}
        setIsCreateDiscussionInputVisible={setIsCreateDiscussionInputVisible}
        setDiscussionToDisplay={setDiscussionToDisplay}
      />
      <Chat
        isCreateDiscussionInputVisible={isCreateDiscussionInputVisible}
        setIsCreateDiscussionInputVisible={setIsCreateDiscussionInputVisible}
        discussionToDisplay={discussionToDisplay}
      />
    </div>
  );
}
