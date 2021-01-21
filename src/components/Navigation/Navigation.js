import React, {useState} from 'react';
import style from './Navigation.module.css';
import './Navigation.module.css';
import { NavLink } from 'react-router-dom';
import { MdHome, MdSettings,  MdExitToApp } from 'react-icons/md';

// const electron = window.require('electron');
// const ipcRenderer  = electron.ipcRenderer;


const Navigation = (props) => {
    
    let [open, setOpen] = useState(false);
    let shownClass = open ? style.Shown : null;

    let openButtonHandler = () => {
        setOpen(!open);
        console.log(open);
    }

    let closeButtonHandler = () => {
        // ipcRenderer.invoke('quitApp')
        //   .catch(err => console.log(err));
    }

    return (
        <div>
            <div className={style.Navigation + ' ' + shownClass}>
                <div onClick={openButtonHandler} className={style.NavigationButton + ' ' + shownClass}></div>
                <div className={style.Header}>
                    Menu
                </div>
                <NavLink exact activeClassName={style.Active} className={style.Link} to="/"><MdHome className={style.LinkIcon}/> Home</NavLink>
                <NavLink exact activeClassName={style.Active} className={style.Link} to="/settings"><MdSettings className={style.LinkIcon}/> Settings</NavLink>

                <div className={style.Filler}></div>

                <button onClick={closeButtonHandler} className={style.Link + ' ' + style.ExitButton} ><MdExitToApp className={style.LinkIcon}/> Exit</button>
            </div>
        </div>
    );
};


export default Navigation;