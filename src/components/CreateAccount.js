import { useState } from "react";

export function CreateAccount() {
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
          alert("Account created successfully");
        } else {
          alert("An error occurred");
        }
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred");
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
