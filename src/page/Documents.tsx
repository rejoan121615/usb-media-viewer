import React, { useContext, useEffect, useState } from "react";
import { Typography, Box, Grid, Paper } from "@mui/material";
import { FileType } from "../types/main.types";
import MediaCard from "../components/MediaCard";
import DocumentModal from "../components/DocumentModal";
import GlobalContext from "../context/GlobalContext";


const Documents = () => {
  const { documents } = useContext(GlobalContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<FileType | null>(null);



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
          <Grid size={4} key={index}>
            <MediaCard
              handleClick={() => {
                setSelectedDocument(document);
                setModalOpen(true);
              }}
              mediaType="document"
              thumbnail="/pdf-logo.png"
              thumbnailAlt="Pdf Icon"
              title={document.title}
            />
          </Grid>
        ))}
      </Grid>

      {/* Document Player Modal */}
      <DocumentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        document={selectedDocument} // Placeholder, replace with actual video data when available
      />
    </Box>
  );
};

export default Documents;
