import { app, BrowserWindow, ipcMain, protocol } from "electron";
import path from "path";
import started from "electron-squirrel-startup";
import { ReadVideoFiles, streamVideo } from "./modules/ReadVideos";
import { IPCTypes } from "./types/main.types";
import { pathToFileURL } from "url";
import fs from "fs";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
    );
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
// ipcMain.handle('read-video-files', ReadVideoFiles);
// ReadVideoFiles();
ipcMain.handle("video-tree" as IPCTypes, ReadVideoFiles);

// register protocol handler for video files

protocol.registerSchemesAsPrivileged([
  {
    scheme: "media",
    privileges: {
      standard: true,
      secure: true,
      supportFetchAPI: true,
      stream: true,
      bypassCSP: true,
    },
  },
]);

app
  .whenReady()
  .then(() => {
    protocol.handle("media", async (request) => {
      const USBPath = process.cwd();
      const videoFolderPath = path.join(USBPath, "..", "data", "videos");
      const filePath = decodeURIComponent(request.url.replace("media://", ""));
      const fullPath = path.join(videoFolderPath, filePath);

      // Check if file exists
      if (!fs.existsSync(fullPath)) {
        return new Response("File not found", { status: 404 });
      }

      const stat = fs.statSync(fullPath);
      const fileSize = stat.size;
      const range = request.headers.get("range");

      if (range) {
        // Parse Range header, e.g. "bytes=12345-"
        const match = range.match(/bytes=(\d+)-(\d*)/);
        if (match) {
          const start = parseInt(match[1], 10);
          const end = match[2] ? parseInt(match[2], 10) : fileSize - 1;
          const chunkSize = end - start + 1;

          const fileStream = fs.createReadStream(fullPath, { start, end });

          return new Response(fileStream as any, {
            status: 206,
            headers: {
              "Content-Range": `bytes ${start}-${end}/${fileSize}`,
              "Accept-Ranges": "bytes",
              "Content-Length": chunkSize.toString(),
              "Content-Type": "video/mp4", // Adjust if you support other formats
            },
          });
        }
      }

      // No Range header, send the whole file
      const fileStream = fs.createReadStream(fullPath);
      return new Response(fileStream as any, {
        status: 200,
        headers: {
          "Content-Length": fileSize.toString(),
          "Content-Type": "video/mp4", // Adjust if you support other formats
          "Accept-Ranges": "bytes",
        },
      });
    });
  })
  .catch((error) => {
    console.error("Error registering protocol handler:", error);
  });
