import React, { useEffect, useState } from "react";
import { Typography, Box, Grid } from "@mui/material";
import { FileType } from "../types/main.types";
import MediaCard from "../components/MediaCard";
import GalleryModal from "../components/GalleryModal"; 

const Gallery = () => {
  const [gallery, setGallery] = useState<FileType[] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [selectedVideo, setSelectedVideo] = useState<FileType | null>(null);

  useEffect(() => {
    window.storageApi
      .galleryData()
      .then((response) => {
        console.log("Gallery data response:", response);

        const { data, success, message } = response;
        if (success && data) {
          if (Array.isArray(data)) {
            setGallery(data);
          }

          // setVideoList(data.videoList);
        } else {
          console.log(message);
        }
      })
      .catch((error) => {
        console.error("Error fetching document tree:", error);
      });
  }, []);




  const handleImageClick = (image: FileType) => {
    setSelectedVideo(image);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
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
        Gallery
      </Typography>

      <Grid container spacing={3}>
        {gallery?.map((item, index) => (
          <Grid size={4} key={index}>
            <MediaCard
              title={item.title}
              thumbnail={item.streamUrl}
              thumbnailAlt={`${item.title} thumbnail`}
              mediaType="gallery"
              handleClick={() => handleImageClick(item)}
            />
          </Grid>
        ))}
      </Grid>

      {/* Document Player Modal */}
      <GalleryModal
        open={modalOpen}
        onClose={handleModalClose}
        image={selectedVideo}
        imageList={gallery || []}
      />
    </Box>
  );
};

export default Gallery;
