import React, { useRef, useEffect } from "react";
import { Modal, Box, IconButton } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { VideoFile } from "../types/main.types";

interface VideoPlayerModalProps {
  open: boolean;
  onClose: () => void;
  video: VideoFile;
}

const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  open,
  onClose,
  video,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (open && videoRef.current && video) {
      videoRef.current.load();
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error('Error playing video:', error);
        });
      }
    }
  }, [open, video]);

  const handleClose = () => {
    if (videoRef.current) {
      videoRef.current.pause();
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
          // <video
          //   ref={videoRef}
          //   controls
          //   autoPlay
          //   preload="auto"
          //   src={video.streamUrl}
          //   onError={(e) => {
          //     console.error('Video error:', e);
          //     console.error('Video source:', video.streamUrl);
          //   }}
          //   onLoadedData={() => {
          //     console.log('Video loaded successfully');
          //   }}
          //   style={{
          //     maxWidth: "95%",
          //     maxHeight: "95%",
          //     width: "auto",
          //     height: "auto",
          //     animation: "scaleIn 0.4s ease-out",
          //   }}
          // >
          //   Your browser does not support the video tag.
          // </video>
          <video
            ref={videoRef}
            controls
            autoPlay
            preload="auto"
            src={video.streamUrl}
            onError={(e) => {
              console.error('Video error:', e);
              console.error('Video source:', video.streamUrl);
            }}
            onLoadedData={() => {
              console.log('Video loaded successfully');
            }}
            style={{
              maxWidth: "95%",
              maxHeight: "95%",
              width: "auto",
              height: "auto",
              animation: "scaleIn 0.4s ease-out",
            }}
          >
            Your browser does not support the video tag.
          </video>
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
