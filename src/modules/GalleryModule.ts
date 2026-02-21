import path from "path";
import { FileType, ProtocolResType } from "../types/main.types";
import fs from "fs-extra";
import mime from "mime-types";

const USBDrive = process.cwd();
const galleryPath = path.join(USBDrive, "..", "data", "gallery");

export function FetchGalleryFiles(): Promise<ProtocolResType> {
  // if path not exist, return error message
  if (!fs.existsSync(galleryPath)) {
    fs.ensureDirSync(galleryPath);
  }

  // read all files in the gallery directory and return an array of file paths
  const RawGalleryFiles: string[] = fs.readdirSync(galleryPath);

  if (RawGalleryFiles.length === 0) {
    return Promise.resolve<ProtocolResType>({
      success: false,
      message: "No gallery files found in the data/gallery folder",
      data: null,
    });
  } else {
    const galleryFiles: FileType[] = RawGalleryFiles.map((file) => {
      return {
        title: file,
        filePath: path.join(galleryPath, file),
        streamUrl: `media://${encodeURIComponent(file)}`,
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
}

export async function ServeGalleryContent(request: Request) {
  const filePath = decodeURIComponent(
    request.url.replace("media://", "").replace(/\/+$/, ""),
  );
  const fullPath = path.join(galleryPath, filePath);

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
