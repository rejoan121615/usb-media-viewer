import React, { useContext, useEffect, useState } from "react";
import { Typography, Box, Grid, Paper } from "@mui/material";
import { FileType } from "../types/main.types";
import MediaCard from "../components/MediaCard";
import DocumentModal from "../components/DocumentModal";
import GlobalContext from "../context/GlobalContext";
import useFuseSearch from "../hooks/useFuseSearch";
import NotFound from "../components/NotFound";

const Documents = () => {
  const { documents, searchQuery } = useContext(GlobalContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<FileType | null>(
    null,
  );

  const filteredDocuments = useFuseSearch<FileType>(searchQuery, documents, {
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
        Document Library
      </Typography>

      <Grid container spacing={3}>
        {filteredDocuments?.length === 0 ? (
          <Grid  size={12} >
            <NotFound
              title="Not Found"
              description="No documents available in the data/documents folder."
            />
          </Grid>
        ) : (
          filteredDocuments?.map((document, index) => (
            <Grid size={{xs: 6, md: 4, xl: 3}} key={index}>
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
          ))
        )}
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
