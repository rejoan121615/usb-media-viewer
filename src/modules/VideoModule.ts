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
      fs.ensureDirSync(videoFolderPath);
    }

    const RootFilesAndFolders = await fs.readdir(videoFolderPath);

    const FilesFromRoot: VideoFileType[] = await Promise.all(
      RootFilesAndFolders.filter((item) =>
        fs.statSync(path.join(videoFolderPath, item)).isFile(),
      ).map(async (file) => {

        const fullVideoPath = path.join(videoFolderPath, file);
        const thumbnailPath = path.join(videoFolderPath, "thumbnails", `${path.parse(file).name}.jpg`);

        const [duration] = await Promise.all([
          GetVideoDuration(fullVideoPath),
          fs.existsSync(thumbnailPath)
            ? Promise.resolve()
            : ThumbnailGenerator(fullVideoPath, thumbnailPath),
        ]);

        return {
          title: file,
          videoPath: fullVideoPath,
          streamUrl: `media://${encodeURIComponent(file)}`,
          thumbnail: `media://${encodeURIComponent(file)}?thumbnail=true`,
          duration: duration,
        };
      }),
    );

    const FoldersFromRoot = RootFilesAndFolders.filter((item) =>
      fs.statSync(path.join(videoFolderPath, item)).isDirectory(),
    );

    if (RootFilesAndFolders.length === 0) {
      return {
        success: false,
        message: `No video files found in the directory, current path: ${videoFolderPath}`,
        data: null,
      };
    }

    // get list of video files in each chapter folder and create video tree objects
    const videoTree: VideoFolderTreeType[] = await Promise.all(
      FoldersFromRoot.map(async (folderName) => {
        const videoFiles = fs.readdirSync(
          path.join(videoFolderPath, folderName),
        );

        // get each file object
        let videoFileObjects = await Promise.all(
          videoFiles
            .filter((file) => file.endsWith(".mp4"))
            .map(async (video) => {
              const fullVideoPath = path.join(
                videoFolderPath,
                folderName,
                video,
              );
              const thumbnailPath = path.join(
                videoFolderPath,
                folderName,
                "thumbnails",
                `${path.parse(video).name}.jpg`,
              );

              const [duration] = await Promise.all([
                GetVideoDuration(fullVideoPath),
                fs.existsSync(thumbnailPath)
                  ? Promise.resolve()
                  : ThumbnailGenerator(fullVideoPath, thumbnailPath),
              ]);

              return {
                title: video,
                videoPath: fullVideoPath,
                streamUrl: `media://${encodeURIComponent(folderName)}/${encodeURIComponent(video)}`,
                thumbnail: `media://${encodeURIComponent(folderName)}/${encodeURIComponent(video)}?thumbnail=true`,
                duration: duration, // Placeholder, you can update this with actual duration if available
              };
            }),
        );

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
        videoTree: [
          { folderName: "In The main folder", videoFiles: FilesFromRoot },
          ...videoTree,
        ],
        videoList: [...FilesFromRoot, ...allVideos],
      },
    };
  } catch (error) {
    return {
      success: false,
      message: `An error occurred while reading video files: ${error}`,
      data: null,
    };
  }
}

export async function ServeVideoContent(request: Request) {
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
}

export async function ServeThumbnailContent(request: Request) {
  const { host, pathname } = new URL(request.url);

  const folderName = decodeURIComponent(host);
  const fileName = decodeURIComponent(
    path.parse(pathname.replace(/\/+$/, "")).name,
  );

if (folderName.endsWith(".mp4")) {

  const folderNameAsFile =  decodeURIComponent(
    path.parse(folderName.replace(/\/+$/, "")).name,
  );

  const thumbnailPath = path.join(
    videoFolderPath,
    "thumbnails",
    `${folderNameAsFile}.jpg`,
  );
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


  const thumbnailPath = path.join(
    videoFolderPath,
    folderName,
    "thumbnails",
    `${fileName}.jpg`,
  );

  // Check if file exists
  if (!fs.existsSync(thumbnailPath)) {
    return new Response("Thumbnail not found", { status: 404 });
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
