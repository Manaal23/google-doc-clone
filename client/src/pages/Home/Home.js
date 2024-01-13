import React, { useEffect, useState } from "react";
import homeStyle from "./Home.module.css";
import RecentDocCard from "../../components/RecentDocCard";
import NewDocCard from "../../components/NewDocCard";
import Nav from "../../components/Nav";
import axios from "axios";

function Home() {
  const [docIds, setDocIds] = useState([]);

  const fetchDocsList = async () => {
    const docList = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/document/get`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setDocIds([...docIds, ...docList.data.data]);
  };
  useEffect(() => {
    fetchDocsList();
  }, []);
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
            {docIds?.length ? (
              docIds.map((i) => {
                return (
                  <RecentDocCard
                    docId={i._id}
                    setDocIds={setDocIds}
                    docIds={docIds}
                  />
                );
              })
            ) : (
              <div>No recent documents</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
