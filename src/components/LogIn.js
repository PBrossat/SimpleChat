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

  function handleSubmit(e) {
    e.preventDefault();

    if (username === "") {
      toast.error("Le nom d'utilisateur est obligatoire");
      return;
    }

    if (password === "") {
      toast.error("Le mot de passe est obligatoire");
      return;
    }

    fetch("http://localhost:3001/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 401) {
          return;
        } else {
          throw new Error("An error occurred. Please try again later");
        }
      })
      .then((data) => {
        // if the user exists and the password is correct

        // if the user don't have a name or surname in the database
        if (data.name === "" || data.surname === "") {
          toast.success("Connexion réussie.");
        } else
          toast.success(
            "Connexion réussie. \n Bienvenue " + data.name + " " + data.surname
          );
      })
      .catch((error) => {
        toast.error(
          "Une erreur s'est produite. \n Veuillez réessayer de vous connecter"
        );
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
      <Toaster />
    </div>
  );
}
