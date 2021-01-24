const { app } = require("electron");
const shell = require("electron").shell;
const { dialog } = require('electron');
const join = require('path').join;

var separator = {
    type: "separator",
};

const menu = [{
        label: "File",
        submenu: [
            {
                label: "Settings",
                accelerator: process.platform == "darwin" ? "Command+," : "Ctrl+,",
                click() {
                    options()
                },
            },
            separator,
            {
                label: "Exit",
                accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
                click() {
                    app.quit();
                },
            },
            separator,
        ],
    },
    {
        label: "View",
        submenu: [
            {
                label: "Toggle Full Screen",
                accelerator: process.platform == "darwin" ? "F11" : "F11",
                role: "togglefullscreen",
            },
            {
                label: "Minimize",
                accelerator: process.platform == "darwin" ? "Command+M" : "Ctrl+M",
                role: "minimize",
            },
            {
                label: "Toggle Developer Tools",
                accelerator: process.platform == "darwin" ? "F12" : "F12",
                role: "toggledevtools",
            },
            {
                label: "Reload",
                accelerator: process.platform == "darwin" ? "F5" : "F5",
                role: "reload",
            },
        ],
    },
    {
        label: "Help",
        submenu: [
            {
                label: "Check for updates...",
                click() {
                    //https://www.electron.build/auto-update
                },
            },
            {
                label: "Learn More",
                click() {
                    shell.openExternal("https://github.com/SB-Ansel/duck-dlc");
                },
            },
        ],
    },
];
module.exports = menu;