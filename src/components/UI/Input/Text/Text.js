import React from 'react';
import style from './Text.module.css';


const Text = (props) => {
    return (
        <div className={style.Text}>
            <input className={style.TextInput} 
                property={props.property} 
                type={props.type} 
                disabled={props.disabled} 
                onChange={props.onChange}  
                value={props.value} 
                placeholder={props.placeholder}
                defaultValue={props.defaultValue}
            />
        </div>
    );
};


export default Text;