import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { SidebarLayout } from "@/src/components/Sidebar";
import Home from "./page/Home";

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
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<Home />} />
            <Route 
              path="/users" 
              element={
                <div>
                  <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
                    Users Page
                  </h1>
                  <p>Manage your users here.</p>
                </div>
              } 
            />
            <Route 
              path="/settings" 
              element={
                <div>
                  <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
                    Settings Page
                  </h1>
                  <p>Configure your application settings.</p>
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
