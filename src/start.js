const { app, BrowserWindow, Tray } = require("electron");

const path = require("path");
const url = require("url");
const { Menu } = require("antd");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    minWidth: 1600,
    icon: path.join(__dirname, "/../public/icon_sercoin.ico"),
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
        pathname: path.join(__dirname, "/../public/index.html"),
        protocol: "file:",
        slashes: true,
      })
  );

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
