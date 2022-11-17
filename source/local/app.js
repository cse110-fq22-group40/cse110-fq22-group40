const { app, BrowserWindow, session } = require("electron");
const path = require("path");

const loadMainWindow = () => {
  const mainWindow = new BrowserWindow({
    fullscreen: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, "../client/index.html"));

  // TypeA Important for security reasons to protect against cross-site-scripting
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": ["script-src 'self'"]
      }
    });
  });
}

app.on("ready", loadMainWindow);

/*app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});*/

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    loadMainWindow();
  }
});

app.on("before-quit", evt => {
  evt.preventDefault();
});

app.on("will-quit", evt => {
  evt.preventDefault();
});

app.on("window-all-closed", evt => {
  evt.preventDefault();
});