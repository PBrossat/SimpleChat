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
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Divider } from "@mui/material";
import { Users, User } from "lucide-react";

export function ListDiscussion() {
  const [discussions, setDiscussions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const currentUser = JSON.parse(localStorage.getItem("user"));

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

        // Set the discussions in the state
        setDiscussions(ListDiscussions);
      } catch (error) {
        toast.error(
          "Une erreur s'est produite lors de la récupération de vos discussions."
        );
      }
    }

    fetchData();

    const setTimeOut = setTimeout(() => {
      setIsLoading(false);
    }, 500); // Set the loading state to false after 0.5 second

    return () => {
      // Clear the timeout when the component is unmounted
      clearTimeout(setTimeOut);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigate]);

  function displayListDiscussion() {
    const currentUserId = JSON.parse(localStorage.getItem("user")).id;

    const style = {
      width: "95%",
      borderColor: "divider",
      backgroundColor: "background.paper",
      overflow: "auto",
      maxHeight: "90%",
    };

    // Format the secondary text for a group discussion (display the two first participants and add "..." if there are more than 2 participants)
    const formatGroupeSecondaryText = (participants) => {
      // Remove the current user from the list of participants
      const participantsWithoutCurrentUser = participants.filter(
        (participant) => participant.id !== currentUser.id
      );

      let formattedParticipants = participantsWithoutCurrentUser
        .slice(0, 2) // Get the two first participants
        .map((participant) => `${participant.name} ${participant.surname}`)
        .join(", ");

      if (participantsWithoutCurrentUser.length > 2) {
        formattedParticipants += ", ...";
      }

      return formattedParticipants;
    }

    return (
      <List sx={style} subheader={<li />}>
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
              <ListItemAvatar>
                <Avatar
                  sx={{
                    width: "35px",
                    height: "35px",
                    backgroundColor: "primary.main",
                  }}
                >
                  {discussion.type === 1 ? <Users /> : <User />}
                </Avatar>
              </ListItemAvatar>
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
                    ? formatGroupeSecondaryText(discussion.participants)
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
      <Divider />
      <Box>{isLoading ? <CircularProgress /> : displayListDiscussion()}</Box>
      <Toaster />
    </div>
  );
}
