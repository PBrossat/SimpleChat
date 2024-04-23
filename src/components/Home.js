import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="Home">
      <h1>SimpleChat</h1>
      <p>Rester en contact grâce à SimpleChat!</p>
      <button className="btn btn-primary" onClick={() => navigate("/login")}>
        Créer un compte
      </button>
      <button className="btn btn-primary" onClick={() => navigate("/signin")}>
        Se connecter
      </button>
    </div>
  );
}
