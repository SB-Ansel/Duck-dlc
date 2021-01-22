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
            // {
            //     label: "Add video from file",
            //     accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
            //     click() {
            //         console.log(dialog.showOpenDialog({ properties: ['openFile'] }))
            //     },
            // },
            // separator,
            // {
            //     label: "Open",
            //     accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
            //     click() {
            //         app.quit();
            //     },
            // },
            // separator,
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
    // {
    //     label: "Tools",
    //     submenu: [{
    //             label: "Download a video",
    //             click() {
    //                 // downloadAVideo
    //             },
    //         },
    //         separator,
    //         {
    //             label: "Download a playlist or channel",
    //             click() {
    //                 //
    //             },
    //         },
    //         separator,
    //         {
    //             label: "Download from list",
    //             submenu: [{
    //                     label: "Enter multiple urls",
    //                     click() {
    //                         //
    //                     },
    //                 },
    //                 separator,
    //                 {
    //                     label: "Open file of urls",
    //                     click() {
    //                         //
    //                     },
    //                 },
    //             ],
    //         },
    //     ],
    // },
    {
        label: "View",
        submenu: [{
                label: "minimize window",
                accelerator: process.platform == "darwin" ? "Command+Shift+I" : "Ctrl+Shift+I",
                role: "minimize",
            },
            {
                label: "Toggle Full Screen",
                accelerator: process.platform == "darwin" ? "F11" : "F11",
                role: "togglefullscreen",
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
        submenu: [{
                label: "Learn More",
                click() {
                    shell.openExternal("https://github.com/SB-Ansel/duck-dlc");
                },
            },
        ],
    },
];
module.exports = menu;