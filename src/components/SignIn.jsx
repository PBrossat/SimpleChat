import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../data/logo-SimpleChat.png";
import "../style/Sigin.css";
import toast, { Toaster } from "react-hot-toast";

export function SignIn() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    // Verification of the name
    if (name === "") {
      toast.error("Le prénom est obligatoire");
      return;
    }

    // Verification of the surname
    if (surname === "") {
      toast.error("Le nom est obligatoire");
      return;
    }

    //Verification username
    if (username === "") {
      toast.error("Le nom d'utilisateur est obligatoire");
      return;
    }

    // Verification of the email
    if (email === "") {
      toast.error("L'email est obligatoire");
      return;
    }

    // Verification of the password
    if (password === "") {
      toast.error("Le mot de passe est obligatoire");
      return;
    }

    // Verification of the password confirmation
    if (passwordConfirmation === "") {
      toast.error("La confirmation du mot de passe est obligatoire");
      return;
    }

    // Verification of the password
    if (password.length < 8) {
      toast.error("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error(
        "Le mot de passe doit contenir au moins une lettre majuscule"
      );
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error(
        "Le mot de passe doit contenir au moins une lettre minuscule"
      );
      return;
    }
    if (!/[0-9]/.test(password)) {
      toast.error("Le mot de passe doit contenir au moins un chiffre");
      return;
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      toast.error(
        "Le mot de passe doit contenir au moins un caractère spécial"
      );
      return;
    }

    // password confirmation verification
    if (password !== passwordConfirmation) {
      toast.error("Les deux mots de passe ne correspondent pas");
      return;
    }

    const user = { name, surname, username, email, password };

    const req = await fetch("http://localhost:3001/api/create-account", {
      method: "POST", // POST request to create a new account
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (req.status === 500) {
      toast.error(
        "Une erreur s'est produite lors de la création de votre compte. \n Veuillez réessayer plus tard"
      );
      return;
    }

    if (req.status === 400) {
      toast.error("L'email que vous avez entré existe déjà.");
      return;
    }

    if (req.status === 401) {
      toast.error("Le nom d'utilisateur que vous avez entré existe déjà.");
      return;
    }

    toast.success("Compte créé avec succès");
    setName("");
    setSurname("");
    setUsername("");
    setEmail("");
    setPassword("");
    setPasswordConfirmation("");

    setTimeout(() => {
      navigate("/login");
    }, 2000);
  }

  return (
    <div className="Signin">
      <div className="Signin-container">
        <div className="logo-SimpleChat">
          <img src={logo} alt="Logo" />
        </div>
        <h1>SimpleChat</h1>
        <p>
          Créez-vous un compte <b>maintenant</b> !{" "}
        </p>
        <form className="form-signin" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            placeholder="Prénom"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            className="form-control"
            placeholder="Nom"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />

          <input
            type="text"
            className="form-control"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            className="form-control"
            placeholder="Confirmer le mot de passe"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />

          <button className="btn primary-btn" type="submit">
            Créer le compte{" "}
          </button>
        </form>
        <div className="link-container">
          <p
            className="underlined-link p-left"
            onClick={() => navigate("/login")}
          >
            Vous avez déjà un compte ?
          </p>
          <p className="underlined-link p-write" onClick={() => navigate("/")}>
            Retour à l'accueil
          </p>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
