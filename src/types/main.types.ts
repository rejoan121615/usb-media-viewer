export type VideoFile = {
    Title: string
    VideoUrl: string
}

export type VideoChapter = {
    FolderName: string,
    VideoFiles: VideoFile[]
}

export type ApiResponse = {
    success: boolean
    message: string
    data: VideoChapter[]
}

export type IPCTypes = 'video-tree';
