const { ipcMain } = require('electron');
const youtubedl = require('youtube-dl')

ipcMain.on("getVideoInfo", (event, args) => {
    console.log("Hello world from ytdl handler!");
    const url = args
    youtubedl.getInfo(url, (err, info) => {
        event.reply("getVideoInfo", err, info)
    });

})