import path from "path";
import { FileType, ProtocolResType } from "../types/main.types";
import fs from "fs-extra";

const USBDrive = process.cwd();

export function FetchGalleryFiles(): Promise<ProtocolResType> {
  const galleryPath = path.join(USBDrive, "..", "data", "gallery");

  // if path not exist, return error message
  if (!fs.existsSync(galleryPath)) {
    return Promise.resolve<ProtocolResType>({
      success: false,
      message: "Gallery path does not exist",
      data: null,
    });
  }

  // read all files in the gallery directory and return an array of file paths
  const galleryFiles: FileType[] = fs.readdirSync(galleryPath).map((file) => {
    return {
      title: file,
      filePath: path.join(galleryPath, file),
      streamUrl: `file://${encodeURIComponent(file)}`,
    };
  }).filter((file) => {
    const ext = path.extname(file.title).toLowerCase();
    return ext === ".jpg" || ext === ".jpeg" || ext === ".png";
  });

  return Promise.resolve<ProtocolResType>({
    success: true,
    message: "Gallery files found",
    data: galleryFiles,
  });
}
