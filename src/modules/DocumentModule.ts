import path from "path";
import { FileType, ProtocolResType } from "../types/main.types";
import fs from "fs-extra";
import mime from "mime-types";
import { USBRootPath, documentFolderPath } from '../utils/PathList'


export function FetchDocumentFiles(): Promise<ProtocolResType> {
  // if path not exist, return error message
  if (!fs.existsSync(documentFolderPath)) {
    fs.ensureDirSync(documentFolderPath);
  }

  // read all files in the documents directory and return an array of file paths
  const rawFiles: string[] = fs.readdirSync(documentFolderPath);

  if (rawFiles.length === 0) {
    return Promise.resolve<ProtocolResType>({
      success: false,
      message: "No documents found in the data/documents path",
      data: null,
    });
  } else {
    const documentFiles: FileType[] = rawFiles
      .map((file) => {
        return {
          title: file,
          filePath: path.join(documentFolderPath, file),
          streamUrl: `media://${encodeURIComponent(file)}`,
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
}

export async function ServeDocumentContent(request: Request) {
  const filePath = decodeURIComponent(
    request.url.replace("media://", "").replace(/\/+$/, ""),
  );
  const fullPath = path.join(documentFolderPath, filePath);

  // Check if file exists
  if (!fs.existsSync(fullPath)) {
    return new Response("File not found", { status: 404 });
  }

  // No Range header, send the whole file
  const fileStream = fs.createReadStream(fullPath);

  return new Response(fileStream as any, {
    status: 200,
    headers: {
      "Content-Type": mime.lookup(fullPath) || "application/octet-stream",
      "Content-Length": fs.statSync(fullPath).size.toString(),
      "Accept-Ranges": "bytes",
    },
  });
}
