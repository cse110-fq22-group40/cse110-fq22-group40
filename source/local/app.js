/**
 * This file is the entry point of the program and manages the basic lifecycle
 * of the application.
 */
const { app, BrowserWindow, session } = require("electron");
const path = require("path");

const loadMainWindow = () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true
    }
  });

  mainWindow.maximize();
  mainWindow.show();
  mainWindow.loadFile(path.join(__dirname, "../client/index.html"));

  //TypeA Important for security reasons to protect against 
  //cross-site-scripting
  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": ["script-src 'self' 'unsafe-inline'"]
      }
    });
  });
}

// Load the main window after Electron has finished initializing
app.on("ready", loadMainWindow);

// Quit when all windows are closed
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// Reload the main window when activating the application with no
// other windows open.
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    loadMainWindow();
  }
});
