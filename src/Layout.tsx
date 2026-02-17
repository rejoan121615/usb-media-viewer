import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { SidebarLayout } from "@/src/components/Sidebar";
import Videos from "./page/Videos";
import Gallery from "./page/Gallery";
import Documents from "./page/Documents";

// Create MUI theme
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2d65e8",
    },
  },
});

const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <SidebarLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/videos" replace />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/documents" element={<Documents />} />
          </Routes>
        </SidebarLayout>
      </HashRouter>
    </ThemeProvider>
  );
};

export default Layout;
