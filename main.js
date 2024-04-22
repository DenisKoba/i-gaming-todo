const { app, BrowserWindow, ipcMain } = require('electron');

let galleryWidow = null
let controlsWindow = false;

global.electron = require('electron');

function createWindow() {
    galleryWidow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });

    controlsWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        }
    });

    galleryWidow.loadURL('http://localhost:3000/gallery');
    controlsWindow.loadURL('http://localhost:3000/controls');

    ipcMain.on('message', (event, data) => {
        if (data.module === 'gallery') {
            galleryWidow.webContents.send(data.event);
        }
    });
}

app.on('ready', createWindow);
