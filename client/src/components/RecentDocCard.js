import React, { useState } from "react";
import homeStyle from "../pages/Home/Home.module.css";
import { useHistory } from "react-router-dom";
import MoreOptions from "./MoreOptions/MoreOptions";
import useApiCall from "../common/useApiCall";

function RecentDocCard({ docData, docIds, setDocIds }) {

  const history = useHistory()
    const [isOpen, setIsOpen] = useState(false);
    const {loading,fetchData} = useApiCall();

  const handleClick = () =>{
    history.push(`/documents/${docData._id}`)
  }
  const handleDelete = async () =>{   
    const filterData = docIds.filter(i => i._id !== docData._id)
    const res = await fetchData({
      method: 'delete',
      path: '/document/delete',
      data: {
        docId: docData._id
      }
    });
    
    if (res?.status === 201)
    setDocIds(filterData)
  }



  return (
    <div className={homeStyle.docNewCard}>
      <div className={homeStyle.docCardRecentImg} onClick={handleClick}>
        <img src="https://lh3.google.com/u/0/d/1rZaRiO-hNay-NTikdkvgEPUuD_XFcz9yz_RdEDb1zf8=w416-iv6"></img>
      </div>
      <div className={homeStyle.cardDetailBody}>
        <div className={homeStyle.docTitle}>
          <p>{docData.title}</p>
        </div>
        <div className={homeStyle.cardDetail}>
          <div className={homeStyle.cardDetailImg}>
            <i class="fa-solid fa-file-invoice"></i>
            <i className="fa-solid fa-user-group"></i>
          </div>
          <div className={homeStyle.openedDoc}>
            <p>Opened 12:26 PM</p>
          </div>
          <div className={homeStyle.cardDetailMoreOptions} onClick={() => setIsOpen((prev) => !prev)}>
            <i class="fa-solid fa-ellipsis-vertical" ></i>
            <MoreOptions titleFunctionObj={[
              {
                title: 'Remove',
                function: handleDelete
              },
            ]} isOpen={isOpen} setIsOpen={setIsOpen}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecentDocCard;
