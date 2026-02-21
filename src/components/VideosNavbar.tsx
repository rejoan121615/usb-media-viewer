import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { VideoWindowType } from "../types/main.types";

const VideosNavbar = ({ currentWindow, clickHandler }: { currentWindow: VideoWindowType, clickHandler: (window: VideoWindowType) => void }) => {
  return (
    <Box component={'div'} sx={{ mb: 3 }} display="flex" alignItems="center" justifyContent="space-between">
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        fontWeight="bold"
        mb={0}
      >
        Video Library
      </Typography>
      <Box>
        <Button variant={ currentWindow === 'all' ? "contained" : "outlined"} color="primary" sx={{ mr: 2 }} onClick={() => clickHandler('all')}>
          All Videos
        </Button>
        <Button variant={ currentWindow === 'chapter' ? "contained" : "outlined"} color="primary" sx={{ mr: 2 }} onClick={() => clickHandler('chapter')}>
          Chapters
        </Button>
      </Box>
    </Box>
  );
};

export default VideosNavbar;
