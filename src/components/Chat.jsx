import { CreateDiscussionInput } from "./CreateDiscussionInput";
import "../style/Chat.css";

export function Chat(props) {
  return (
    <div className="Chat-div">
      <CreateDiscussionInput />
    </div>
  );
}
