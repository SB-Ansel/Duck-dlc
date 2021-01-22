import React, { useState, useEffect } from 'react';
import classes from './Settings.module.css';
import _uniqueId from 'lodash/uniqueId';
import {Divider, Paper, InputBase, IconButton} from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
import Setting from './../../components/Settings/Setting/Setting';
import * as actionTypes from '../../store/actions';
import { connect } from 'react-redux';

import { Close, MoreHoriz, HelpOutline, LaunchRounded } from '@material-ui/icons';

import { ipcRenderer } from '../../appRuntime' //ipc bridge, thanks webpack.

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

    let openDirectory = () => {
        ipcRenderer.send('openDirectory')
    }

    useEffect(() => {
        // Get return from openDirectory
        let openDirectoryListener = (event, arg) => {
            console.log("openDirectory-reply");
            console.log(arg);
            if (arg.length > 0)
            {
                // Set path setting to first path from array 
                props.onSetSetting("path", arg[0])
            }
        };

        // Register listener
        ipcRenderer.on("openDirectory-reply", openDirectoryListener);

        // Clean up
        return () => {
            // Unregister listener
            ipcRenderer.removeListener("openDirectory-reply", openDirectoryListener)
        }
        
    })

    return (
        <div className={classes.Settings}>
            <IconButton className={classes.closeButton} style={{color:'white'}} onClick={closeButtonHandler} aria-label="Close">
                <Close />
            </IconButton>
            {/* <IconButton className={classes.iconButton} className={classes.helpButton} style={{color:'white'}} onClick={helpButtonHandler} aria-label="Help">
                <HelpOutline />
            </IconButton> */}
            <h1>Settings</h1>            
            <Setting 
            title="Default download directory" 
            type="downloadDirectory" 
            handler={onTextInputChange}
            desc="Change the default download directory for duck-dlc."
            property="path"
            value={props.settings.path || ''}
            Icon={<IconButton className={classes.sideButton} style={{color:'white'}} onClick={openDirectory}><MoreHoriz></MoreHoriz></IconButton>}
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