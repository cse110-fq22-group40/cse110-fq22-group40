const { app, BrowserWindow, session } = require("electron");
const path = require("path");

const loadMainWindow = () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
<<<<<<< HEAD
      contextIsolation: false
      /*devTools: false*/
=======
      contextIsolation: false,
      devTools: true
>>>>>>> 314d7d213c2fd39dd66caa9eae887629b91ce88d
    }
  });

  mainWindow.maximize();
  mainWindow.show();
  mainWindow.loadFile(path.join(__dirname, "../client/index.html"));

  // TypeA Important for security reasons to protect against cross-site-scripting
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": ["script-src 'self' 'unsafe-inline'"]
      }
    });
  });
}

app.on("ready", loadMainWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    loadMainWindow();
  }
});
