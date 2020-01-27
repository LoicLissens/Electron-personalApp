module.exports = [
  {
    label: "Colta",
    submenu: [{ label: "Colta1" }, { label: "Colta2", submenu: [{ label: "love chris" }] }, { label: "Colta", submenu: [{ label: "and louis" }] }]
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
