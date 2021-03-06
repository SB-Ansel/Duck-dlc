import React from 'react';
import classes from './Setting.module.css';
import style from './Setting.module.css';
import Select from '../../UI/Input/Select/Select';
import Text from '../../UI/Input/Text/Text';

import * as actionTypes from '../../../store/actions';
import { connect } from 'react-redux';

import {IconButton} from '@material-ui/core';
import {MoreHoriz} from '@material-ui/icons';

const Setting = (props) => {

    let inputElement = "";
    
    switch (props.type) {
        case 'select':
            inputElement = <Select 
            property={props.property} 
            options={props.options}
            addHandler={props.addHandler}
            removeHandler={props.removeHandler}
            renameClickedHandler={props.renameClickedHandler}
            value={props.value}
            />
            break;
        case 'text':
        default:
            inputElement = <Text 
            className={classes.TextInput2} 
            property={props.property} 
            type={props.type} 
            disabled={props.disabled} 
            onChange={props.handler} 
            value={props.value} 
            placeholder={props.title} 
            Icon={props.Icon}
            />
    }
    return (
        <div className={style.Setting}>
            <div className={classes.Header}>
                <span className={classes.Name}>{props.title}</span>
            </div>
            <div>
                {props.desc}
            </div>
            <div className={classes.inputElementDiv}>
                {inputElement}
                {props.Icon}
                {/* <IconButton className={classes.iconButton} className={classes.fileButton}onClick={props.buttonHandler} aria-label="Open Directory">
                    <MoreHoriz>
                    </MoreHoriz>
                </IconButton> */}
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
        onSetSetting: (id, value) => dispatch({ type: actionTypes.SET_SETTING, payload: { id: id, value: value } }),
        onAddProfile: (id, name) => dispatch({ type: actionTypes.ADD_PROFILE, payload: { id: id, name: name } }),
        onChangeProfile: (id) => dispatch({ type: actionTypes.CHANGE_PROFILE, payload: { id: id } })

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Setting);