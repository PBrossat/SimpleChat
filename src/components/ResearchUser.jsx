import React, { useState, useEffect } from "react";
import "../style/ResearchUser.css";

export function ResearchUser() {
  const [usernameToSearch, setUsernameToSearch] = useState("");

  function handleChange(e) {
    // Update the state with the new value of the input
    setUsernameToSearch(e.target.value);
  }

  useEffect(() => {
    // This effect will run every time usernameToSearch changes
    if (usernameToSearch !== "") {
      // If the input is not empty, fetch the user (otherwise, if we call the API with an empty string, it will return all users)
      fetchUser();
    }
  });

  function fetchUser() {
    fetch(`http://localhost:3001/api/researchUser?username=${usernameToSearch}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network response was not ok");
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
      });
  }

  return (
    <div className="researchUser-container">
      <svg class="icon" aria-hidden="true" viewBox="0 0 24 24">
        <g>
          <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
        </g>
      </svg>
      <input
        type="search"
        className="user-research"
        value={usernameToSearch}
        placeholder="Rechercher un utilisateur..."
        onChange={handleChange}
      />
    </div>
  );
}
