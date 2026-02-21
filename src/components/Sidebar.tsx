import React from "react";
import { Box } from "@mui/material";
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
