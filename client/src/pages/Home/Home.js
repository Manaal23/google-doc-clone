import React from "react";
import homeStyle from "./Home.module.css";
import RecentDocCard from "../../components/RecentDocCard";
import NewDocCard from "../../components/NewDocCard";
import Nav from "../../components/Nav";

function Home() {
  return (
    <div>
        <Nav />
      <div className={homeStyle.newDoc}>
        <div className={homeStyle.newDocFlex}>
          <div className={homeStyle.newDocTitle}>
            <h2>Start a new document</h2>
          </div>
          <div className={homeStyle.newDocBody}>
            <NewDocCard />
          </div>
        </div>
      </div>
      <div className={homeStyle.recentDoc}>
        <div className={homeStyle.newDocFlex}>
          <div className={homeStyle.newDocTitle}>
            <h2>Recent Documents</h2>
          </div>
          <div className={homeStyle.recentDocWrapper}>
            {
                [1,2,3,4,5,6,7,8,9,10].map(i => {
                    return <RecentDocCard />
                })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
