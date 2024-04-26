import { ResearchUser } from "./ResearchUser";
import { CreateDiscussion } from "./CreateDiscussion";
import { ListDiscussion } from "./ListDiscussion";
import "../style/Discussions.css";

export function Discussions() {
  return (
    <div className="discussions-div">
      <div className="title-and-button-div">
        <h1 className="title-discussions">Discussions</h1>
        {/* Bouton pour créer une conversation de groupe */}
        <CreateDiscussion />
      </div>
      {/* input permettant de rechercher un user a qui on a parler ou non, les premiers résultats sont les personnes avec qui on a déjà discutter
        puis on retrouve les utilisateurs avec qui on a pas encore parler*/}
      <ResearchUser />
      {/* Liste des discussions */}
      <ListDiscussion />
    </div>
  );
}
