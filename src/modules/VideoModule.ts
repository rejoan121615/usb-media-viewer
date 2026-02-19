import fs from "fs-extra";
import path from "path";
import {
  ProtocolResType,
  VideoFileType,
  VideoFolderTreeType,
} from "../types/main.types";
import mime from "mime-types";
import { GetVideoDuration, ThumbnailGenerator } from "./FFmpegOperations";

const USBPath = process.cwd();
const videoFolderPath = path.join(USBPath, "..", "data", "videos");

export async function FetchVideoFiles(): Promise<ProtocolResType> {
  try {
    if (!fs.existsSync(videoFolderPath)) {
      return {
        success: false,
        message: "Video files path does not exist",
        data: null,
      };
    }

    const chapterStructure = await fs.readdir(videoFolderPath);

    if (chapterStructure.length === 0) {
      return {
        success: false,
        message: "No video files found in the directory",
        data: null,
      };
    }

    // get list of video files in each chapter folder and create video tree objects
    const videoTree: VideoFolderTreeType[] = await Promise.all(
      chapterStructure.map(async (folderName) => {
        const videoFiles = fs.readdirSync(
          path.join(videoFolderPath, folderName),
        );

        // get each file object 
        let videoFileObjects = await Promise.all(
          videoFiles
          .map(async (video) => {


            const fullVideoPath = path.join(videoFolderPath, folderName, video);
            const thumbnailPath = path.join(videoFolderPath, folderName, "thumbnails", `${path.parse(video).name}.jpg`);


            const [duration] = await Promise.all([
              GetVideoDuration(fullVideoPath),
              // fs.existsSync (thumbnailPath) ? Promise.resolve() : ThumbnailGenerator(fullVideoPath, thumbnailPath),
            ]);

            return {
              title: video,
              videoPath: fullVideoPath,
              streamUrl: `media://${encodeURIComponent(folderName)}/${encodeURIComponent(video)}`,
              thumbnail: `media://${encodeURIComponent(folderName)}/${encodeURIComponent(video)}?thumbnail=true`,
              duration: duration, // Placeholder, you can update this with actual duration if available
            };
          })
        );
        
        videoFileObjects = videoFileObjects.filter((video) => (video.title.endsWith(".mp4") ? true : false));


        return {
          folderName: folderName,
          videoFiles: videoFileObjects,
        };
      }),
    );

    // get all the videos as an array of video file objects
    const allVideos = videoTree.reduce((acc: any[], folder) => {
      return [...acc, ...folder.videoFiles];
    }, []);

    return {
      success: true,
      message: "Video files found",
      data: {
        videoTree,
        videoList: allVideos,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "An error occurred while reading video files",
      data: null,
    };
  }
}

export async function ServeVideoContent(request: Request) {
  const filePath = decodeURIComponent(request.url.replace("video://", ""));
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
}

export async function ServeThumbnailContent(request: Request) {
  const { host, pathname, searchParams } = new URL(request.url);

  const folderName = decodeURIComponent(host);
  const fileName = decodeURIComponent(
    path.parse(pathname.replace(/\/+$/, "")).name,
  );
  const thumbnailPath = path.join(
    videoFolderPath,
    folderName,
    "thumbnails",
    `${fileName}.jpg`,
  );
  const videoPath = path.join(videoFolderPath, folderName, `${fileName}.mp4`);

  console.log("thumbnail path is:", thumbnailPath);
  console.log("video path is:", videoPath);

  // Check if file exists
  if (!fs.existsSync(thumbnailPath)) {
    console.log("Thumbnail not found, generating thumbnail file ");

    const thumbnailResult = await ThumbnailGenerator(videoPath, thumbnailPath);

    console.log("Thumbnail generated:", thumbnailResult);

    // write the generated thumbnail to the actual file system for future requests
    // await fs.ensureDir(path.dirname(thumbnailPath));
    // await fs.writeFile(thumbnailPath, generatedThumbnailData as Uint8Array);

    // Clean up FFmpeg virtual file system
    // await ffmpeg.deleteFile(`${fileName}.mp4`);
    // await ffmpeg.deleteFile(`${fileName}.jpg`);

    // Return the generated thumbnail
    // const thumbnailBuffer = Buffer.from(generatedThumbnailData as Uint8Array);
    // return new Response(thumbnailBuffer as any, {
    //   status: 200,
    //   headers: {
    //     "Content-Type": "image/jpeg",
    //     "Content-Length": thumbnailBuffer.length.toString(),
    //   },
    // });
  } else {
    // No Range header, send the whole file
    const fileStream = fs.createReadStream(thumbnailPath);

    return new Response(fileStream as any, {
      status: 200,
      headers: {
        "Content-Type":
          mime.lookup(thumbnailPath) || "application/octet-stream",
        "Content-Length": fs.statSync(thumbnailPath).size.toString(),
        "Accept-Ranges": "bytes",
      },
    });
  }
}
