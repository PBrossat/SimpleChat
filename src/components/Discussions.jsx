import React, { useState } from "react";
import { ResearchUser } from "./ResearchUser";
import { CreateDiscussion } from "./CreateDiscussion";
import { ListDiscussion } from "./ListDiscussion";
import "../style/Discussions.css";
import Divider from "@mui/material/Divider";
import { BottomPartDiscussion } from "./BottomPartDiscussion";
import { ListResultResearchUser } from "./ListResultResearchUser";

export function Discussions(props) {
  const [isListVisible, setIsListVisible] = useState(true);
  const [listOfUsersAfterResearch, setListOfUsersAfterResearch] = useState([]);

  // This function is used to set the visibility of the list of discussions
  // when the user is searching for a user : the list of discussions is hidden else it is visible
  function setVisibilityOfList(data_from_input_research_user) {
    setIsListVisible(data_from_input_research_user);
  }

  function setResearchResults(data_from_input_research_user) {
    setListOfUsersAfterResearch(data_from_input_research_user);
  }

  function setInputCreateDiscussionVisible(data_from_button_create_discussion) {
    props.setIsCreateDiscussionInputVisible(data_from_button_create_discussion);
  }

  return (
    <div className="discussions-div">
      <div className="title-and-button-div">
        <h1 className="title-discussions">Discussions</h1>
        {/* Bouton pour créer une conversation de groupe */}
        <CreateDiscussion
          setIsInputCreateDiscussionVisible={setInputCreateDiscussionVisible}
          isCreateDiscussionInputVisible={props.isCreateDiscussionInputVisible}
        />
      </div>
      {/* input permettant de rechercher un user a qui on a parler ou non, les premiers résultats sont les personnes avec qui on a déjà discutter
        puis on retrouve les utilisateurs avec qui on a pas encore parler*/}
      <ResearchUser
        setVisibilityOfDisucssionList={setVisibilityOfList}
        setResearchResultsList={setResearchResults}
      />
      {/* Liste des discussions */}
      {isListVisible && <ListDiscussion />}
      {!isListVisible && (
        <ListResultResearchUser
          listOfUsersAfterResearch={listOfUsersAfterResearch}
        />
      )}
      <Divider flexItem />
      <BottomPartDiscussion />
    </div>
  );
}
