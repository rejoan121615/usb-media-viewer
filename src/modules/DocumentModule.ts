import path from "path";
import { FileType, ProtocolResType } from "../types/main.types";
import fs from "fs-extra";

const USBDrive = process.cwd();

export function FetchDocumentFiles(): Promise<ProtocolResType> {
  const documentsPath = path.join(USBDrive, "..", "data", "documents");

  // if path not exist, return error message
  if (!fs.existsSync(documentsPath)) {
    return Promise.resolve<ProtocolResType>({
      success: false,
      message: "Documents path does not exist",
      data: null,
    });
  }

  // read all files in the documents directory and return an array of file paths
  const documentFiles: FileType[] = fs
    .readdirSync(documentsPath)
    .map((file) => {
      return {
        title: file,
        filePath: path.join(documentsPath, file),
        streamUrl: `file://${encodeURIComponent(file)}`,
      };
    })
    .filter((file) => {
      const ext = path.extname(file.title).toLowerCase();
      return ext === ".pdf";
    });

  return Promise.resolve<ProtocolResType>({
    success: true,
    message: "Documents found",
    data: documentFiles,
  });
}
