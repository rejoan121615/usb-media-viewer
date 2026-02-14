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
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
  ChevronLeft as ChevronLeftIcon,
} from "@mui/icons-material";
import Logo from "@/public/logo.jpg";
import Navigation from "./Navigation";
import Searchbar from "./Searchbar";

const drawerWidth = 240;

const navigationItems = [
  { title: "Home", icon: HomeIcon, path: "/home" },
  { title: "Users", icon: PeopleIcon, path: "/users" },
  { title: "Settings", icon: SettingsIcon, path: "/settings" },
];

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
          p: 3,
        }}
      >
        {/* top searchbar  */}
        <Searchbar />
        {children}
      </Box>
    </Box>
  );
}

export default SidebarLayout;
