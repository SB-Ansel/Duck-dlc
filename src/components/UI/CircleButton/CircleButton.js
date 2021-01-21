import React, { useState, useEffect } from 'react';
import style from './CircleButton.module.css';


const CircleButton = (props) => {
    return (
        // <div className={style.CircleButton}>
            <button className={style.CircleButton} onClick={props.onClick}>
                {props.children}
            </button>
        //</div>
    );
};


export default CircleButton;