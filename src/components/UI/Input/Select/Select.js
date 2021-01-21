import React, {useState, useEffect} from 'react';
import style from './Select.module.css';

import * as actionTypes from '../../../../store/actions';
import {connect} from 'react-redux';

const Select = (props) => {

    let [currentProfileId, setCurrentProfileId] = useState(props.value);

    let onChangeProfile = (event) => {
        console.log(`Profile set to: ${event.target.value}'`);
        // console.log(event.target.value);

        setCurrentProfileId(event.target.value);
    }

    let addHandler = (name) => {
        console.groupCollapsed('Value Changed');
        console.log('test');
        console.log(`action:`);
        console.groupEnd();
        let newProfile = props.addHandler(name)
        console.log('Created profile: ', newProfile.id);
        setCurrentProfileId(newProfile.id);
    }
    let deleteHandler= (event) => {
        console.log(currentProfileId);
        if (currentProfileId === 'default'){
            return console.log("You cannot delete the default profile!");
        }
        let deletedIndex = props.options.findIndex(el => el.id === currentProfileId);

        setCurrentProfileId(props.options[deletedIndex-1].id);
        props.onChangeProfile(props.options[deletedIndex-1].id);

        props.removeHandler(currentProfileId)
    }


    useEffect(() => {
        console.groupCollapsed("Select profile id change");
        console.log(currentProfileId);
        // console.log(props.options[0]);
        console.groupEnd();
        props.onChangeProfile(currentProfileId);
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentProfileId])

    return (


        // DONE implement  https://react-select.com/creatable
        <div className={style.RowContainer}>
            <div className={style.Select}>
                <select value={currentProfileId} property={props.property} onChange={onChangeProfile}>
                    {props.options.map((profile, index) => {
                    return <option key={profile.id} value={profile.id}>{profile.name}</option>;
                    })}
                </select>
            </div>
            <div className={style.Flex}>
                <button onClick={() => addHandler('Profile')} className={style.Button + ' ' + style.ButtonGreen}>Add</button>
                <button disabled={currentProfileId === 'default'} onClick={() => deleteHandler()} className={style.Button + ' ' + style.ButtonRed}>Remove</button>
                <button disabled={currentProfileId === 'default'} onClick={() => props.renameClickedHandler()} className={style.Button}>Rename</button>
            </div>
        </div>
    );
};


const mapStateToProps = state => {
    return {
        profiles: state.profiles,
        currentProfileId: state.currentProfileId,
        currentProfileName: state.profiles.find(el => el.id === state.currentProfileId).name
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetSetting: (id, value) => dispatch({type: actionTypes.SET_SETTING, payload: {id: id, value: value}}),
        onAddProfile: (id, name) => dispatch({type: actionTypes.ADD_PROFILE, payload: {id: id, name: name}}),
        onChangeProfile: (id) => dispatch({type: actionTypes.CHANGE_PROFILE, payload: {id: id}})
        
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(Select);