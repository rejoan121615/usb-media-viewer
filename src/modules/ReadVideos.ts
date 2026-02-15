import fs from 'fs-extra';
import path from 'path';
import { ApiResponse, VideoChapter } from '../types/main.types';

export async function ReadVideoFiles() : Promise<ApiResponse> {
    try {
        const USBPath = process.cwd();
        const videoFilesPath = path.join(USBPath, '..','data','videos');


        if (!fs.existsSync(videoFilesPath)) {
           return {
               success: false,
               message: 'Video files path does not exist',
               data: []
           }
        }        

        const chapterStructure = await fs.readdir(videoFilesPath);

        if (chapterStructure.length === 0) {
            return {
                success: false,
                message: 'No video files found in the directory',
                data: []
            }
        }

        const videoTree : VideoChapter[] = chapterStructure.map(folderName => {
            const videoFiles = fs.readdirSync(path.join(videoFilesPath, folderName));
            const videoFileObjects = videoFiles.map((video) => {
                return {
                    Title: video,
                    VideoUrl: path.join(videoFilesPath, folderName, video)
                }
            }).filter(video => video.Title.endsWith('.mp4') ? true : false);

            return {
                FolderName: folderName,
                VideoFiles: videoFileObjects
            }
        });

        console.log("Video folders found:", videoTree);

        return {
            success: true,
            message: 'Video files found',
            data: videoTree
        };
    } catch (error) {
        return {
            success: false,
            message: 'An error occurred while reading video files',
            data: []
        }
    }
}