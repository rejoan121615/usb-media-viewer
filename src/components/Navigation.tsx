import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
// import Logo from "../../public/logo.jpg";

import { BiSolidVideos } from "react-icons/bi";
import { IoDocumentsSharp, IoImages } from "react-icons/io5";


const drawerWidth = 240;

const navigationItems = [
  { title: "Videos", icon: <BiSolidVideos size={20} />, path: "/videos" },
  { title: "Gallery", icon: <IoImages size={18} />, path: "/gallery" },
  { title: "Documents", icon: <IoDocumentsSharp size={20} />, path: "/documents" },
];

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
  };
  return (
    <Drawer
      variant="permanent"
      open={true}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      {/* top bar logo on drawer  */}
      <Toolbar sx={{ height: "70px" }}>
        <Stack component={"div"} direction={"row"} alignItems={"center"}>
          <img
            src={`${import.meta.env.BASE_URL}logo.jpg`}
            alt="Logo"
            style={{ width: "50px", height: "auto" }}
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ marginLeft: 2 }}
          >
            Video Library
          </Typography>
        </Stack>
      </Toolbar>

      {/* navigation menu  */}
      <Box sx={{ overflow: "auto", padding: "10px 20px", marginTop: '32px' }}>
        <List>
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <ListItem key={item.title} disablePadding>
                <ListItemButton
                  selected={isActive}
                  onClick={() => handleNavigation(item.path)}
                  sx={{
                    borderRadius: "8px",
                    "&.Mui-selected": {
                      backgroundColor: "primary.main",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor: "primary.main",
                        color: "#fff",
                      },
                    },
                    "& .MuiListItemIcon-root": {
                      color: isActive ? "#fff" : "inherit",
                    },
                  }}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Drawer>
  );
};

export default Navigation;
