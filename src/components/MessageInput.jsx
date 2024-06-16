import React, { useState } from "react";
import "../style/MessageInput.css";
import TextField from "@mui/material/TextField";
import SendIcon from '@mui/icons-material/Send';
import Button from "@mui/material/Button";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function MessageInput(props) {
    const [message, setMessage] = useState("");

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    };

    const sendMessage = (e) => {
        // Logique pour envoyer le message
        console.log("Message envoyé :", message);
        handleSubmit(e);
        setMessage("");
    };


    async function handleSubmit(e) {
        e.preventDefault();
        console.log("in handleSubmit")
    
        const req = await fetch("http://localhost:3001/api/sendMessage", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message }),
        });

        console.log("req : "+req);
    
        if (req.status === 401) {
          toast.error("Erreur d'envoi du message.");
          return;
        }
    
        if (req.status === 500) {
          toast.error(
            "Une erreur s'est produite. \n Veuillez réessayer de vous connecter"
          );
          return;
        }
    
        const data = await req.json().catch((error) => {
          toast.error(
            "Une erreur s'est produite. \n Veuillez réessayer de vous connecter"
          );
          return;
        });
    

    
        // Stock user and tokens in the local storage
        //localStorage.setItem("user", JSON.stringify(data.user));
        //localStorage.setItem("token", data.token);
        // console.log(data.token);
        //localStorage.setItem("refreshToken", data.refreshToken);
      }

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