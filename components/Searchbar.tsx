import React, { useState } from "react";
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
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Search as SearchIcon,
  Directions as DirectionsIcon,
  Clear as ClearIcon,
} from "@mui/icons-material";

const Searchbar = () => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleClearSearch = () => {
    setSearchValue("");
  };

  const handleSearch = () => {
    console.log("Searching for:", searchValue);
    // Add your search logic here
  };

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
            handleSearch();
          }}
        >
          <IconButton sx={{ p: "10px" }} aria-label="search" onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search files..."
            inputProps={{ "aria-label": "search files" }}
            value={searchValue}
            onChange={handleSearchChange}
          />
          {searchValue && (
            <IconButton
              sx={{ p: "10px" }}
              aria-label="clear"
              onClick={handleClearSearch}
            >
              <ClearIcon />
            </IconButton>
          )}
        </Paper>
      </Toolbar>

      <Divider />
    </>
  );
};

export default Searchbar;
