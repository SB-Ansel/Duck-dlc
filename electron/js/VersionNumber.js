//Handles version number(plus anything else) for the loading.html file.
const ipcRenderer = require('electron').ipcRenderer
document.getElementById("version").textContent = process.env.npm_package_version;

//there is a better way of doing this, but I can't think atm......
ipcRenderer.send('runtimeChks')
ipcRenderer.on('runtimeChks-reply', (event, args)=>{
    document.getElementById("runtimeChks").textContent = args;
})