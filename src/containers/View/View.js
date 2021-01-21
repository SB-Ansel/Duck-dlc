import React, { useState, useEffect } from 'react';
import style from './View.module.css';
import { connect } from 'react-redux';

const View = (props) => {

    return (
        <>
            <div className={style.View}>
                
            </div>
        </>
    );
};

const mapStateToProps = state => {
    return {
        settings: state.settings.find(el => el.profileId === state.currentProfileId) || {}
    };
};

export default connect(mapStateToProps)(View);
//Entry point for the application, call components here!