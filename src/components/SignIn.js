import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../data/logo-SimpleChat.png";
import "../style/Sigin.css";

export function SignIn() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    //Verification username
    if (username === "") {
      alert("Username is required");
      return;
    }

    // Verification of the password
    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      alert("Password must contain at least one uppercase letter");
      return;
    }
    if (!/[a-z]/.test(password)) {
      alert("Password must contain at least one lowercase letter");
      return;
    }
    if (!/[0-9]/.test(password)) {
      alert("Password must contain at least one number");
      return;
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      alert("Password must contain at least one special character");
      return;
    }

    // password confirmation verification
    if (password !== passwordConfirmation) {
      alert("Passwords do not match");
      return;
    }

    const user = { name, surname, username, email, password };

    fetch("http://localhost:3001/api/create-account", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (response.status === 200) {
          alert("Votre compte a été créé avec succès");

          // Add <p> element to the DOM to display the message
          const p = document.createElement("p");
          p.textContent = "Account created successfully";
          document.body.appendChild(p);
          setTimeout(() => {
            p.remove();
          }, 5000);

          // Clear the form
          setUsername("");
          setEmail("");
          setPassword("");
        } else {
          alert(
            "Votre compte n'a pas pu être créé, essayez avec une autre nom d'utilisateur ou un autre email"
          );
        }
      })
      .catch((error) => {
        console.error(error);
        alert(
          "Une erreur s'est produite lors de la création de votre compte, veuillez réessayer plus tard"
        );
      });
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
            value={name}
            onChange={(e) => setSurname(e.target.value)}
          />

          <input
            type="text"
            className="form-control"
            placeholder="Nom d'utilisateur"
            value={name}
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
    </div>
  );
}
