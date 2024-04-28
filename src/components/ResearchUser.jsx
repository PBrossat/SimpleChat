import React, { useState } from "react";
import "../style/ResearchUser.css";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { verifyToken } from "../utils/utils";
import { BackButtonResearch } from "./BackButtonResearch";
import { InputResearchUser } from "./InputResearchUser";

export function ResearchUser() {
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [isMouseIn, setIsMouseIn] = useState(false);

  const navigate = useNavigate();

  function handleChange(e) {
    // Update the state with the new value of the input
    const value = e.target.value;

    // If there is already a search timeout, we clear it
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    // If the input is empty, we don't need to search for a user
    if (value.trim() === "") {
      return;
    }

    // We create a new search timeout
    setSearchTimeout(
      setTimeout(() => {
        fetchUser(value);
        console.log(value);
      }, 300)
    );
  }

  function changeStyleOfInput() {
    setIsMouseIn(true);
  }

  function restoreDefaultStyle() {
    setIsMouseIn(false);
  }

  async function fetchUser(usernameToSearch) {
    const req = await fetch(
      `http://localhost:3001/api/researchUser/${usernameToSearch}`,
      {
        method: "GET",
        headers: {
          // In order to access the protected route, we need to send the token
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    // If the token is invalid
    if (req.status === 401) {
      verifyToken(toast, navigate);
      fetchUser(usernameToSearch);
    }

    if (req.status === 200) {
      // If the request is successful, we can get the user data
      const users = await req.json();
      console.log(users);
    }
  }

  return (
    <div className="researchUser-container">
      {isMouseIn ? <BackButtonResearch {...{ restoreDefaultStyle }} /> : null}
      <InputResearchUser {...{ isMouseIn, handleChange, changeStyleOfInput }} />
      <Toaster />
    </div>
  );
}
