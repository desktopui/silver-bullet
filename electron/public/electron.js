const electron = require("electron");
const { app, protocol, session, ipcMain } = electron;
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

function setAuthorizationHeader(token) {
  const filter = {
    urls: ["http://*/*", "https://*/*"]
  };
  session.defaultSession.webRequest.onBeforeSendHeaders(
    filter,
    (details, callback) => {
      if (
        details.resourceType === "image" &&
        details.url.indexOf("files.slack") > -1
      ) {
        const requestHeaders = {
          ...details.requestHeaders,
          ...{
            ["Authorization"]: `Bearer ${token}`
          }
        };
        callback({ cancel: false, requestHeaders });
      } else {
        callback({ cancel: false });
      }
    }
  );
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    webPreferences: { webSecurity: false },
    titleBarStyle: "hidden"
  });
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

  ipcMain.on("set-auth-header", (event, token) => {
    setAuthorizationHeader(token);
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

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});
