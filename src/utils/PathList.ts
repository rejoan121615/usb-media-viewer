import { app } from "electron";
import path from "path";

export const USBRootPath = (): string => {
  if (app.isPackaged) {
    if (process.platform === "darwin") {
      return path.join(process.execPath, "..", "..", "..");
    } else {
      return process.cwd();
    }
  } else {
    return process.cwd();
  }
};

export const videoFolderPath: string = path.join(USBRootPath(),'data', "videos");
export const fileFolderPath: string = path.join(USBRootPath(), 'data', "thumbnails");
export const galleryFolderPath: string = path.join(USBRootPath(), 'data', "gallery");
export const documentFolderPath: string = path.join(USBRootPath(), 'data', "documents");