import fs from 'fs-extra';
import path from 'path';
import { VideoApiRes, VideoTree } from '../types/main.types';

export async function ReadVideoFiles() : Promise<VideoApiRes> {
    try {
        const USBPath = process.cwd();
        const videoFilesPath = path.join(USBPath, '..','data','videos');


        if (!fs.existsSync(videoFilesPath)) {
           return {
               success: false,
               message: 'Video files path does not exist',
               data: null
           }
        }        

        const chapterStructure = await fs.readdir(videoFilesPath);

        if (chapterStructure.length === 0) {
            return {
                success: false,
                message: 'No video files found in the directory',
                data: null
            }
        }

        // get list of video files in each chapter folder and create video tree objects 
        const videoTree : VideoTree[] = chapterStructure.map(folderName => {
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

        // get all the videos as an array of video file objects
        const allVideos = videoTree.reduce((acc: any[], folder) => {
            return [...acc, ...folder.VideoFiles]
        }, []);


        return {
            success: true,
            message: 'Video files found',
            data: {
                videoTree,
                videoList: allVideos
            }
        };
    } catch (error) {
        return {
            success: false,
            message: 'An error occurred while reading video files',
            data: null
        }
    }
}