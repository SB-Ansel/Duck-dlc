const { app, Menu, BrowserWindow, ipcMain, dialog} = require('electron');
const isDev = require('electron-is-dev');
const path = require('path');
const menuModule = require("./js/SBAnselControls.js");
const Store = require('electron-store');
const { settings } = require('cluster');
const { SendRounded } = require('@material-ui/icons');

const scheme = {
    data: {}
};

const store = new Store({ scheme });
//variables
let mainwindow;
let unsubscribe;
let openDirectory;

function createWindow() {
    let loading = new BrowserWindow({
        show: false,
        frame: false,
        backgroundColor: '#1E1E1E',
        width: 300,
        height: 300,
        webPreferences: { 
            nodeIntegration: true,
        }
    })

    mainwindow = new BrowserWindow({
        width: 910,
        height: 500,
        icon: path.join(__dirname, '../assets/icon.png'),
        minHeight: 910,
        minWidth: 500,
        backgroundColor: '#1E1E1E',
        show: false,
        resizable: false,
        webPreferences: {
            nodeIntegration: true,
        }
    })

    const startURL = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;

    mainwindow.loadURL(startURL)
    mainwindow.setMenu(null);

    mainwindow.webContents.once('dom-ready', () => { //When ready load main window
        console.log("Electron: main.js - Hello React-js!")
        const menu = Menu.buildFromTemplate(menuModule) //and attach custom menu bar.
        Menu.setApplicationMenu(menu)
        mainwindow.show();
        loading.hide();
        loading.close();
    })
    loading.loadURL(isDev ? `file://${path.join(__dirname, '../public/loading.html')}` : `file://${path.join(__dirname, '../build/loading.html')}`)
    loading.show()

    options = function () {
        mainwindow.loadURL('http://localhost:3000/#/settings')
        }
}

app.whenReady().then(createWindow)
    .then(() => {
        unsubscribe = store.onDidChange('settings.title', (newValue, oldValue) => {
            console.log("NewValue: " + newValue);
            console.log("OldValue: " + oldValue);
            mainwindow.webContents.send('storeValueChanged', 'settings.title', newValue, oldValue)
        });
    })

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

////#Region - IPC handlers
ipcMain.handle('getStoreValue', (event, key) => {
    return store.get(key);
});

ipcMain.handle('setStoreValue', (event, key, value) => {
    console.log(`setStoreValue: key:'${key}' value:'${value}'`)
    return store.set(key, value);
});

ipcMain.on('openDirectory', async () => { //handle incoming request and return promise to renderer
    openDirectory = dialog.showOpenDialog(mainwindow, {
        title:'Select a directory',
        properties: ['openDirectory']
    }).then(result => {
        console.log(result.canceled)
        console.log(result.filePaths)
        // ipcMain.emit('filePath', result.filePaths)
        return result.filePaths
      }).catch(err => {
        console.log(err)
      })
    });

////#endRegion - IPC handlers
module.exports = function mainWindow() { } //Imports sb-ansel_control.js