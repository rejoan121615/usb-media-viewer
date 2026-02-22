import React, { useContext, useEffect, useState } from "react";
import { Typography, Box, Grid } from "@mui/material";
import { FileType } from "../types/main.types";
import MediaCard from "../components/MediaCard";
import GalleryModal from "../components/GalleryModal";
import GlobalContext from "../context/GlobalContext";
import useFuseSearch from "../hooks/useFuseSearch";
import NotFound from "../components/NotFound";

const Gallery = () => {
  const { gallery, searchQuery } = useContext(GlobalContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number>(0);

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedImage(null);
  };

  const filteredGallery = useFuseSearch<FileType>(searchQuery, gallery, {
    keys: ["title"],
    threshold: 0.3,
  });

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
        {filteredGallery?.length === 0 ? (
          <Grid size={12}>
            <NotFound
              title="Not Found"
              description="No images available in the data/gallery folder."
            />
          </Grid>
        ) : (
          filteredGallery?.map((item, index) => (
            <Grid size={{xs: 6, md: 4, xl: 3}} key={index}>
              <MediaCard
                title={item.title}
                thumbnail={item.streamUrl}
                thumbnailAlt={`${item.title} thumbnail`}
                mediaType="gallery"
                handleClick={() => handleImageClick(index)}
              />
            </Grid>
          ))
        )}
      </Grid>

      {/* Document Player Modal */}
      <GalleryModal
        open={modalOpen}
        onClose={handleModalClose}
        image={selectedImage}
        imageList={gallery || []}
      />
    </Box>
  );
};

export default Gallery;
