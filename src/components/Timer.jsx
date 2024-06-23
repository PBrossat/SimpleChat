import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import "../style/Timer.css";

export function Timer(props) {
  const [day] = useState(props.day);
  const [hour] = useState(props.hour);

  return (
    <span className="Timer">
      {day} {hour}
    </span>
  );
}
