const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const mongoose = require('mongoose');
const path = require('path');
const url = require('url');

const Registro = require('./controllers/registroController');
const Cliente = require('./controllers/clienteController');
const Extintor = require('./controllers/extintorController');

require('dotenv').config();

mongoose
  .connect('mongodb://localhost:27017/sercoin-dev', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: false,
  })
  .catch((err) =>
    dialog.showMessageBox(
      null,
      { message: `Error: No se encontro la base de datos, ${err}` },
      (response) => {
        console.log(err);
      }
    )
  );

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    minWidth: 1600,
    icon: path.join(__dirname, '/../build/icon_sercoin.ico'),
    useContentSize: true,
    title: 'Sercoin',
    webPreferences: {
      nodeIntegration: true,
      plugins: true,
      webSecurity: false,
    },
  });
  mainWindow.maximize();

  mainWindow.removeMenu();

  mainWindow.loadURL(
    process.env.ELECTRON_START_URL ||
      url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
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

ipcMain.on('add', async (e, cliente, extintor, registro) => {
  try {
    const cli = await Cliente.createCliente(cliente);
    const ext = await Extintor.createExtintor(extintor);
    const reg = await Registro.createRegistro(registro, cli, ext);

    const type = 'success';
    e.sender.send('add-reply', type, cliente, extintor, registro, reg.id);
  } catch (err) {
    const type = 'error';
    e.sender.send('add-reply', type, cliente, extintor, registro, err);
  }
});
