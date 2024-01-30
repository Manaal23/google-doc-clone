/* eslint-disable no-restricted-globals */
import React, { useEffect, useRef, useState } from "react";
import PopupStyle from "./Popup.module.css";
import DropDown from "../DropDown/DropDown";
import useApiCall from "../../common/useApiCall";
import { useLocation } from "react-router-dom";
import FullPageLoader from "../FullPageLoader/FullPageLoader";

function Popup({ ...props }) {
  const user = JSON.parse(localStorage.getItem("userData"));
  const popupRef = useRef(null);
  const locationObj = useLocation();
  const splitURL = locationObj.pathname.split("/");
  const docId = splitURL[splitURL.length - 1];
  const [textVal, setTextVal] = useState("");
  const { loading, fetchData } = useApiCall();
  const [timeOutId, setTimeOutId] = useState(null);
  const [searchUserList, setSearchUserList] = useState([]);
  const [sharedUserList, setSharedUserList] = useState([]);
  const [saveLabel, setSaveLabel] = useState(false);
  const [copied, setCopied] = useState(false);
  const [docAccess, setDocAccess] = useState({
    accessType: "private",
    role: "viewer",
  });

  useEffect(() => {
    let search = textVal.trim();
    clearTimeout(timeOutId);
    if (search) {
      let tId = setTimeout(() => {
        searchUsers(search);
      }, 2000);
      setTimeOutId(tId);
    }
  }, [textVal]);

  const handleOutsideClick = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      setTextVal("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (props.openPopup) fetchSharedUsers();
  }, [props.openPopup]);

  useEffect(() => {
    let filteredSearch = searchUserList.filter(
      (i) => !sharedUserList.map((ele) => ele.userId).includes(i.googleId)
    );
    setSearchUserList([...filteredSearch]);
  }, [sharedUserList]);

  const searchUsers = async (s) => {
    const res = await fetchData({
      method: "get",
      path: `/search?search=${s}`,
    });

    if (res?.status === 201) setSearchUserList([...res.data.data]);
  };

  const fetchSharedUsers = async () => {
    const res = await fetchData({
      method: "get",
      path: `/document/get-access-users?docId=${docId}`,
    });

    if (res?.status === 201) {
      setDocAccess({ ...res.data.data.docAccess });
      setSharedUserList(res.data.data.shared);
    }
  };

  const saveRole = async (data) => {
    const res = await fetchData({
      method: "put",
      path: `/document/update-role?docId=${docId}`,
      data,
    });

    let t;
    if (res?.status === 201) {
      // show saved successfully
      setSaveLabel(true);
      clearTimeout(t);
      t = setTimeout(() => {
        props.setOpenPopup(false);
        setSaveLabel(false);
      }, 1000);
    }
  };

  const handleSearchSelect = (item) => {
    let payload = {
      userId: item.googleId,
      role: "viewer",
      email: item.email,
      firstname: item.firstname,
      lastname: item.lastname,
      image: item.image,
    };

    if (user.id === item.googleId) return;

    if (!sharedUserList.filter((i) => i.userId === item.googleId)?.length)
      setSharedUserList([...sharedUserList, payload]);
  };

  const updateData = (idx, val, name) => {
    let data;
    switch (name) {
      case "sharedUsers":
        data = [...sharedUserList];
        data[idx]["role"] = val;
        setSharedUserList([...data]);
        break;

      case "docAccess":
        data = { ...docAccess };
        data["accessType"] =
          val === "Anyone with the link" ? "public" : "private";
        setDocAccess({ ...data });
        break;

      case "docAccessRole":
        data = { ...docAccess };
        data["role"] = val;
        setDocAccess({ ...data });
        break;

      default:
        break;
    }
  };

  const handleSave = () => {
    const sharedArray = sharedUserList.map((i) => {
      return { userId: i.userId, role: i.role };
    });

    let payload = {
      docAccess,
      shared: sharedArray,
    };

    saveRole(payload);
  };

  let t;
  const copyLink = async () => {
    await navigator.clipboard.writeText(`${location.href}`);
    setCopied(true);
    clearTimeout(t);
    t = setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const removeUser = (item) => {
    let tmp = sharedUserList.filter((i) => i.userId !== item.userId);
    setSharedUserList([...tmp]);
  };
  return props.openPopup ? (
    <div className={PopupStyle.parent}>
      <div className={PopupStyle.container}>
        <div className={PopupStyle.child}>
          <div className={PopupStyle.top}>
            <div className={PopupStyle.header}>
              <h2>Share {props.title}</h2>
              {saveLabel ? (
                <div className={PopupStyle.saved}>
                  <span>Saved Successfully</span>
                </div>
              ) : null}
              <div
                className={PopupStyle.close}
                onClick={() => props.setOpenPopup(false)}
              >
                <i class="fa-solid fa-xmark"></i>
              </div>
            </div>
          </div>
          <div className={PopupStyle.mid}>
            <div className={PopupStyle.input}>
              <input
                value={textVal}
                placeholder="Add people and groups"
                onChange={(e) => setTextVal(e.target.value)}
              ></input>
              {textVal && searchUserList.length ? (
                <div className={PopupStyle.inputDropDown} ref={popupRef}>
                  <ul className={PopupStyle.inputList}>
                    {searchUserList.map((i, idx) => {
                      return (
                        <li
                          key={idx}
                          className={PopupStyle.docAccessList}
                          onClick={() => handleSearchSelect(i)}
                        >
                          <div className={PopupStyle.memberIcon}>
                            <img src={i.image}></img>
                          </div>
                          <div className={PopupStyle.memberDetail}>
                            <div className={PopupStyle.accessTitle}>
                              {`${i.firstname} ${i.lastname}`}
                            </div>
                            <div className={PopupStyle.accessDesc}>
                              {i.email}
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ) : null}
            </div>
            <div className={PopupStyle.accessheading}>
              <span>People with access</span>
            </div>
            <ul className={PopupStyle.docaccess}>
              <li className={PopupStyle.docAccessList}>
                <div className={PopupStyle.memberIcon}>
                  <img src={user.image}></img>
                </div>
                <div className={PopupStyle.memberDetail}>
                  <div className={PopupStyle.accessTitle}>
                    {`${user.firstname} ${user.lastname}`}
                  </div>
                  <div className={PopupStyle.accessDesc}>{user.email}</div>
                </div>
                <span>Owner</span>
              </li>
              {sharedUserList.length
                ? sharedUserList.map((i, idx) => {
                    return (
                      <li key={idx} className={PopupStyle.docAccessList}>
                        <div className={PopupStyle.memberIcon}>
                          <img src={i.image}></img>
                        </div>
                        <div className={PopupStyle.memberDetail}>
                          <div className={PopupStyle.accessTitle}>
                            {`${i.firstname} ${i.lastname}`}
                            <i
                              className="fa-solid fa-xmark"
                              onClick={() => removeUser(i)}
                            ></i>
                          </div>
                          <div className={PopupStyle.accessDesc}>{i.email}</div>
                        </div>
                        <DropDown
                          selected={i.role}
                          name={"sharedUsers"}
                          idx={idx}
                          updateData={updateData}
                          options={["viewer", "editor"]}
                        />
                      </li>
                    );
                  })
                : null}
            </ul>
            <div className={PopupStyle.generalaccess}>General Access</div>
            <div className={PopupStyle.accessOptions}>
              <div className={PopupStyle.accessIcon}>
                {/* <img src={'https://lh3.googleusercontent.com/a/ACg8ocL6ioTkgOiAmJeXU1jjHPiwytj2TdYzt4FHv5HLa7V9pO7r=s96-c'}></img> */}
                {docAccess.accessType === "public" ? (
                  <i className={`fa-solid fa-globe`}></i>
                ) : (
                  <i class="fa-solid fa-lock"></i>
                )}
              </div>
              <div className={PopupStyle.accessFlex}>
                <div className={PopupStyle.accessTitle}>
                  <span>
                    <DropDown
                      name={"docAccess"}
                      updateData={updateData}
                      selected={
                        docAccess.accessType === "public"
                          ? "Anyone with the link"
                          : "Restricted"
                      }
                      options={["Anyone with the link", "Restricted"]}
                    />
                  </span>
                </div>
                <div className={PopupStyle.accessDesc}>
                  {docAccess.accessType === "public"
                    ? "Anyone with the link on the internet"
                    : "Only people with access can open with the link"}
                </div>
              </div>
              {docAccess["accessType"] === "public" ? (
                <DropDown
                  name={"docAccessRole"}
                  updateData={updateData}
                  selected={docAccess.role}
                  options={["viewer", "editor"]}
                />
              ) : null}
            </div>
          </div>
          <div className={PopupStyle.bottom}>
            <div className={PopupStyle.bottomFlex}>
              <div className={PopupStyle.copyLink}>
                <button onClick={copyLink}>Copy link</button>
              </div>

              <div className={PopupStyle.done}>
                <button onClick={handleSave}>Done</button>
              </div>
            </div>
          </div>
          {copied ? (
            <div className={PopupStyle.copied}>Link copied!!</div>
          ) : null}
        </div>
      </div>
      {loading ? <FullPageLoader /> : null}
    </div>
  ) : null;
}

export default Popup;
