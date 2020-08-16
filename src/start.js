const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const mongoose = require('mongoose');
const path = require('path');
const url = require('url');

const Registro = require('./controllers/registroController');
const Cliente = require('./controllers/clienteController');
const Extintor = require('./controllers/extintorController');

require('dotenv').config();

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: false,
  })
  .then(() =>
    dialog.showMessageBox(
      null,
      { message: 'DB Connection successful' },
      (response) => {
        console.log(response);
      }
    )
  )
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

ipcMain.on('add', async (e, cliente, extintor, registro) => {
  try {
    // QUE PASA SI REGISTRA CLIENTE Y NO EXTINTOR,ETC
    const cli = await Cliente.createCliente(cliente);
    const ext = await Extintor.createExtintor(extintor);
    const reg = await Registro.createRegistro(registro, cli, ext);

    const type = 'success';
    e.sender.send('add-reply', type, cliente, extintor, registro);
  } catch (err) {
    const type = 'error';
    e.sender.send('add-reply', type, err);
  }
});

// TODO:
// MENSAJES X
// PDF
// VALIDACIONES
