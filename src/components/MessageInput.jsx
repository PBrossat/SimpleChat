import React, { useState } from "react";
import "../style/MessageInput.css";
import TextField from "@mui/material/TextField";
import SendIcon from '@mui/icons-material/Send';
import Button from "@mui/material/Button";

export function MessageInput(props) {
    const [message, setMessage] = useState("");

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    };

    const sendMessage = () => {
        // Logique pour envoyer le message
        console.log("Message envoyé :", message);
        setMessage("");
    };

    return (
        <div className="MessageInput">
            <TextField
                className="inputMes"
                id="outlined-basic"
                label="Message"
                variant="outlined"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                onKeyPress={handleKeyPress}
            />
            <Button
                className="sendButton"
                variant="contained"
                endIcon={<SendIcon />}
                onClick={sendMessage}
            >
                Send
            </Button>
        </div>
    );
}