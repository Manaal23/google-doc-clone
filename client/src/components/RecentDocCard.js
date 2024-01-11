import React from "react";
import homeStyle from "../pages/Home/Home.module.css";

function RecentDocCard() {
  return (
    <div className={homeStyle.docNewCard}>
      <div className={homeStyle.docCardRecentImg}>
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
          <div className={homeStyle.cardDetailMoreOptions}>
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentDocCard;
