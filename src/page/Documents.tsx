import React, { useEffect, useState } from "react";
import { Typography, Box, Grid } from "@mui/material";
import {
  VideoFileType,

  FileType,
} from "../types/main.types";

const Documents = () => {
  const [documents, setDocuments] = useState<FileType[] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);


  useEffect(() => {
    window.storageApi
      .documentData()
      .then((response) => {
        console.log('Document data response:', response);
        const { data, success, message } = response;
        if (success && data) {
          if (Array.isArray(data)) {
            setDocuments(data);
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
        Document Library
      </Typography>

      <Grid container spacing={3}>
        {documents?.map((document, index) => (
          <div key={index}>
            <img src={document.streamUrl} alt={document.title} />
          </div>
        ))}
      </Grid>

      {/* Document Player Modal */}
    </Box>
  );
};

export default Documents;
