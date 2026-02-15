import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { SidebarLayout } from "@/src/components/Sidebar";
import Videos from "./page/Videos";

// Create MUI theme
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2d65e8',
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
            <Route 
              path="/gallery" 
              element={
                <div>
                  <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
                    Gallery Page
                  </h1>
                  <p>Browse your images here.</p>
                </div>
              } 
            />
            <Route 
              path="/documents" 
              element={
                <div>
                  <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
                    Documents Page
                  </h1>
                  <p>Manage your documents here.</p>
                </div>
              } 
            />
          </Routes>
        </SidebarLayout>
      </HashRouter>
    </ThemeProvider>
  );
};

export default Layout;
