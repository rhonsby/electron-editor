const { app, BrowserWindow } = require('electron');
const path = require('path');


let mainWindow;

app.on('ready', () => {
    const indexPath = path.join(__dirname, 'index.html');

    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(`file:///${indexPath}`);
});
