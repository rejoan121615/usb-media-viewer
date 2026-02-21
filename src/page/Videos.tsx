import React, { useEffect, useState, useContext } from "react";
import { Typography, Box, Grid } from "@mui/material";
import MediaCard from "@/src/components/MediaCard";
import VideoPlayerModal from "@/src/components/VideoPlayerModal";
import { VideoFileType, VideoWindowType } from "../types/main.types";
import GlobalContext from "../context/GlobalContext";
import VideosNavbar from "../components/VideosNavbar";
import AllVideos from "../components/AllVideos";
import VideoWithChapter from "../components/VideoWithChapter";

const Videos = () => {
  const { videos } = useContext(GlobalContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoFileType | null>(
    null,
  );
  const [currentWindow, setCurrentWindow] = useState<VideoWindowType>("all");

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
      <VideosNavbar
        currentWindow={currentWindow}
        clickHandler={(value) => setCurrentWindow(value)}
      />

      {currentWindow === "all" ? (
        <AllVideos handleVideoClick={handleVideoClick} />
      ) : (
        <VideoWithChapter handleVideoClick={handleVideoClick} />
      )}

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
