import React, { useEffect, useState } from "react";
import { HashRouter, Routes, Route, Navigate, useNavigation } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { SidebarLayout } from "@/src/components/Sidebar";
import Videos from "./page/Videos";
import Gallery from "./page/Gallery";
import Documents from "./page/Documents";
import GlobalContext from "./context/GlobalContext";
import {
  FileType,
  GlobalContextType,
  VideoDocumentType,
} from "./types/main.types";

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
  const [videos, setVideos] = useState<VideoDocumentType | null>(null);
  const [gallery, setGallery] = useState<FileType[] | null>(null);
  const [documents, setDocuments] = useState<FileType[] | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // fetch documents , gallery and videos data Here
  useEffect(() => {
    if (window.storageApi) {
      // update videos list in global context
      window.storageApi
        .videoData()
        .then((response) => {
          const { data, success, message } = response;
          if (success && data) {
            if ("videoTree" in data && "videoList" in data) {
              setVideos(data as VideoDocumentType);
            }
          } else {
            setVideos({ videoTree: [], videoList: [] });
          }
        })
        .catch((error) => {
          console.error("Error fetching video tree:", error);
        });

      // update gallery list in global context
      window.storageApi
        .galleryData()
        .then((response) => {
          const { data, success, message } = response;
          if (success && data) {
            if (Array.isArray(data)) {
              setGallery(data);
            } else {
              setGallery([]);
            }
          } else {
            setGallery([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching document tree:", error);
        });

      // update documents list in global context
      window.storageApi
        .documentData()
        .then((response) => {
          const { data, success, message } = response;
          if (success && data) {
            if (Array.isArray(data)) {
              setDocuments(data);
            } else {
              setDocuments([]);
            }
          } else {
            setDocuments([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching document tree:", error);
        });
    }
  }, []);

  const handleSearchSubmit = (type: "clear" | "submit") => {
    if (type === "clear") {
      setSearchQuery("");
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <GlobalContext.Provider
          value={{
            videos: videos,
            documents: documents,
            gallery: gallery,
            searchQuery: searchQuery,
            onSearchSubmit: handleSearchSubmit,
            searchChange: handleSearchChange,
          }}
        >
          <SidebarLayout>
            <Routes>
              <Route path="/" element={<Navigate to="/videos" replace />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/documents" element={<Documents />} />
            </Routes>
          </SidebarLayout>
        </GlobalContext.Provider>
      </HashRouter>
    </ThemeProvider>
  );
};

export default Layout;
