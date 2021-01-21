import React, { useState } from 'react';
import classes from './Settings.module.css';
import _uniqueId from 'lodash/uniqueId';
import {Divider, Paper, InputBase, IconButton} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Setting from './../../components/Settings/Setting/Setting';
import * as actionTypes from '../../store/actions';
import { connect } from 'react-redux';
// import ProfileNameChanger from './../../components/Settings/ProfileNameChanger/ProfileNameChanger';
import { Close, Folder, HelpOutline, LaunchRounded } from '@material-ui/icons';
// const electron = window.require('electron');
// const ipcRenderer  = electron.ipcRenderer;

import { ipcRenderer } from '../../appRuntime'

const Settings = (props) => {
    let [showModal, setShowModal] = useState(false);

    let onTextInputChange = (event) => {
        let propertyName = event.target.getAttribute('property');
        if (propertyName)
            props.onSetSetting(propertyName, event.target.value);
    }
    
    let closeButtonHandler = () => {
        //Route back to home.
        props.history.replace("/");
    }

    let helpButtonHandler = () => {
        //Route to SB-Ansel github.
        window.open('http://github.com/SB-Ansel', '_blank')
    }

    let filePathButtonHandler = () => {
        //Route to SB-Ansel github.
        // <input directory="" webkitdirectory="" type="file" />
    }

    let openDirectory = () => {
        console.log("openDirectory")
        ipcRenderer.send('openDirectory')
    }
    // Get return from openDirectory
    ipcRenderer.on("openDirectory-reply", (event, arg) => {
        console.log(arg);
        if (arg.length > 0)
        {
            // Set path setting to first path from array 
            props.onSetSetting("path", arg[0])
        }
    })

    return (
        <div className={classes.Settings}>
            <IconButton className={classes.iconButton} className={classes.closeButton} style={{color:'white'}} onClick={closeButtonHandler} aria-label="Close">
                <Close />
            </IconButton>
            <IconButton className={classes.iconButton} className={classes.helpButton} style={{color:'white'}} onClick={helpButtonHandler} aria-label="Help">
                <HelpOutline />
            </IconButton>
            
            <h1>Settings</h1>            
            <Setting 
            title="Default download directory" 
            type="downloadDirectory" 
            handler={onTextInputChange}
            desc="Change the default download directory for duck-dlc"
            property="path"
            value={props.settings.path || ''}
            buttonHandler={openDirectory}
            />
            <h1>About this app</h1>
            <h5>Some generic information here about app</h5>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        settings: state.settings.find(el => el.profileId === state.currentProfileId) || {},
        profiles: state.profiles,
        currentProfileId: state.currentProfileId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetSetting: (id, value) => dispatch({ type: actionTypes.SET_SETTING, payload: { id: id, value: value } }),
        onAddProfile: (id, name) => dispatch({ type: actionTypes.ADD_PROFILE, payload: { id: id, name: name } }),
        onRemoveProfile: (id) => dispatch({ type: actionTypes.REMOVE_PROFILE, payload: { id: id } })

    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Settings);