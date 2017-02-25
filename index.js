const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');


let mainWindow;

app.on('ready', () => {
    const indexPath = path.join(__dirname, 'index.html');
    let currentOpenedFilePath;

    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(`file:///${indexPath}`);

    mainWindow.webContents.on('will-navigate', (e, url) => {
        e.preventDefault();
        mainWindow.webContents.send('navigate', url);
    });

    globalShortcut.register('CommandOrControl+S', () => {
        mainWindow.webContents.send('ping', 'save');
    });

    ipcMain.on('async', (e, command, payload) => {
        if (command === 'save') {
            const { url, data } = payload;

            fs.writeFile(url, data, 'utf8', (err) => {
                if (err) {
                    console.log(`Error processing ${url}`);
                    return;
                }

                console.log(`Contents of ${url} saved!`);
            })
        }
    })
});
