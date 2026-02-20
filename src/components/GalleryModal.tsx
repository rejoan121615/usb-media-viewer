import React, { useRef, useEffect, useState } from "react";
import { Modal, Box, IconButton } from "@mui/material";
import { IoClose } from "react-icons/io5";
import { FileType } from "../types/main.types";
import Lightbox, { SlideImage } from 'yet-another-react-lightbox';
import "yet-another-react-lightbox/styles.css";


interface VideoPlayerModalProps {
  open: boolean;
  onClose: () => void;
  image: number;
  imageList: FileType[];
}

const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  open,
  onClose,
  image,
  imageList,
}) => {

  const [slides, setSlides] = useState<SlideImage[]>([]);


  useEffect(() => {
    if (imageList && imageList.length > 0) {
      const formattedSlides = imageList.map((img) => ({
        src: img.streamUrl,
        alt: img.title,
      }));
      setSlides(formattedSlides);
    }
  }, [imageList, image]);


  return (
    <Lightbox
      open={open}
      close={onClose}
      slides={slides}
      index={image}
    />
  )
};

export default VideoPlayerModal;
