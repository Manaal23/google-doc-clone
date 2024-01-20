import React, { useState } from "react";
import homeStyle from "../pages/Home/Home.module.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function Nav({ title,setTitle, handleTitleChange, handleBlur, showShare, showSearch, showSaving }) {
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
  };

  return (
    <div className={homeStyle.nav}>
      <div className={homeStyle.left}>
        <div className={homeStyle.navimg}>
          <img src="https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png"></img>
        </div>
        <input
          disabled={history.location.pathname.includes("home") ? true : false}
          className={homeStyle.navtext}
          value={history.location.pathname.includes("home") ? 'Document' : title}
          onChange={handleTitleChange}
          onBlur={handleBlur}
        />
        {
          showSaving ? 
          <div className={homeStyle.sync}>
          <i className="fa-solid fa-rotate"></i>
          <span>Saving...</span>
          </div>
          :
          showShare && <div className={`${homeStyle.cloudDiv} ${homeStyle.tooltip}`}>
            <span className={homeStyle.tooltiptext}>Synced on cloud</span>
            <span>
              <i className="fa-solid fa-cloud"></i>
              <span className={homeStyle.faCheck}>
              <i className="fa-solid fa-check"></i>
              </span>
            </span>
          </div>
          
        }
      </div>
      {
        showSearch && 
      <div className={homeStyle.mid}></div>
      }
      <div className={homeStyle.right}>
      {showShare && <div className={homeStyle.shareDocDiv}>
          <div className={homeStyle.shareDoc}>
            <div className={homeStyle.shareDocImg}>
              
          <i class="fa-solid fa-lock"></i>
            </div>
          <span>Share</span>
          </div>
        </div>}
        <div className={homeStyle.logout} onClick={handleLogout}>
          <button>Logout</button>
        </div>
        <div className={homeStyle.profileImg}>
          <img
            src={
              localStorage.getItem("userData") &&
              JSON.parse(localStorage.getItem("userData"))?.image
            }
            alt="user profile"
          ></img>
        </div>
      </div>
    </div>
  );
}

export default Nav;
