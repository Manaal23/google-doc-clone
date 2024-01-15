import React, { useEffect, useRef, useState } from 'react'
import popupStyles from './Popup.module.css'

function MoreOptions({titleFunctionObj, isOpen, setIsOpen}) {

  const popupRef = useRef(null);

  const handleOutsideClick = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  return (
    isOpen ?
    <div className={popupStyles.moreOptions} ref={popupRef}>
    {
        titleFunctionObj.map(i => {

        return <div className={popupStyles.list} onClick={i.function}>
      <span>{i.title}</span>
    </div>
        })
    }
  </div>
  :
  <></>
  )
}

export default MoreOptions