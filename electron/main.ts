import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as isDev from 'electron-is-dev';

function createWindow() {
  console.log('Creating window...');
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  const appPath = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../index.html')}`;

  console.log('Loading URL:', appPath);

  win.loadURL(appPath);

  if (isDev) {
    win.webContents.openDevTools();
  }
}

app.whenReady().then(() => {
  console.log('App is ready');
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
