import React, { useEffect, useState } from "react";
import { Typography, Box, Grid } from "@mui/material";
import MediaCard from "@/src/components/MediaCard";
import VideoPlayerModal from "@/src/components/VideoPlayerModal";
import {
  VideoFileType,
  VideoDocumentType,
} from "../types/main.types";

const Videos = () => {
  const [videos, setVideos] = useState<VideoDocumentType | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoFileType | null>(
    null,
  );

  useEffect(() => {
    window.storageApi
      .videoData()
      .then((response) => {
        const { data, success, message } = response;
        if (success && data) {
          console.log("Video tree data:", data);

          if ("videoTree" in data && "videoList" in data) {
            setVideos(data as VideoDocumentType);
          }
          // setVideoList(data.videoList);
        } else {
          console.log(message);
        }
      })
      .catch((error) => {
        console.error("Error fetching video tree:", error);
      });
  }, []);

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
              handleVideoClick={() => handleVideoClick(video)}
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
