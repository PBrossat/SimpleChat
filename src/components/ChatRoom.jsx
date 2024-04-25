import React, { useEffect } from "react";
import { ResearchUser } from "./ResearchUser";
import { useLocation, useNavigate } from "react-router-dom";

export function ChatRoom() {
  // const location = useLocation();
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     event.preventDefault();
  //     event.returnValue = ""; // Requise pour Chrome
  //     const confirmationMessage = "Êtes-vous sûr de vouloir vous déconnecter ?";
  //     // Affiche une boîte de dialogue pour confirmer la déconnexion
  //     event.returnValue = confirmationMessage;
  //     return confirmationMessage;
  //   };

  //   window.addEventListener("beforeunload", handleBeforeUnload);

  //   return () => {
  //     window.removeEventListener("beforeunload", handleBeforeUnload);
  //   };
  // }, [location.pathname, navigate]);

  return (
    <div>
      <ResearchUser />
    </div>
  );
}
