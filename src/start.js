const { app, BrowserWindow, ipcMain } = require('electron');
const mongoose = require('mongoose');
const path = require('path');
const url = require('url');

const Cliente = require('./models/clienteModel');

require('dotenv').config();

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: false,
  })
  .then(() => console.log('DB Connection successful'))
  .catch((err) => console.log(err));

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    minWidth: 1600,
    icon: path.join(__dirname, '/../public/icon_sercoin.ico'),
    useContentSize: true,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.maximize();
  // mainWindow.setResizable(false);
  // mainWindow.on("unmaximize", () => mainWindow.maximize());
  mainWindow.removeMenu();

  mainWindow.webContents.openDevTools();

  mainWindow.loadURL(
    process.env.ELECTRON_START_URL ||
      url.format({
        pathname: path.join(__dirname, '/../public/index.html'),
        protocol: 'file:',
        slashes: true,
      })
  );

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

ipcMain.on('add', async (e) => {
  const doc = await Cliente.create({
    nombre_cliente: 'test',
    direccion_cliente: 'test',
    comuna_cliente: 'test',
    telefono_cliente: 'test',
    correo_cliente: 'test',
  });
  console.log(doc);
});
