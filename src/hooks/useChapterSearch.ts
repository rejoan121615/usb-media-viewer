import { useMemo } from "react";
import Fuse from "fuse.js";
import { VideoFolderTreeType } from "../types/main.types";
import useFuseSearch from "./useFuseSearch";

function useChapterSearch(
  query: string,
  videoTree: VideoFolderTreeType[]
): VideoFolderTreeType[] {
  // Use useFuseSearch for folder-name matching
  const folderMatches = useFuseSearch<VideoFolderTreeType>(query, videoTree, {
    keys: ["folderName"],
    threshold: 0.3,
  });

  const result = useMemo<VideoFolderTreeType[]>(() => {
    if (!query.trim()) return videoTree;

    const folderMatchNames = new Set(folderMatches.map((c) => c.folderName));

    const output: VideoFolderTreeType[] = [];

    for (const chapter of videoTree) {
      if (folderMatchNames.has(chapter.folderName)) {
        // Folder name matched → include chapter with all its videos
        output.push(chapter);
      } else {
        // Check for matching videos within the chapter
        // (can't call useFuseSearch in a loop, so we use Fuse directly here)
        const fuseVideo = new Fuse(chapter.videoFiles, {
          keys: ["title"],
          threshold: 0.3,
        });
        const matchedVideos = fuseVideo.search(query).map((r) => r.item);
        if (matchedVideos.length > 0) {
          // Video title matched → include chapter with only matching videos
          output.push({ ...chapter, videoFiles: matchedVideos });
        }
        // No match → chapter hidden entirely
      }
    }

    return output;
  }, [query, videoTree, folderMatches]);

  return result;
}

export default useChapterSearch;
