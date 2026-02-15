export type VideoFile = {
    Title: string
    VideoUrl: string
}

export type VideoTree = {
    FolderName: string,
    VideoFiles: VideoFile[]
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
