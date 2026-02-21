import React from "react";
import { Box, Typography } from "@mui/material";
import { MdErrorOutline } from "react-icons/md";

const VideoNotFound = ({
  title = "Nothing found",
  description = "Sorry, we couldn't find anything here.",
  type = "video",
}: {
  title?: string;
  description?: string;
  type?: string;
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
      <MdErrorOutline size={64} color="#bdbdbd" />
      <Typography variant="h6" color="text.secondary">
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {description}
      </Typography>
    </Box>
  );
};

export default VideoNotFound;
