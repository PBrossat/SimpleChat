import "../style/MessagesBox.css";
import { BulleContainer } from "./BulleContainer";
import { Timer } from "./Timer";
import { useState, useEffect, useRef } from "react";
// import { Height } from "@material-ui/icons";

export function MessagesBox(props) {
  const containerRef = useRef(null);
  const [discussionToDisplay, setDiscussionToDisplay] = useState(null);

  useEffect(() => {
    // Set the discussion to display in the MessagesBox
    setDiscussionToDisplay(props.discussionToDisplay);

    console.log("discussionToDisplay", discussionToDisplay);

    // createAllBubbles(discussionToDisplay);

    const handleScroll = () => {
      // eslint-disable-next-line no-unused-vars
      const scrollTop = containerRef.current.scrollTop;
    };

    const container = containerRef.current;

    container.addEventListener("scroll", handleScroll);

    // Set the scroll position to the maximum value
    container.scrollTop = container.scrollHeight;

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [discussionToDisplay, props.discussionToDisplay]);

  // TODO: Create all bubbles from the discussion with api call
  // const createAllBubbles = (discussionToDisplay) => {
  //   const idDiscussion = discussionToDisplay.id;

  //   // Get all messages from the discussion
  // };

  const isInputCreateDiscussionVisible = props.isCreateDiscussionInputVisible;

  return (
    <div
      className="MessagesBox"
      ref={containerRef}
      style={{ height: isInputCreateDiscussionVisible ? "75vh" : "90vh" }}
    >
      <Timer day="MER" hour="17h05" />
      <BulleContainer text="ceci est un message de test" align="left" />
      <BulleContainer text="Je suis une réponse" align="right" />
      <BulleContainer
        text="ceci est un message de test et je vais essater de faire un text un peu trop long pour voir si le max with fonctionne"
        align="left"
      />

      <BulleContainer text="Je suis une réponse" align="right" />
      <Timer day="JEU" hour="10h35" />
      <BulleContainer text="Bonjour mon quoicoubébou" align="left" />
      <BulleContainer text="Ola ma quoicoubébette" align="right" />
      <Timer day="MER" hour="17h35" />
      <BulleContainer text="ceci est un message de test" align="left" />
      <BulleContainer text="Je suis une réponse" align="right" />
      <BulleContainer
        text="ceci est un message de test et je vais essater de faire un text un peu trop long pour voir si le max with fonctionne"
        align="left"
      />

      <BulleContainer text="Je suis une réponse" align="right" />
      <Timer day="JEU" hour="10h35" />
      <BulleContainer text="Bonjour mon quoicoubébou" align="left" />
      <BulleContainer text="Ola ma quoicoubébette" align="right" />
      <Timer day="MER" hour="17h35" />
      <BulleContainer text="ceci est un message de test" align="left" />
      <BulleContainer text="Je suis une réponse" align="right" />
      <BulleContainer text="Je suis une réponse" align="right" />
      <BulleContainer text="Je suis une réponse" align="right" />
      <BulleContainer text="Je suis une réponse" align="right" />
      <BulleContainer text="Je suis une réponse" align="right" />
      <BulleContainer
        text="ceci est un message de test et je vais essater de faire un text un peu trop long pour voir si le max with fonctionne"
        align="left"
      />

      <BulleContainer text="Je suis une réponse" align="right" />
      <Timer day="JEU" hour="10h35" />
      <BulleContainer text="Bonjour mon quoicoubébou" align="left" />
      <BulleContainer text="Ola ma quoicoubébette" align="right" />
      <Timer day="MER" hour="17h35" />
      <BulleContainer text="ceci est un message de test" align="left" />
      <BulleContainer text="Je suis une réponse" align="right" />
      <BulleContainer
        text="ceci est un message de test et je vais essater de faire un text un peu trop long pour voir si le max with fonctionne"
        align="left"
      />

      <BulleContainer text="Je suis une réponse" align="right" />
      <Timer day="JEU" hour="10h35" />
      <BulleContainer text="Bonjour mon quoicoubébou" align="left" />
      <BulleContainer
        text="Ola ma quoicoubébette \n je m'appel pierrick et toi ?? \n jdipezjdopezj"
        align="right"
      />
    </div>
  );
}
