const { app, Menu, BrowserWindow, ipcMain, dialog, shell} = require('electron');
const fs = require('fs');
const isDev = require('electron-is-dev');
const path = require('path');
const menuModule = require("./js/SBAnselControls.js");
const Store = require('electron-store');
const { settings } = require('cluster');
const { SendRounded } = require('@material-ui/icons');

const duckDependencies = ['youtube-dl.txt', 'ffmpeg.txt']

const scheme = {
    data: {}
};

const store = new Store({ scheme });
//variables
let mainwindow;
let unsubscribe;
let openDirectory;
let host = process.env.OS; //Gets OS version of current host.

function createWindow() {
    let loading = new BrowserWindow({
        show: false,
        frame: false,
        backgroundColor: '#1E1E1E',
        width: 300,
        alwaysOnTop: false,
        height: 300,
        icon: path.join(__dirname, '../assets/logo/logo-hd.png'),
        webPreferences: {
            nodeIntegration: true,
        }
    })

    mainwindow = new BrowserWindow({
        width: 910,
        height: 500,
        icon: path.join(__dirname, '../assets/logo/logo-hd.png'),
        minHeight: 500,
        minWidth: 910,
        backgroundColor: '#1E1E1E',
        show: false,
        resizable: true,
        webPreferences: {
            nodeIntegration: true,
        }
    })

    const startURL = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;
    //const startURL = isDev ? `file://${path.join(__dirname, '../public/loading.html')}` : `file://${path.join(__dirname, '../build/loading.html')}`;

    mainwindow.loadURL(startURL)
    // mainwindow.setMenu(null);

    //Post-initialization
    mainwindow.webContents.once('dom-ready', () => { //When ready load main window
        console.log("Electron: main.js - Hello React-js!")
        const menu = Menu.buildFromTemplate(menuModule) //and attach custom menu bar.
        Menu.setApplicationMenu(menu)
        mainwindow.show();
        loading.hide();
        loading.close();
    })
    //initialization
    loading.loadURL(isDev ? `file://${path.join(__dirname, '../public/loading.html')}` : `file://${path.join(__dirname, '../build/loading.html')}`)
    loading.show()
    options = function () {
        mainwindow.webContents.send("openSettings");
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
//Update Fri 29th - decided to nuke this section as it's no longer relevant (npm youtube-dl), (future work) turn this section into duck-dlc update check instead.

////#Region - Functions
// function runTimeChk1(){
//     duckDependencies.forEach(function(value){
//         try {
//             if(fs.existsSync(__dirname+'\\bin\\'+value)) {
//                 //pass
//             } else {
//                 console.log('The file does not exist.' + value);
//                 dialog.showErrorBox('Oh snap!','The dependency '+value+' is missing, please add it and try again.')
//                 process.exit();
//             }
//         } catch (err) {
//             console.error(err);
//         }
//     });
// };

// function runTimeChk2(){
//     //Gonna need to update any youtube-dl dependency in the bin folder.
// };
////#EndRegion - Functions

////#Region - IPC handlers
ipcMain.handle('getStoreValue', (event, key) => {
    return store.get(key);
});

ipcMain.handle('setStoreValue', (event, key, value) => {
    console.log(`setStoreValue: key:'${key}' value:'${value}'`)
    return store.set(key, value);
});

//Main runtimeChks - Run dependencies checks.
ipcMain.on('runtimeChks',(event, args) => {
    try {
        // //Stage 1
        // event.reply("runtimeChks-reply", "Checking for dependencies!")
        // runTimeChk1()
        // //Stage 2
        // event.reply("runtimeChks-reply", "Checking for updates!")
        // runTimeChk2()
    }
    catch (e) {
        console.log(e);
    }
  });

//Settings openDirectory
ipcMain.on('openDirectory', (event) => { //handle incoming request and return promise to renderer
    openDirectory = dialog.showOpenDialog(mainwindow, {
        title: 'Select a directory',
        properties: ['openDirectory']
    }).then(result => {
        console.log(result.canceled)
        console.log(result.filePaths)
        event.reply("openDirectory-reply", result.filePaths)
    }).catch(err => {
        console.log(err)
    })
});
//Main downloadsDirectory
ipcMain.on('downloadsDirectory', (event, args) => {
    shell.openPath(args)
});
////#endRegion - IPC handlers
module.exports = function mainWindow() { } //Imports sb-ansel_control.js