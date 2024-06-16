import "../style/Chat.css";
import { useState } from "react";
import { MessagesBox } from "./MessagesBox.jsx";
import { MessageInput } from "./MessageInput.jsx";
import { CreateDiscussionInput } from "./CreateDiscussionInput";

export function Chat() {
  const [isCreateDiscussionInputVisible, setIsCreateDiscussionInputVisible] =
    useState(false);

  return (
    <div className="Chat-div">
      <CreateDiscussionInput />
      <MessagesBox
        displayCreateDisucssionInput={isCreateDiscussionInputVisible}
        setIsCreateDiscussionInputVisible={setIsCreateDiscussionInputVisible}
      />
      <MessageInput />
    </div>
  );
}
