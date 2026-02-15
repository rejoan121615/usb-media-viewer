import fs from 'fs-extra';
import path from 'path';
import { VideoApiRes, VideoTree } from '../types/main.types';


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
                    streamUrl: `media://${encodeURIComponent(folderName)}/${encodeURIComponent(video)}`
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
      console.error('Security error: File path outside video folder');
      return new Response('Not found', { status: 404 });
    }

    if (!fs.existsSync(filePath)) {
      console.error('File not found:', filePath);
      return new Response('Not found', { status: 404 });
    }

    try {
      // Read the file as a buffer
      const videoBuffer = await fs.readFile(filePath);

      return new Response(videoBuffer, {
        status: 200,
        headers: {
          'Content-Type': 'video/mp4',
          'Content-Length': videoBuffer.length.toString(),
          'Accept-Ranges': 'bytes'
        }
      });
    } catch (error) {
      console.error('Error streaming video:', error);
      return new Response('Failed to stream video', { status: 500 });
    }
}