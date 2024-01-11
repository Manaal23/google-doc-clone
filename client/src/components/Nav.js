import React from 'react'
import homeStyle from "../pages/Home/Home.module.css";

function Nav() {
  return (
    <div className={homeStyle.nav}>
    <div className={homeStyle.left}>
      <div className={homeStyle.navimg}>
        <img src="https://www.gstatic.com/images/branding/product/1x/docs_2020q4_48dp.png"></img>
      </div>
      <span className={homeStyle.navtext}>Documents</span>
    </div>
    <div className={homeStyle.mid}></div>
    <div className={homeStyle.right}>
      <div className={homeStyle.logout}>
        <button>Logout</button>
      </div>
      <div className={homeStyle.profileImg}>
        <img
          src={
            "https://lh3.googleusercontent.com/ogw/ANLem4ZfX82fZf--kiaE_dGas10fTMt2fplSwaGaZqusUto=s32-c-mo"
          }
        ></img>
      </div>
    </div>
  </div>
  )
}

export default Nav