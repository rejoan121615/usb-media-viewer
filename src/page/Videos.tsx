import React, { useEffect, useState, useContext } from "react";
import { Typography, Box, Grid } from "@mui/material";
import MediaCard from "@/src/components/MediaCard";
import VideoPlayerModal from "@/src/components/VideoPlayerModal";
import {
  VideoFileType,
} from "../types/main.types";
import GlobalContext from "../context/GlobalContext";


const Videos = () => {
  const { videos } = useContext(GlobalContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoFileType | null>(
    null,
  );


  const handleVideoClick = (video: VideoFileType) => {
    console.log("Playing video:", video);
    setSelectedVideo(video);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <Box>
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        fontWeight="bold"
        sx={{ mb: 3 }}
      >
        Video Library
      </Typography>

      <Grid container spacing={3}>
        {videos?.videoList.map((video, index) => (
          <Grid size={4} key={index}>
            <MediaCard
              key={index}
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

      {/* Video Player Modal */}
      <VideoPlayerModal
        open={modalOpen}
        onClose={handleCloseModal}
        video={selectedVideo as VideoFileType}
      />
    </Box>
  );
};

export default Videos;
