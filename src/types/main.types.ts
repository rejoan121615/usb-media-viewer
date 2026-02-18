export type VideoFileType = {
    title: string
    videoPath: string
    streamUrl: string
    thumbnail: string
    duration?: string
}

export type VideoFolderTreeType = {
    folderName: string,
    videoFiles: VideoFileType[]
}

export type FileType = {
    title: string
    filePath: string
    streamUrl: string
}

export type VideoDocumentType = {
        videoTree: VideoFolderTreeType[]
        videoList: VideoFileType[]
    }

export type ProtocolResType = {
    success: boolean
    message: string
    data: VideoDocumentType | FileType[] | null
}

export type IPCTypes = 'video-tree' | 'documents' | "gallery";
