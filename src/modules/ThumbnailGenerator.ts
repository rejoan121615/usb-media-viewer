import { spawn } from "node:child_process";
import ffmpegPath from "ffmpeg-static";
import path from "node:path";
import fs from "fs-extra";

export default async function ThumbnailGenerator(
  videoPath: string,
  thumbnailPath: string,
): Promise<string> {

  await fs.ensureDir(path.dirname(thumbnailPath));

  return new Promise((resolve, reject) => {

    const ffmpeg = spawn(ffmpegPath as string, [
      "-ss", "00:00:01",
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
