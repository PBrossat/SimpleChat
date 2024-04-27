import { Deconnexion } from "./Deconnexion";

export function BottomPartDiscussion() {
  const currentUser = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="bottom-part-discussion">
      <div className="name-and-surname-bottom-page">
        <p className="name-part-discussion">{currentUser.name}</p>
        <p className="surname-part-discussion">{currentUser.surname}</p>
      </div>
      <Deconnexion />
    </div>
  );
}
