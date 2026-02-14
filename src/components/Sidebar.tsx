import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import Logo from "@/public/logo.jpg";
import Navigation from "./Navigation";
import Searchbar from "./Searchbar";


interface SidebarLayoutProps {
  children: React.ReactNode;
}

export function SidebarLayout({ children }: SidebarLayoutProps) {





  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar Drawer */}
      <Navigation />
      {/* App Bar */}
      

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
        }}
      >
        {/* top searchbar  */}
        <Searchbar />
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}

export default SidebarLayout;
