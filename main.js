//* Modules to control application life and create native browser window
const { app, BrowserWindow, webContents, session, Menu, MenuItem, Tray, ipcMain } = require("electron");
const path = require("path");
//* MENU AND WINDOW DECLARATION
//! Keep a global reference of the window object, if you don't, the window will
//! be closed automatically when the JavaScript object is garbage collected.
let mainWindow, secondaryWindow, trayn, splahWindow;

const trayMenu = Menu.buildFromTemplate([{ label: "Quit app", role: "quit" }]);
function createTray() {
  tray = new Tray("icon_29@2x.png");
  tray.setToolTip("Colta");
  tray.setContextMenu(trayMenu);
}

let mainMenu = new Menu.buildFromTemplate(require("./mainMenu"));

function createWindow() {
  //? Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 800,
    minHeight: 480,
    titleBarStyle: "hidden",
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });
  //? Modal box
  secondaryWindow = new BrowserWindow({
    height: 150,
    width: 800,
    parent: mainWindow,
    modal: true,
    show: false
  });
  //? splash screen
  splahWindow = new BrowserWindow({ width: 300, height: 300, transparent: true, frame: false, alwaysOnTop: true, hasShadow: false });

  //? initial html load to window
  mainWindow.loadFile("view/index.html");
  secondaryWindow.loadFile("view/modal.html");
  splahWindow.loadFile("view/splash.html");

  //? set menu
  Menu.setApplicationMenu(mainMenu);
  //? Display the modal box after two sec for 3 sec
  setTimeout(() => {
    secondaryWindow.show();
    setTimeout(() => {
      secondaryWindow.close();
      secondaryWindow = null;
    }, 3000);
  }, 5000);
  //TODO Webcontent, wc is a module of electron and need to be require, do i use it ?

  let wc = mainWindow.webContents;

  //? Closed window event
  mainWindow.on("closed", function() {
    mainWindow = null;
  });
}

//* HANDLE LAUCNH AND QUIT APP
//? Doing the folling action when app is ready
app.on("ready", () => {
  //? set tray
  createTray();
  //? set window
  createWindow();
  mainWindow.once("ready-to-show", () => {
    // Show a slapsh screen when launching the app
    setTimeout(() => {
      splahWindow.destroy();
      splahWindow = null;
      mainWindow.show();
      mainWindow.maximize();
    }, 2000);
  });
});
//? Quit when all windows are closed.
app.on("window-all-closed", function() {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function() {
  if (mainWindow === null) createWindow();
});

//* EVENTS HANDLER
//? reload the mains page with differents html page following the event
ipcMain.on("open-routine", (event) => {
  mainWindow.loadFile("view/dayli-routine.html");
});
ipcMain.on("open-hobbies", (event) => {
  mainWindow.loadFile("view/hobbies.html");
});
ipcMain.on("open-work", (event) => {
  mainWindow.loadFile("view/work.html");
});
ipcMain.on("return-menu", (event) => {
  mainWindow.loadFile("index.html");
});
