import React, { useState } from "react";
import "../style/ResearchUser.css";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { verifyToken } from "../utils/utils";

export function ResearchUser() {
  const [searchTimeout, setSearchTimeout] = useState(null);

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
      <svg className="icon" aria-hidden="true" viewBox="0 0 24 24">
        <g>
          <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
        </g>
      </svg>
      <input
        type="search"
        className="user-research"
        placeholder="Rechercher un utilisateur..."
        onChange={handleChange}
      />
      <Toaster />
    </div>
  );
}
