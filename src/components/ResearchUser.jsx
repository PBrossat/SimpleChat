import React, { useState, useEffect } from "react";

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
    <input
      type="search"
      className="user-research"
      value={usernameToSearch}
      placeholder="Nom d'utilisateur"
      onChange={handleChange}
    />
  );
}
