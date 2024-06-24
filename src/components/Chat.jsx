import "../style/Chat.css";
import { useEffect, useState } from "react";
import { MessagesBox } from "./MessagesBox.jsx";
import { MessageInput } from "./MessageInput.jsx";
import { CreateDiscussionInput } from "./CreateDiscussionInput";

export function Chat(props) {
  // useEffect(() => {
  //   console.log("discussionToDisplay", props.discussionToDisplay);
  // });

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
        discussionToDisplay={props.discussionToDisplay}
      />
      <MessageInput />
    </div>
  );
}
