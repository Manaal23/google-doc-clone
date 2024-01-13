import React from "react";
import homeStyle from "../pages/Home/Home.module.css";
import { useHistory } from "react-router-dom";

function RecentDocCard({ docId, docIds, setDocIds }) {

  const history = useHistory()

  const handleClick = () =>{
    history.push(`/documents/${docId}`)
  }

  const handleDelete = () =>{    
    const filterData = docIds.filter(i => i._id !== docId)
    setDocIds(filterData)
  }
  return (
    <div className={homeStyle.docNewCard}>
      <div className={homeStyle.docCardRecentImg} onClick={handleClick}>
        <img src="https://lh3.google.com/u/0/d/1rZaRiO-hNay-NTikdkvgEPUuD_XFcz9yz_RdEDb1zf8=w416-iv6"></img>
      </div>
      <div className={homeStyle.cardDetailBody}>
        <div className={homeStyle.docTitle}>
          <p>Blank Document</p>
        </div>
        <div className={homeStyle.cardDetail}>
          <div className={homeStyle.cardDetailImg}>
            <i class="fa-solid fa-file-invoice"></i>
            <i className="fa-solid fa-user-group"></i>
          </div>
          <div className={homeStyle.openedDoc}>
            <p>Opened 12:26 PM</p>
          </div>
          <div className={homeStyle.cardDetailMoreOptions} onClick={handleDelete}>
            <i class="fa-solid fa-ellipsis-vertical" ></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentDocCard;
