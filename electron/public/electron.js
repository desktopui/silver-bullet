const electron = require("electron");
console.log(electron);
const { app, protocol } = electron;
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const url = require("url");
const isDev = require("electron-is-dev");

let mainWindow;

function devToolsLog(s) {
  console.log(s);
  if (mainWindow && mainWindow.webContents) {
    mainWindow.webContents.executeJavaScript(`console.log("${s}")`);
  }
}

function createWindow() {
  mainWindow = new BrowserWindow({ width: 900, height: 680 });
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));

  devToolsLog("process args " + process.argv.join(","));

  app.setAsDefaultProtocolClient("sbelectron");

  app.on("open-url", (event, url) => {
    event.preventDefault();
    devToolsLog(url);
    mainWindow.webContents.send("oauth-callback", url);
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  } else {
    mainWindow = null;
  }
});

app.on("activate", function() {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
