import React, { useState } from "react";
import "../style/MessageInput.css";
import toast from "react-hot-toast";

export function MessageInput(props) {
  const [message, setMessage] = useState("");

  const handleKeyDown = (e) => {
    if (e.code === "Enter") {
      sendMessage(e);
      console.log("Enter key pressed");
    }

    if (e.code === "Enter" && e.shiftKey) {
      setMessage((message) => message + "\n");
    }
  };

  const sendMessage = (e) => {
    console.log("Message envoyé :", message);
    handleSubmit(e);
    setMessage("");
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log("in handleSubmit");

    const req = await fetch("http://localhost:3001/api/sendMessage", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ message }),
    });

    console.log("req : " + req);

    if (req.status === 401) {
      toast.error("Erreur d'envoi du message.");
      return;
    }

    const data = await req.json().catch((error) => {
      toast.error(
        "Une erreur s'est produite. \n Veuillez réessayer de vous connecter"
      );
      return;
    });
  }

  return (
    <form className="message-input" onSubmit={sendMessage}>
      {/* TODO: change to textArea in order to Shift + Enter */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Aa"
        className="message-input-field"
      />
      <button type="submit" className="send-button">
        <svg className="send-button-svg">
          <path d="M16.6915026,12.4744748 L3.50612381,13.2599618 C3.19218622,13.2599618 3.03521743,13.4170592 3.03521743,13.5741566 L1.15159189,20.0151496 C0.8376543,20.8006365 0.99,21.89 1.77946707,22.52 C2.41,22.99 3.50612381,23.1 4.13399899,22.8429026 L21.714504,14.0454487 C22.6563168,13.5741566 23.1272231,12.6315722 22.9702544,11.6889879 C22.8132856,11.0605983 22.3423792,10.4322088 21.714504,10.118014 L4.13399899,1.16346272 C3.34915502,0.9 2.40734225,1.00636533 1.77946707,1.4776575 C0.994623095,2.10604706 0.8376543,3.0486314 1.15159189,3.99121575 L3.03521743,10.4322088 C3.03521743,10.5893061 3.34915502,10.7464035 3.50612381,10.7464035 L16.6915026,11.5318905 C16.6915026,11.5318905 17.1624089,11.5318905 17.1624089,12.0031827 C17.1624089,12.4744748 16.6915026,12.4744748 16.6915026,12.4744748 Z"></path>
        </svg>
      </button>
    </form>
  );
}
