import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../data/logo-SimpleChat.png";

// Css import
import "../style/Login.css";

export function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Username or password incorrect");
        }
      })
      .then((user) => {
        console.log("User:", user);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred. Please try again later");
      });
  }

  return (
    <div className="LogIn">
      <div className="LogIn-container">
        <div className="logo-SimpleChat">
          <img src={logo} alt="Logo" />
        </div>
        <h1>SimpleChat</h1>
        <p>
          Rester en contact grâce à <b>SimpleChat</b> !
        </p>

        <form className="form-login" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            placeholder="Nom d'utilisateur"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            placeholder="Mot de passe"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="btn primary-btn">
            Continuer
          </button>
          <p className="underlined-link" onClick={() => navigate("/signin")}>
            Pas de compte ?
          </p>
        </form>
      </div>
    </div>
  );
}
