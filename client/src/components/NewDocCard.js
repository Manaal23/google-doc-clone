import React from "react";
import homeStyle from "../pages/Home/Home.module.css";
import { v4 as uuidV4 } from "uuid"
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function NewDocCard() {
    const history = useHistory();

    const handleClick = () =>{
        // return <Redirect to={`/documents/${uuidV4()}`}/>
        history.push(`/documents/${uuidV4()}`)
    }
  return (
    <div className={homeStyle.docCard} onClick={handleClick}>
      <div className={homeStyle.docCardImg}>
        <img src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png"></img>
      </div>
      <div className={homeStyle.docTitle}>
        <p>Blank Document</p>
      </div>
    </div>
  );
}

export default NewDocCard;
