import "../style/Chat.css";
import { useState } from "react";
import { MessagesBox } from "./MessagesBox.jsx";
import { MessageInput } from "./MessageInput.jsx";
import { CreateDiscussionInput } from "./CreateDiscussionInput";

export function Chat(props) {
  console.log(props.isCreateDiscussionInputVisible);
  return (
    <div className="Chat-div">
      <CreateDiscussionInput
        displayCreateDisucssionInput={props.isCreateDiscussionInputVisible}
        setIsCreateDiscussionInputVisible={
          props.setIsCreateDiscussionInputVisible
        }
      />
      <MessagesBox
        isCreateDiscussionInputVisible={props.isCreateDiscussionInputVisible}
      />
      <MessageInput />
    </div>
  );
}
