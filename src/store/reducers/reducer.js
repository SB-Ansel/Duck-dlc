import * as actionTypes from '../actions';
// const electron = window.require('electron');
// const ipcRenderer  = electron.ipcRenderer;

// const getSettingsFromElectron = async () => {
//     let value = await ipcRenderer.invoke('getStoreValue', 'settings')
//                             .catch(err => console.log("Could not load local data: " + err));

//     console.log(value);
//     console.log("The promise returned: " + value);
//     console.log();
//     return {...{test:'abc'}};
// }

const setSettingInElectron = (profileId, propertyName, value) => new Promise((resolve, reject) => {
    console.log("Sending!");
    // ipcRenderer.invoke('setStoreValue', `settings.${profileId}.${propertyName}`, value)
    //         .then(() => resolve())
    //         .catch(err => reject(err));
});

const initialState = {
    settings: [{
        profileId: 'default',
        appTitle: 'DEV',
        webServer: 'google.com',
        webPort: '80',
        sqlDatabase: 'Database'
    }],
    currentProfileId: 'default',
    profiles: [
        {
            id: 'default',
            name: 'Default'
        }
    ]
}

const reducer = (state = initialState, action) => {
    if (!action.type.startsWith("@@redux/") && !action.type.startsWith("persist/")) {
        console.groupCollapsed(`Action! ${action.type}`);
        console.log(action)
        console.groupEnd();
    }
    switch (action.type) {
        case actionTypes.SET_SETTING:
            setSettingInElectron(state.currentProfileId, action.payload.id, action.payload.value)
            .catch(err => console.log("Could not save data in local storage: " + err));

            // console.log(state.settings);

            let updatedSettings = state.settings.map(el => {
                if (el.profileId === state.currentProfileId) {
                    return {
                        ...el,
                        [action.payload.id]: action.payload.value
                    };
                } else {
                    return el;
                }
            });
            console.groupCollapsed("New Settings:");
            console.log("Profile: ",state.currentProfileId);
            console.log("Setting ID: ", action.payload.id);
            console.log("Setting value: ", action.payload.value);
            // console.log(updatedSettings);
            console.groupEnd();
            return {
                ...state,
                settings: updatedSettings
            }
        case actionTypes.ADD_PROFILE:
            // setSettingInElectron(action.payload.id, action.payload.value)
            // .catch(err => console.log("Could not save data in local storage: " + err));

            // console.log(state.settings);
            return {
                ...state,
                profiles: [
                    ...state.profiles,
                    {
                        id: action.payload.id,
                        name: action.payload.name
                    }
                ],
                settings: [
                    ...state.settings,
                    {
                        profileId: action.payload.id
                    }
                ]
            }
        case actionTypes.REMOVE_PROFILE:
            // setSettingInElectron(action.payload.id, action.payload.value)
            // .catch(err => console.log("Could not save data in local storage: " + err));

            // console.log(state.settings);
            return {
                ...state,
                profiles: state.profiles.filter(el => el.id !== action.payload.id),
                settings: state.settings.filter(el => el.profileId !== action.payload.id)
            }
        case actionTypes.RENAME_PROFILE:
            // setSettingInElectron(action.payload.id, action.payload.value)
            // .catch(err => console.log("Could not save data in local storage: " + err));

            // console.log(state.settings);
            let updatedProfiles = state.profiles.map(el => {
                if (el.id === action.payload.id) {
                    return {
                        id: el.id,
                        name: action.payload.name
                    };
                } else {
                    return el;
                }
            });
            return {
                ...state,
                profiles: updatedProfiles
            }
        case actionTypes.CHANGE_PROFILE:
            // setSettingInElectron(action.payload.id, action.payload.value)
            // .catch(err => console.log("Could not save data in local storage: " + err));

            // console.log(action.payload);
            return {
                ...state,
                currentProfileId: state.profiles.find(el => el.id === action.payload.id).id
            }
        case actionTypes.LOAD_SETTINGS:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    ...action.payload
                }
            }
        case actionTypes.LOAD_STATE:
            return {
                ...state,
                ...action.payload
            }
        case actionTypes.SET_LOADING:
            return {
                ...state,
                loading: action.payload.value
            }
        default:
    }
    
    return state;
}

export default reducer;