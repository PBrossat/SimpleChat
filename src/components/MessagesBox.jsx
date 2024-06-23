import "../style/MessagesBox.css";
import { BulleContainer } from "./BulleContainer";
import { Timer } from "./Timer";
import { useEffect, useRef } from "react";
// import { Height } from "@material-ui/icons";

export function MessagesBox(props) {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = containerRef.current.scrollTop;
    };

    containerRef.current.addEventListener("scroll", handleScroll);

    // Set the scroll position to the maximum value
    containerRef.current.scrollTop = containerRef.current.scrollHeight;

    return () => {
      containerRef.current.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
