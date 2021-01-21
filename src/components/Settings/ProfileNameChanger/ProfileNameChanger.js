import React, { useState } from 'react';
import style from './ProfileNameChanger.module.css';

import * as actionTypes from '../../../store/actions';
import {connect} from 'react-redux';

import Modal from '../../UI/Modal/Modal';
import Text from '../../UI/Input/Text/Text';



const ProfileNameChanger = (props) => {

    let onNameChange = (e) => {
        console.groupCollapsed('Profile Changer on NameChange');
        console.log(e.target.value);
        console.groupEnd();
        props.onRenameProfile(props.currentProfileId, e.target.value)
    }

    // console.groupCollapsed('Profile Changer');
    
    // console.log(props.currentProfileId);
    // console.log(props.profiles);
    // console.log(props.profiles.find(el=>el.id===props.currentProfileId));
    // console.log(props.profiles.find(el=>el.id===props.currentProfileId).name);
    // console.groupEnd();
    return (
        <div className={style.ProfileNameChanger}>
            <Modal modalClosed={props.modalClosed} show={props.show}>
                <div className={style.Modal}>

                    <h2>Change profile name</h2>
                    <form onSubmit={(event) => {props.modalClosed(); event.preventDefault()}}>
                        <Text onChange={onNameChange} value={props.profiles.find(el=>el.id===props.currentProfileId).name}/>   
                        <input type="submit" className={style.HiddenSubmit}/> 
                    </form>

                </div>
            </Modal>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        profiles: state.profiles,
        currentProfileId: state.currentProfileId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetSetting: (id, value) => dispatch({type: actionTypes.SET_SETTING, payload: {id: id, value: value}}),
        onAddProfile: (id, name) => dispatch({type: actionTypes.ADD_PROFILE, payload: {id: id, name: name}}),
        onRenameProfile: (id, name) => dispatch({type: actionTypes.RENAME_PROFILE, payload: {id: id, name: name}})
        
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(ProfileNameChanger);