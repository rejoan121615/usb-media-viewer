import path from "path";
import { ServeThumbnailContent, ServeVideoContent } from "./VideoModule";
import { ServeGalleryContent } from "./GalleryModule";
import mime from "mime-types";
import { ServeDocumentContent } from "./DocumentModule";


export function ProtocolRequestHandler(request: Request) {
    const {host, pathname, search, searchParams, } = new URL(request.url);
    const filePath = decodeURIComponent(path.join(host, pathname));
    const fileMimeType = mime.lookup(filePath);

    if (fileMimeType && fileMimeType.startsWith("video/") && searchParams.has("thumbnail")) {
       
        return ServeThumbnailContent(request);
    } else if (fileMimeType && fileMimeType.startsWith("video/")) {
   
        return ServeVideoContent(request);
    } else if (fileMimeType && fileMimeType.startsWith("image/")) {
      
        return ServeGalleryContent(request);
    } else if (fileMimeType && fileMimeType === "application/pdf") {
        
        return ServeDocumentContent(request);
    } else {
        return new Response("Unsupported media type", { status: 415 });
    }

  

}