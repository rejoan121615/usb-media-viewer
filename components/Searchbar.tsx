import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";

const Searchbar: React.FC = () => {
  return (
    <Toolbar>
      <Typography variant="h6" noWrap component="div">
        My Electron App
      </Typography>
    </Toolbar>
  );
};

export default Searchbar;
