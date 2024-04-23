import { useNavigate } from "react-router-dom";
import "../style/Home.css";
import logo from "../data/logo-SimpleChat.png";

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="Home">
      <div className="Home-container">
        <div className="logo-SimpleChat">
          <img src={logo} alt="Logo" />
        </div>
        <h1>SimpleChat</h1>
        <p>
          Rester en contact grâce à <b>SimpleChat</b> !
        </p>
        <button className="btn primary-btn" onClick={() => navigate("/login")}>
          Se connecter
        </button>
        <p className="create-account-link" onClick={() => navigate("/signin")}>
          Créer un compte ?
        </p>
      </div>
    </div>
  );
}
