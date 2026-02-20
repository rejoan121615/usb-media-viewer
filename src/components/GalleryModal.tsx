import React, { useRef, useEffect } from "react";
import { Modal, Box, IconButton } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { FileType } from "../types/main.types";


interface VideoPlayerModalProps {
  open: boolean;
  onClose: () => void;
  image: FileType;
  imageList: FileType[];
}

const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ open, onClose, image, imageList }) => {




  return (
    <Modal
      open={open}
      onClose={onClose}
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
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          outline: "none",
        }}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
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
        {/* modal content - make gallery smaller and prevent overflow */}
        <Box
          sx={{
            maxWidth: { xs: "90vw", sm: "700px" },
            maxHeight: { xs: "80vh", sm: "80vh" },
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.2)",
            borderRadius: 2,
            boxShadow: 3,
            overflow: "auto",
            p: { xs: 1, sm: 2 },
          }}
        >
          
        </Box>
      </Box>
    </Modal>
  );
};


export default VideoPlayerModal;
