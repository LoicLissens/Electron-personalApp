const { remote, BrowserWindow } = require("electron");
const { dialog } = remote;

document.getElementById("lol").addEventListener("click", () => {
  console.log("lol");
});
