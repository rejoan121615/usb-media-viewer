import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import path from "node:path";
import fs from "fs-extra";
import { app } from "electron";
import { VideoDuration } from "../types/main.types";

const _require = createRequire(import.meta.url);

/**
 * Resolve the ffmpeg binary path.
 * - In development: use ffmpeg-static directly.
 * - In production (packaged): ffmpeg-static is unpacked from the asar into
 *   app.asar.unpacked/node_modules/ffmpeg-static/, so we build the path manually.
 */
function getFfmpegPath(): string {
  if (app.isPackaged) {
    const ext = process.platform === "win32" ? ".exe" : "";
    return path.join(
      process.resourcesPath,
      "app.asar.unpacked",
      "node_modules",
      "ffmpeg-static",
      `ffmpeg${ext}`
    );
  }
  return _require("ffmpeg-static") as string;
}

const ffmpegPath: string = getFfmpegPath();

export async function ThumbnailGenerator(
  videoPath: string,
  thumbnailPath: string,
): Promise<string> {

  await fs.ensureDir(path.dirname(thumbnailPath));

  return new Promise((resolve, reject) => {

    const ffmpeg = spawn(ffmpegPath as string, [
      "-ss", "00:00:03",
      "-i", videoPath,
      "-vframes", "1",
      "-y", // overwrite if exists
      thumbnailPath,
    ]);

    ffmpeg.stderr.on("data", (data) => {
      console.log(data.toString());
    });

    ffmpeg.on("error", reject);

    ffmpeg.on("close", (code) => {
      if (code === 0) resolve(thumbnailPath);
      else reject(new Error(`FFmpeg exited with code ${code}`));
    });
  });
}



export async function GetVideoDuration(videoPath: string): Promise<VideoDuration> {
  return new Promise((resolve) => {
    const ffmpeg = spawn(ffmpegPath as string, ["-i", videoPath]);
    let stderr = "";

    ffmpeg.stderr.on("data", (data) => {
      stderr += data.toString();
    });

    ffmpeg.on("close", () => {
      // Duration line looks like: "  Duration: 01:23:45.67, start: ..."
      const match = stderr.match(/Duration:\s*(\d{2}):(\d{2}):(\d{2})/);
      if (match) {
        const hours = parseInt(match[1], 10);
        const minutes = parseInt(match[2], 10);
        const seconds = parseInt(match[3], 10);

        // Roll hours into minutes
        const totalMinutes = hours * 60 + minutes;

        resolve({
          minutes: String(totalMinutes).padStart(2, "0"),
          seconds: String(seconds).padStart(2, "0"),
        });
      } else {
        resolve({ minutes: "00", seconds: "00" });
      }
    });

    ffmpeg.on("error", () => resolve({ minutes: "00", seconds: "00" }));
  });
}




