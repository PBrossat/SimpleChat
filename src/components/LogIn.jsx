import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../data/logo-SimpleChat.png";
import toast, { Toaster } from "react-hot-toast";

// Css import
import "../style/Login.css";

export function LogIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (username === "") {
      toast.error("Le nom d'utilisateur est obligatoire");
      return;
    }

    if (password === "") {
      toast.error("Le mot de passe est obligatoire");
      return;
    }

    const req = await fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (req.status === 401) {
      toast.error("Nom d'utilisateur ou mot de passe incorrect.");
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

    if (data.user.name === "" || data.user.surname === "") {
      toast.success(
        "Connexion reussie. \n Bienvenue " + data.user.username + " ! " // The user always has a username
      );
    } else {
      toast.success(
        "Connexion reussie. \n Bienvenue " +
          data.user.name +
          " " +
          data.user.surname +
          " ! "
      );
    }

    // Stock user and tokens in the local storage
    localStorage.setItem("user", JSON.stringify(data.user));
    localStorage.setItem("token", data.token);
    localStorage.setItem("refreshToken", data.refreshToken);

    // 3sec delay before redirecting to the chat page
    setTimeout(() => {
      navigate("/chat");
    }, 2500);
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
      <Toaster />
    </div>
  );
}
