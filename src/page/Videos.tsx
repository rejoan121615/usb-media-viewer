import React, { useState } from "react";
import { Box } from "@mui/material";
import VideoPlayerModal from "@/src/components/VideoPlayerModal";
import { VideoFileType, VideoWindowType } from "../types/main.types";
import VideosNavbar from "../components/VideosNavbar";
import AllVideos from "../components/AllVideos";
import VideoWithChapter from "../components/VideoWithChapter";

const Videos = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoFileType | null>(
    null,
  );
  const [currentWindow, setCurrentWindow] = useState<VideoWindowType>("all");

  const handleVideoClick = (video: VideoFileType) => {
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
