import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Divider,
  Paper,
  InputBase,
  Box,
} from "@mui/material";
import { MdClear, MdSearch } from 'react-icons/md'
import GlobalContext from "../context/GlobalContext";


const Searchbar = () => {
  const { searchQuery, onSearchSubmit, searchChange } = useContext(GlobalContext)


  return (
    <>
      <Toolbar sx={{ height: "80px", display: "flex", justifyContent: "center" }}>
        <Paper
          component="form"
          elevation={3}
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
            width: "100%",
            maxWidth: 600,
            borderRadius: "24px",
            transition: "all 0.3s",
            "&:hover": {
              elevation: 6,
              boxShadow: 4,
            },
          }}
          onSubmit={(e) => {
            e.preventDefault();
            onSearchSubmit('submit');
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="search" onClick={() => onSearchSubmit('submit')}>
            <MdSearch />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search files..."
            inputProps={{ "aria-label": "search files" }}
            value={searchQuery}
            onChange={searchChange}
          />
          {searchQuery && (
            <IconButton
              sx={{ p: "10px" }}
              aria-label="clear"
              onClick={() => onSearchSubmit('clear')}
            >
              <MdClear />
            </IconButton>
          )}
        </Paper>
      </Toolbar>
      <Divider />
    </>
  );
};

export default Searchbar;
