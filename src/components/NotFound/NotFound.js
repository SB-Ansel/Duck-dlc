import React from 'react';
import style from './NotFound.module.css';


const NotFound = (props) => {
    return (
        <div className={style.NotFound}>
            <h1>404</h1>
            <p>The page you're looking for could not be found!</p>
        </div>
    );
};


export default NotFound;