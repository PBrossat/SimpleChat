import * as React from "react";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useAutocomplete } from "@mui/base/useAutocomplete";
import { X } from "lucide-react";
import { Check } from "lucide-react";
import LinearProgress from "@mui/material/LinearProgress";
import { verifyToken } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {
  Root,
  InputWrapper,
  StyledTag,
  Listbox,
} from "../style/CreateDiscussionInput.styles";

export function Tag(props) {
  const { label, onDelete, ...other } = props;
  return (
    <div {...other}>
      <span>{label}</span>
      <X onClick={onDelete} />
    </div>
  );
}

Tag.propTypes = {
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export function CreateDiscussionInput() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

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
        setUsers(data);
      } catch (error) {
        toast.error("Nous n'avons pas pu récupérer les utilisateurs");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const currentUser = JSON.parse(localStorage.getItem("user"));
  const defaultValue = currentUser ? [currentUser] : []; // the default value is the current user

  const {
    getRootProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: "customized-hook-demo",
    multiple: true,
    options: users,
    defaultValue: defaultValue,
    getOptionLabel: (user) => user.name + " " + user.surname, // we can find by title and year
  });

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Root>
      <div {...getRootProps()}>
        <InputWrapper ref={setAnchorEl} className={focused ? "focused" : ""}>
          {value.map((user, index) => (
            <StyledTag
              label={user.name + " " + user.surname} // the tag contain the name and the surname of the user
              {...getTagProps({ index })}
            />
          ))}
          <input {...getInputProps()} />
        </InputWrapper>
      </div>
      {groupedOptions.length > 0 ? (
        <Listbox {...getListboxProps()}>
          {groupedOptions.map((option, index) => (
            <li {...getOptionProps({ option, index })}>
              <span>{option.name + " " + option.surname}</span>
              <Check />
            </li>
          ))}
        </Listbox>
      ) : null}
    </Root>
  );
}
