import path from "path";
import fs from "fs-extra";
import { ServeVideoContent } from "./VideoModule";
import { ServeGalleryContent } from "./GalleryModule";
import mime from "mime-types";



const USBPath = process.cwd();
const videoFolderPath = path.join(USBPath, "..", "data", "videos");

export function ProtocolRequestHandler(request: Request) {

    const filePath = decodeURIComponent(request.url.replace("media://", ""));
    const fileMimeType = mime.lookup(filePath);

    if (fileMimeType && fileMimeType.startsWith("video/")) {
        return ServeVideoContent(request);
    } else if (fileMimeType && fileMimeType.startsWith("image/")) {
        return ServeGalleryContent(request);
    } else if (fileMimeType && fileMimeType === "application/pdf") {
        console.log("Received request for document stream:", request);
        return new Response("PDF support not implemented yet", { status: 501 });
    } else {
        console.log("Received request for unknown media type:", request);
        console.log("requested media type:", mime.lookup(filePath));
        return new Response("Unsupported media type", { status: 415 });
    }

  

}