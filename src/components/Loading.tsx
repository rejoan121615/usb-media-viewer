import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const Loading = ({
  message = "Loading... Please wait.",
}: {
  message?: string;
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
      <CircularProgress color="primary" />
      <Typography variant="body2" color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};

export default Loading;
