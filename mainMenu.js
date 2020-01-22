module.exports = [
  {
    label: "Devhub",
    submenu: [{ label: "Devhub1" }, { label: "Devhub2", submenu: [{ label: "love chris" }] }, { label: "Devhub3", submenu: [{ label: "and louis" }] }]
  },
  {
    label: "Brice",
    submenu: [
      { label: "arn0" },
      { label: "Du", enabled: false },
      { label: "Passage" },
      { label: "DevTools", accelerator: "Fn+F12", role: "toggleDevTools" },
      { role: "toggleFullScreen" }
    ]
  },
  {
    label: "Edit",
    role: "editMenu"
  },
  {
    label: "View",
    role: "viewMenu"
  }
];
