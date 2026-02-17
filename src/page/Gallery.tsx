import React, { useEffect, useState } from "react";
import { Typography, Box, Grid } from "@mui/material";
import {
  FileType,
} from "../types/main.types";

const Gallery = () => {
  const [gallery, setGallery] = useState<FileType[] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);


  useEffect(() => {
    window.storageApi
      .galleryData()
      .then((response) => {

        console.log('Gallery data response:', response);

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
          <div key={index}>
            <img src={item.streamUrl} alt={item.title} />
          </div>
        ))}
      </Grid>

      {/* Document Player Modal */}
    </Box>
  );
};

export default Gallery;
