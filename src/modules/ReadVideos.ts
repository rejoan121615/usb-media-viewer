import fs from "fs-extra";
import path from "path";
import { VideoApiRes, VideoTree } from "../types/main.types";

const USBPath = process.cwd();
const videoFolderPath = path.join(USBPath, "..", "data", "videos");

export async function ReadVideoFiles(): Promise<VideoApiRes> {
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
    const videoTree: VideoTree[] = chapterStructure.map((folderName) => {
      const videoFiles = fs.readdirSync(path.join(videoFolderPath, folderName));
      const videoFileObjects = videoFiles
        .map((video) => {
          return {
            title: video,
            videoPath: path.join(videoFolderPath, folderName, video),
            streamUrl: `media://${encodeURIComponent(folderName)}/${encodeURIComponent(video)}`,
          };
        })
        .filter((video) => (video.title.endsWith(".mp4") ? true : false));

      return {
        folderName: folderName,
        videoFiles: videoFileObjects,
      };
    });

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

export async function streamVideo(request: Request) {
  const USBPath = process.cwd();
  const videoFolderPath = path.join(USBPath, "..", "data", "videos");
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
