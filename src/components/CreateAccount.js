import { useState } from "react";

export function SignIn() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    //Verification username
    if (name === "") {
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

    const user = { name, email, password };

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

          // add button to go to the login page
          const button = document.createElement("button");
          button.textContent = "Login";
          button.onclick = () => {
            window.location.href = "/login";
          };
          document.body.appendChild(button);

          // Clear the form
          setName("");
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
    <div>
      <h1>Création de compte</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}
