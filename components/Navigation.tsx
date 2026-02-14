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
import {
  Home as HomeIcon,
  People as PeopleIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import Logo from "@/public/logo.jpg";

const drawerWidth = 240;

const navigationItems = [
  { title: "Home", icon: HomeIcon, path: "/home" },
  { title: "Users", icon: PeopleIcon, path: "/users" },
  { title: "Settings", icon: SettingsIcon, path: "/settings" },
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
            src={Logo}
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
                    "& .MuiSvgIcon-root": {
                      color: isActive ? "#fff" : "inherit",
                    },
                  }}
                >
                  <ListItemIcon>
                    <Icon color={isActive ? "primary" : "inherit"} />
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
