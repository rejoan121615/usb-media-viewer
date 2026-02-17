import React, { useRef, useEffect } from "react";
import { Modal, Box, IconButton } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { VideoFileType } from "../types/main.types";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
  defaultLayoutIcons,
  DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";

interface VideoPlayerModalProps {
  open: boolean;
  onClose: () => void;
  video: VideoFileType;
}


const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ open, onClose, video }) => {
  const playerRef = useRef<any>(null);

  useEffect(() => {
    if (open && playerRef.current && video) {
      // Play the video
      playerRef.current.play?.();
      // Request fullscreen
      const container = playerRef.current?.container || playerRef.current;
      if (container?.requestFullscreen) {
        container.requestFullscreen().catch(() => {});
      } else if (container?.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      }
    }
  }, [open, video]);

  const handleClose = () => {
    if (playerRef.current) {
      playerRef.current.pause?.();
      // Exit fullscreen if open
      if (document.fullscreenElement) {
        document.exitFullscreen?.();
      }
    }
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.95)",
      }}
      slotProps={{
        backdrop: {
          timeout: 500,
          sx: {
            animation: "fadeIn 0.3s ease-in-out",
            "@keyframes fadeIn": {
              from: { opacity: 0 },
              to: { opacity: 1 },
            },
          },
        },
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          outline: "none",
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 20,
            right: 20,
            color: "white",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            "&:hover": {
              backgroundColor: "rgba(0, 0, 0, 0.7)",
            },
            zIndex: 1,
            animation: "slideInFromTop 0.4s ease-out",
            "@keyframes slideInFromTop": {
              from: {
                opacity: 0,
                transform: "translateY(-20px)",
              },
              to: {
                opacity: 1,
                transform: "translateY(0)",
              },
            },
          }}
        >
          <IoClose size={32} />
        </IconButton>

        {/* Video Player */}
        {video ? (
          <MediaPlayer
            ref={playerRef}
            title={video.title}
            src={`${video.streamUrl}`}
            // src={'hello://localhost:3000/video/Chapter%201/Video%201.mp4'}
            autoPlay
          >
            <MediaProvider />
            <DefaultVideoLayout
              thumbnails="video-thumbnails.jpg"
              icons={defaultLayoutIcons}
            />
          </MediaPlayer>
        ) : null}

        <style>
          {`
            @keyframes scaleIn {
              from {
                opacity: 0;
                transform: scale(0.8);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }
          `}
        </style>
      </Box>
    </Modal>
  );
};

export default VideoPlayerModal;
