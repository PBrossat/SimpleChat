import { useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import "../style/Deconnexion.css";

export function Deconnexion() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/login");
  }

  return (
    <div className="deconnexion-div">
      <Tooltip title="Déconnexion">
        <button className="button-deconnexion" onClick={handleClick}>
          <svg viewBox="6 6 24 24" width="30px" height="30px">
            <path d="M21.498 14.75a1 1 0 0 0 1-1V12a4 4 0 0 0-4-4h-6.5a4 4 0 0 0-4 4v12a4 4 0 0 0 4 4h6.5a4 4 0 0 0 4-4v-1.75a1 1 0 0 0-1-1h-.5a1 1 0 0 0-1 1V24a1.5 1.5 0 0 1-1.5 1.5h-6.5a1.5 1.5 0 0 1-1.5-1.5V12a1.5 1.5 0 0 1 1.5-1.5h6.5a1.5 1.5 0 0 1 1.5 1.5v1.75a1 1 0 0 0 1 1h.5z"></path>
            <path d="M14.498 16.75h9.752a.25.25 0 0 0 .25-.25v-1.858a1 1 0 0 1 1.643-.766l4.002 3.356a1 1 0 0 1 0 1.532l-4.002 3.357a1 1 0 0 1-1.643-.767V19.5a.25.25 0 0 0-.25-.25h-9.752a1 1 0 0 1-1-1v-.5a1 1 0 0 1 1-1z"></path>
          </svg>
        </button>
      </Tooltip>
    </div>
  );
}
