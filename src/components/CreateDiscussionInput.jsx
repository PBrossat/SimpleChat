import * as React from "react";
import { useEffect, useState } from "react";
import Autocomplete from '@mui/material/Autocomplete';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import LinearProgress from "@mui/material/LinearProgress";
import { verifyToken } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Button from '@mui/material/Button';

export function CreateDiscussionInput() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user"));


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
        console.log(data);
        // Sort the users by name
        data.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
        setUsers(data);
      } catch (error) {
        toast.error("Nous n'avons pas pu récupérer les utilisateurs");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleAutocompleteChange = (event, value) => {
    setSelectedUsers(value);
  };

  const handleClickCreate = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmCreateGroup = async () => {
    // If the current user is not in the selected users, add it
    if (!selectedUsers.includes(currentUser)) {
      selectedUsers.push(currentUser);
    }
    console.log(selectedUsers);
  };

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <div>
      <Autocomplete
        multiple
        id="tags-standard"
        options={users}
        onChange={handleAutocompleteChange}
        defaultValue={currentUser}
        getOptionLabel={(option) => option.name + " " + option.surname}
        value={selectedUsers} 
        renderInput={(params) => (
          <TextField
            {...params}
            label="Votre groupe : "
            placeholder="Ajoutez des utilisateurs"
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
            Êtes-vous sûr de vouloir créer un groupe avec les utilisateurs suivants : vous, 
            {selectedUsers.map((user) => user.name + " " + user.surname).join(", ")} ?
          </Typography>
          <Button variant="outlined" color="error" style={{marginRight:"10px"}} onClick={handleCloseModal}>
            Annuler 
          </Button>
          <Button variant="outlined" color="success"  onClick={handleConfirmCreateGroup}>
            Confirmer
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
