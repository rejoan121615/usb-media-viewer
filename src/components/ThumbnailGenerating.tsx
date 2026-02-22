import React from "react";
import { Box, Typography } from "@mui/material";
import { MdHourglassEmpty } from "react-icons/md";

const ThumbnailGenerating = ({
  title = "Generating thumbnails",
  description = "Some thumbnails are missing. We are generating them in the background. This may take a few seconds.",
}: {
  title?: string;
  description?: string;
}) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="25vh"
      gap={2}
    >
      <MdHourglassEmpty size={64} color="#bdbdbd" />
      <Typography variant="h6" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Box>
  );
};

export default ThumbnailGenerating;
