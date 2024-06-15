import React, { useState } from 'react';
//import { useNavigate } from "react-router-dom";
import "../style/Timer.css";


export function Timer({dateParam}) {
    
    const [date, setDate] = useState(dateParam);

    const handleMessage = () => {
        setDate(date);
    };
    
    

  return (
    <div className="Timer">
            {date}
    </div>
    
  );
}
