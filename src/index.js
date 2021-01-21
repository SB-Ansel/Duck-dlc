import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { HashRouter } from 'react-router-dom';

import {createStore, applyMiddleware} from 'redux';
import { Provider } from 'react-redux';
import reducer from './store/reducers/reducer';

import { PersistGate } from 'redux-persist/integration/react'
import configuredStore from './store/store';

const saveStateWithElectron = (data) => {
  // ipcRenderer.invoke('setStoreValue', `data`, data)
  //   //         .then(() => resolve())
  //           .catch(err => console.log("ERR: ",err));
}

const loadStateWithElectron = (data) => {
  // ipcRenderer.invoke('getStoreValue', `data`, data)
  //   //         .then(() => resolve())
  //           .catch(err => console.log("ERR: ",err));
}
ReactDOM.render(
  <React.StrictMode>
    <Provider store={configuredStore.store}>
      <PersistGate loading={null} persistor={configuredStore.persistor}>
        <HashRouter>
          <App />
        </HashRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
