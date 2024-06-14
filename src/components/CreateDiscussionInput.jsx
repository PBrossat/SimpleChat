import * as React from "react";
import { useEffect, useState } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import LinearProgress from "@mui/material/LinearProgress";
import { verifyToken } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Button from '@mui/material/Button';
import { set } from "rsuite/esm/internals/utils/date";

export function CreateDiscussionInput(props) {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState([currentUser]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nameDiscussion, setNameDiscussion] = useState(null);

  const styleModal = {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
  };
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const req = await fetch(`http://localhost:3001/api/getUsers`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (req.status === 401) {
          verifyToken(toast, navigate);
          fetchUser();
        }

        const data = await req.json();

        // Sort the users by name
        data.sort((a, b) => a.name.localeCompare(b.name));

        setUsers(data);
      } catch (error) {
        toast.error("Nous n'avons pas pu récupérer les utilisateurs");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate, currentUser.id]);

  const handleAutocompleteChange = (event, value) => {
    // Ensure the current user is always included in the selected users
    if (!value.some(user => user.id === currentUser.id)) {
      value.unshift(currentUser); // Add the current user at the beginning of the array
    }
    setSelectedUsers(value);
  };

  const handleClickCreate = () => {
    if (selectedUsers.length === 1 && selectedUsers[0].id === currentUser.id) {
      toast.error("Vous ne pouvez pas créer une discussion avec vous-même");
      return;
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmCreateGroup = async () => {
    console.log(selectedUsers);
    // TODO : Call api to create a discussion


    setIsModalOpen(false);
    setSelectedUsers([currentUser]);
    props.setIsCreateDiscussionInputVisible(false);

  };

  if (loading) {
    return <Skeleton animation="wave" st/>;
  }

  // Format the list of users to display in the modal
  const formatUserList = (users) => {
    if (users.length === 0) return "";
    if (users.length === 1) return users[0];
    return users.slice(0, -1).join(", ") + " et " + users[users.length - 1];
  };

  // Remove the current user from the list of users to display
  const userNamesToDisplay = selectedUsers
    .filter((user) => user.id !== currentUser.id)
    .map((user) => user.name + " " + user.surname);

  if (props.displayCreateDisucssionInput) {
    return (
      <div>
        <Autocomplete
          multiple
          id="tags-standard"
          options={users}
          onChange={handleAutocompleteChange}
          defaultValue={[currentUser]}
          getOptionLabel={(option) => option.id === currentUser.id ? "Vous" : option.name + " " + option.surname}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          value={selectedUsers}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Votre discussion : "
              placeholder="Ajoutez des participants"
            />
          )}
          style={{ width: "99%", margin: "10px" }}
        />
        {selectedUsers.length > 0 && (
          <Button variant="outlined" color="success" style={{marginLeft:"10px"}} onClick={handleClickCreate}>
            Créer discussion
          </Button>
        )}
        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          aria-labelledby="title"
          aria-describedby="description"
        >
          <Box sx={styleModal}>
            <Typography id="title" variant="h6" component="h2">
              Confirmation
            </Typography>
            <Typography id="description" sx={{ mt: 2}}>
            Êtes-vous sûr de vouloir créer une discussion avec : <br />
            <strong>{formatUserList(userNamesToDisplay)}</strong> ?
            </Typography>
            <Box sx={{ mt: 2 }}>
            <Button variant="outlined" color="error" style={{marginRight:"10px"}} onClick={handleCloseModal}>
              Annuler 
            </Button>
            <Button variant="outlined" color="success"  onClick={handleConfirmCreateGroup}>
              Confirmer
            </Button>
            </Box>
          </Box>
        </Modal>
      </div>
    );
  } else {
    return null;
  }
}
