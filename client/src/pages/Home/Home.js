import React, { useEffect, useState } from "react";
import homeStyle from "./Home.module.css";
import RecentDocCard from "../../components/RecentDocCard";
import NewDocCard from "../../components/NewDocCard";
import Nav from "../../components/Nav";
import useApiCall from "../../common/useApiCall";

function Home() {
  const [docIds, setDocIds] = useState([]);
  const {loading, fetchData} = useApiCall()

  const fetchDocsList = async () => {
    const docList = await fetchData({
      method: 'get',
      path: '/document/get'
    })
    if (docList)
    setDocIds([...docIds, ...docList?.data?.data]);
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
                    docData={i}
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
