//* Modules to control application life and create native browser window
const { app, BrowserWindow, webContents, session, Menu, MenuItem, Tray } = require("electron");
const path = require("path");

//! Keep a global reference of the window object, if you don't, the window will
//! be closed automatically when the JavaScript object is garbage collected.
let mainWindow, secondaryWindow, tray;

function createTray() {
  tray = new Tray("icon_29@2x.png");
  tray.setToolTip("DevHub");
}

let mainMenu = new Menu.buildFromTemplate(require("./mainMenu"));

function createWindow() {
  //* set tray
  createTray();
  //* Define a custom session to store with a partition in the memory
  //session is a module of electron need ot be required
  let getCookies = () => {
    let sess = session.defaultSession;
    sess.cookies.get({}, (err, cookies) => {
      console.log(cookies);
    });
  };
  //* Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 800,
    minHeight: 480,
    titleBarStyle: "hidden",
    webPreferences: {
      preload: path.join(__dirname, "preload.js")
    }
  });
  secondaryWindow = new BrowserWindow({
    height: 150,
    width: 800,
    parent: mainWindow,
    modal: true,
    show: false
  });

  //* and load the index.html of the app.
  mainWindow.loadFile("index.html");

  secondaryWindow.loadFile("modal.html");
  //* menu
  Menu.setApplicationMenu(mainMenu);

  setTimeout(() => {
    secondaryWindow.show();
    setTimeout(() => {
      secondaryWindow.close();
      secondaryWindow = null;
    }, 3000);
  }, 2000);
  //* Webcontent, wc is a module of electron and need to be require
  let wc = mainWindow.webContents;

  //* Emitted when the window is closed.
  mainWindow.on("closed", function() {
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  console.log("app ready");
  console.log(app.getPath("desktop"));
  console.log(app.getPath("music"));
  console.log(app.getPath("temp"));
  console.log(app.getPath("userData"));

  createWindow();
  mainWindow.maximize();
});

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
