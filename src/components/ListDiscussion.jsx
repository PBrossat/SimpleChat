import "../style/ListDiscussion.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import toast, { Toaster } from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import { verifyToken } from "../utils/utils";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export function ListDiscussion() {
  const [discussions, setDiscussions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  async function fetchDiscussions() {
    const req = await fetch(`http://localhost:3001/api/getActiveDiscussions`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    // If the token is invalid
    if (req.status === 401) {
      verifyToken(toast, navigate);
      fetchDiscussions();
    }

    if (req.status === 200) {
      // If the request is successful, we can get the discussions
      const ListDiscussions = await req.json();
      return ListDiscussions;
    }
  }

  async function fetchParticipants(conversationId) {
    const req = await fetch(
      `http://localhost:3001/api/getParticipants/${conversationId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    // If the token is invalid
    if (req.status === 401) {
      verifyToken(toast, navigate);
      fetchParticipants(conversationId);
    }

    if (req.status === 200) {
      const participants = await req.json();
      return participants;
    }
  }

  // call the fetchDiscussions function when the component is mounted
  useEffect(() => {
    async function fetchData() {
      try {
        const ListDiscussions = await fetchDiscussions();

        // if there are discussions
        if (ListDiscussions.length > 0) {
          // For each discussion, we fetch the participants
          const participantPromises = ListDiscussions.map((discussion) =>
            fetchParticipants(discussion.id)
          );

          // Wait for all the participants to be fetched
          const participantsLists = await Promise.all(participantPromises);

          // Add the participants to the discussions
          ListDiscussions.forEach((discussion, index) => {
            discussion.participants = participantsLists[index];
          });
        }

        setDiscussions(ListDiscussions);
      } catch (error) {
        toast.error(
          "Une erreur s'est produite lors de la récupération de vos discussions."
        );
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 500); // Set the loading state to false after 0.5 second
      }
    }

    fetchData();
  }, []);

  function displayListDiscussion() {
    const currentUserId = JSON.parse(localStorage.getItem("user")).id;

    const style = {
      p: 0,
      width: "100%",
      maxWidth: 360,
      borderRadius: 2,
      border: "1px solid",
      borderColor: "divider",
      backgroundColor: "background.paper",
    };

    return (
      <List sx={style}>
        {discussions.length === 0 ? (
          <ListItem>
            <ListItemText primary="Aucune discussion" />
          </ListItem>
        ) : (
          discussions.map((discussion) => (
            <ListItem
              key={discussion.id}
              button
              onClick={() => console.log("clicked")}
            >
              <ListItemText
                primary={
                  <strong>
                    {discussion.type === 1
                      ? discussion.name
                      : discussion.participants.find(
                          (participant) => participant.id !== currentUserId
                        ).name}
                  </strong>
                }
                secondary={
                  discussion.type === 1
                    ? "Groupe"
                    : discussion.participants.find(
                        (participant) => participant.id !== currentUserId
                      ).surname
                }
              />
            </ListItem>
          ))
        )}
      </List>
    );
  }

  return (
    <div className="liste-disccusion">
      <h1 className="title-liste-discussion">Liste de vos discussions</h1>
      <Box>{isLoading ? <CircularProgress /> : displayListDiscussion()}</Box>
      <Toaster />
    </div>
  );
}
