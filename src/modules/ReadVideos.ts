import fs from 'fs-extra';
import path from 'path';
import { VideoApiRes, VideoTree } from '../types/main.types';
import { lookup } from 'mime-types'
import { net } from 'electron'


const USBPath = process.cwd();
const videoFolderPath = path.join(USBPath, '..','data','videos');

export async function ReadVideoFiles() : Promise<VideoApiRes> {
    try {


        if (!fs.existsSync(videoFolderPath)) {
           return {
               success: false,
               message: 'Video files path does not exist',
               data: null
           }
        }        

        const chapterStructure = await fs.readdir(videoFolderPath);

        if (chapterStructure.length === 0) {
            return {
                success: false,
                message: 'No video files found in the directory',
                data: null
            }
        }

        // get list of video files in each chapter folder and create video tree objects 
        const videoTree : VideoTree[] = chapterStructure.map(folderName => {
            const videoFiles = fs.readdirSync(path.join(videoFolderPath, folderName));
            const videoFileObjects = videoFiles.map((video) => {

                return {
                    title: video,
                    videoPath: path.join(videoFolderPath, folderName, video),
                    streamUrl: `media://${folderName}/${video}`
                }
            }).filter(video => video.title.endsWith('.mp4') ? true : false);

            return {
                folderName: folderName,
                videoFiles: videoFileObjects
            }
        });

        // get all the videos as an array of video file objects
        const allVideos = videoTree.reduce((acc: any[], folder) => {
            return [...acc, ...folder.videoFiles]
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


export async function streamVideo(request: Request) {
      // Get the relative path from the media:// URL
    const urlPath = decodeURIComponent(request.url.replace('media://', ''));
    const filePath = path.join(videoFolderPath, urlPath);

    // Security: Only allow access within the video folder
    if (!filePath.startsWith(videoFolderPath)) {
      return new Response('Not found', { status: 404 });
    }

    if (!fs.existsSync(filePath)) {
      return new Response('Not found', { status: 404 });
    }

    try {
      // Stream the file using fs-extra's createReadStream
      const videoStream = fs.createReadStream(filePath);
      const mimeType = lookup(filePath) || 'application/octet-stream';

      return new Response(videoStream as any, {
        status: 200,
        headers: {
          'Content-Type': mimeType,
          'Accept-Ranges': 'bytes'
        }
      });
    } catch (error) {
      return new Response('Failed to stream video', { status: 500 });
    }
}