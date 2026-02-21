import React, { useContext } from "react";
import { VideoFileType, VideoFolderTreeType } from "../types/main.types";
import GlobalContext from "../context/GlobalContext";
import { Box, Grid, Paper, Typography } from "@mui/material";
import MediaCard from "./MediaCard";
import VideoNotFound from "./VideoNotFound";
import useFuseSearch from "../hooks/useFuseSearch";

const VideoWithChapter = ({
  handleVideoClick,
}: {
  handleVideoClick: (video: VideoFileType) => void;
}) => {
  const { videos, searchQuery } = useContext(GlobalContext);

  const filteredChapters = useFuseSearch<VideoFolderTreeType>(
    searchQuery,
    videos?.videoTree ?? [],
    { keys: ['folderName', 'videoFiles.title'], threshold: 0.3 }
  );

  return (
    <Box>
      {filteredChapters.map((chapter, index) => (
        <Box
          key={index}
          sx={{
            mb: 4,
            border: "1px solid #ccc",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              p: 2,
              backgroundColor: "#c3c3c3",
              borderBottom: "1px solid #ccc",
            }}
          >
            <Typography>Chapter: {chapter.folderName}</Typography>
          </Box>
          {chapter.videoFiles.length === 0 ? (
            <VideoNotFound />
          ) : (
            <Grid container spacing={3} sx={{ p: 3 }}>
              {chapter.videoFiles.map((video, videoIndex) => (
                <Grid size={4} key={videoIndex}>
                  <MediaCard
                    key={videoIndex}
                    title={video.title}
                    thumbnail={video.thumbnail}
                    thumbnailAlt={`Thumbnail for ${video.title}`}
                    mediaType="video"
                    videoDuration={video.duration}
                    handleClick={() => handleVideoClick(video)}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      ))}
    </Box>
  );
};

export default VideoWithChapter;
