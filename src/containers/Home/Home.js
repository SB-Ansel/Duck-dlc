import React, {useState, useEffect} from 'react';
// import classes from './Home.module.css';
// import Header from '../../components/Header/Header';
// import Axios from '../../axios';
// import CircleButton from '../../components/UI/CircleButton/CircleButton';
// import { MdSettings } from 'react-icons/md';
// import View from '../View/View';
// import Loader from '../../components/UI/Loader/Loader';
import * as actionTypes from '../../store/actions';
import {connect} from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {Divider, Paper, InputBase, IconButton} from '@material-ui/core';
import {FolderOpenRounded, LaunchRounded } from '@material-ui/icons';
import { ipcRenderer } from '../../appRuntime'

const useStyles = makeStyles((theme) => ({
    root: {
      padding: '2px 4px',
      margin: 'auto',
      display: 'flex',
      alignItems: 'center',
      width: 800,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 28,
      margin: 4,
    },
  }));

  // Snackbar popup when download is complete! https://callstack.github.io/react-native-paper/snackbar.html

const Home = (props) => {
  const classes = useStyles();

  function downloadsDirectory(){
    ipcRenderer.send('downloadsDirectory', props.settings.path)
  }
  
  return (
    <Paper component="form" className={classes.root}>
      <IconButton className={classes.iconButton} onClick={downloadsDirectory}>
        <FolderOpenRounded/>
      </IconButton>

      <InputBase
        className={classes.input}
        placeholder="Quack!"
        inputProps={{ 'aria-label': 'Enter a valid youtube url' }}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton color="primary" className={classes.iconButton} aria-label="directions">
        <LaunchRounded/>
      </IconButton>
    </Paper>    
  );
};

const mapStateToProps = state => {
    return {
        loading: state.loading,
        settings: state.settings.find(el => el.profileId === state.currentProfileId) || {}
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onSetLoading: (value) => dispatch({type: actionTypes.SET_LOADING, payload: {value: value}}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);