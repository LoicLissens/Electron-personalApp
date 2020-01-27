const { remote, BrowserWindow, webFrame, ipcRenderer } = require("electron");
const { dialog } = remote;
window.addEventListener("DOMContentLoaded", () => {
  // Get dom element
  const $routineBox = document.getElementById("routine-box");
  const $hobbiesBox = document.getElementById("hobbies-box");
  const $workBox = document.getElementById("work-box");
  const $logo = document.getElementById("logo");

  $logo.addEventListener("click", () => {
    ipcRenderer.send("return-menu");
  });
  $routineBox.addEventListener("click", () => {
    ipcRenderer.send("open-routine");
  });
  $hobbiesBox.addEventListener("click", () => {
    ipcRenderer.send("open-hobbies");
  });
  $workBox.addEventListener("click", () => {
    ipcRenderer.send("open-work");
  });
});
