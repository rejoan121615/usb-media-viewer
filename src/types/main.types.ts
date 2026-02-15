export type VideoFile = {
    title: string
    videoPath: string
    streamUrl: string
}

export type VideoTree = {
    folderName: string,
    videoFiles: VideoFile[]
}

export type VideoApiRes = {
    success: boolean
    message: string
    data: {
        videoTree: VideoTree[]
        videoList: VideoFile[]
    } | null
}

export type IPCTypes = 'video-tree';
