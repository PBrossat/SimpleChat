import { CreateDiscussionInput } from "./CreateDiscussionInput";
import "../style/Chat.css";

export function Chat(props) {
  return (
    <div className="Chat-div">
      <CreateDiscussionInput 
        displayCreateDisucssionInput={props.displayCreateDisucssionInput}
        setIsCreateDiscussionInputVisible={props.setIsCreateDiscussionInputVisible}
      />
    </div>
  );
}
