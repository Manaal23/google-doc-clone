import React from 'react'
import PopupStyle from './Popup.module.css'

function Popup({...props}) {
    const user = JSON.parse(localStorage.getItem('userData'))
  return (
    props.openPopup ?
    <div className={PopupStyle.parent}>
        <div className={PopupStyle.container}>
        <div className={PopupStyle.child}>
            <div className={PopupStyle.top}>
                <div className={PopupStyle.header}>
                    <h2>Share {props.title}</h2>
                    <div className={PopupStyle.close} onClick={()=>props.setOpenPopup(false)}>
                    <i class="fa-solid fa-xmark"></i>
                    </div>
                </div>
            </div>
            <div className={PopupStyle.mid}>
                {/* <div className={PopupStyle.input}>
                    <input placeholder='Add people and groups'></input>
                </div> */}
                <div className={PopupStyle.accessheading}>
                    People with access
                </div>
                <div className={PopupStyle.docaccess}>
                    <li className={PopupStyle.docAccessList}>
                        <div className={PopupStyle.memberIcon}>
                            <img src={'https://lh3.googleusercontent.com/a/ACg8ocL6ioTkgOiAmJeXU1jjHPiwytj2TdYzt4FHv5HLa7V9pO7r=s96-c'}></img>
                        </div>
                        <div className={PopupStyle.memberDetail}>
                            <div className={PopupStyle.accessTitle}>
                                {`${user.firstname} ${user.lastname}` }
                            </div>
                            <div className={PopupStyle.accessDesc}>
                            {user.email}
                            </div>
                        </div>
                        {/* <DropDown /> */}
                    </li>
                </div>
                <div className={PopupStyle.generalaccess}>
                    General Access
                </div>
                <div className={PopupStyle.accessOptions}>
                    <div className={PopupStyle.accessIcon}>
                    {/* <img src={'https://lh3.googleusercontent.com/a/ACg8ocL6ioTkgOiAmJeXU1jjHPiwytj2TdYzt4FHv5HLa7V9pO7r=s96-c'}></img> */}
                    </div>
                    <div className={PopupStyle.accessFlex}>
                        <div className={PopupStyle.accessTitle}>
                            Anyone with the link
                        </div>
                        <div className={PopupStyle.accessDesc}>
                            Anyone with the link on the internet
                        </div>
                    </div>
                    {/* <DropDown /> */}
                </div>
            </div>
            <div className={PopupStyle.bottom}>
                <div className={PopupStyle.bottomFlex}>
                    <div className={PopupStyle.copyLink}>
                        <button>Copy link</button>
                    </div>
                    
                    <div className={PopupStyle.done}>
                    <button>Restrict</button>
                    </div>
                </div>
            </div>

        </div> 
        </div>
    </div>
    :
    null
  )
}

export default Popup