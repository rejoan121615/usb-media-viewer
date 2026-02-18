import path from "path";
import fs from "fs-extra";
import { ServeThumbnailContent, ServeVideoContent } from "./VideoModule";
import { ServeGalleryContent } from "./GalleryModule";
import mime from "mime-types";


export function ProtocolRequestHandler(request: Request) {

    const {host, pathname, search, searchParams, } = new URL(request.url);
    const filePath = decodeURIComponent(path.join(host, pathname));
    const fileMimeType = mime.lookup(filePath);

    if (fileMimeType && fileMimeType.startsWith("video/") && searchParams.has("thumbnail")) {
        console.log("Received request for video thumbnail:");
        return ServeThumbnailContent(request);
    } else if (fileMimeType && fileMimeType.startsWith("video/")) {
        console.log("Recived request for video content");
        return ServeVideoContent(request);
    } else if (fileMimeType && fileMimeType.startsWith("image/")) {
        console.log("Recived request for gallery content");
        return ServeGalleryContent(request);
    } else if (fileMimeType && fileMimeType === "application/pdf") {
        console.log("Recived request for PDF content");
        return new Response("PDF support not implemented yet", { status: 501 });
    } else {
        return new Response("Unsupported media type", { status: 415 });
    }

  

}