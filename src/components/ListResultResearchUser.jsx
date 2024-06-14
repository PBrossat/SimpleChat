import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useState } from "react";

export function ListResultResearchUser(props) {
  console.log(props.listOfUsersAfterResearch);
  const listToDisplay = props.listOfUsersAfterResearch;
  const [currentUser] = useState(JSON.parse(localStorage.getItem("user")));

  function displayListResult() {
    const style = {
      width: "100%",
      borderColor: "divider",
      backgroundColor: "background.paper",
      overflow: "auto",
      maxHeight: "90%",
    };

    return (
      <List sx={style} subheader={<li />}>
        {listToDisplay.length === 0 ? (
          <ListItem>
            <ListItemText primary="Aucun utilisateur trouvé" />
          </ListItem>
        ) : (
          // Display the list of users with their name and surname
          listToDisplay.map((user) => (
            <ListItem key={user.id} button onClick={() => console.log(user)}>
              <ListItemText
                primary={
                  <strong>
                    {/* If I'm the user, display "vous" */}
                    {user.username === currentUser.username
                      ? "Vous"
                      : user.username}
                  </strong>
                }
                secondary={user.name + " " + user.surname}
              />
            </ListItem>
          ))
        )}
      </List>
    );
  }

  return <div className="liste-disccusion">{displayListResult()}</div>;
}
