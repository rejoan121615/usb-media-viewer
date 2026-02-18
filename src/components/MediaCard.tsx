import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Chip,
  Box,
  Typography,
} from "@mui/material";
import {
  MdPlayCircleOutline as PlayIcon,
  MdOutlinePhotoSizeSelectLarge,
  MdOpenInNew,
} from "react-icons/md";

const MediaCard = ({
  title,
  thumbnail,
  thumbnailAlt,
  mediaType,
  videoDuration,
  handleVideoClick,
}: {
  title: string;
  thumbnail: string;
  thumbnailAlt: string;
  mediaType: "video" | "gallery" | "document";
  videoDuration?: string;
  handleVideoClick: () => void;
}) => {
  return (
    <Card
      elevation={2}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
    >
      <CardActionArea onClick={() => handleVideoClick()}>
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="img"
            height="180"
            image={thumbnail}
            alt={thumbnailAlt}
          />
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              opacity: 0,
              transition: "opacity 0.3s",
              "&:hover": {
                opacity: 1,
              },
            }}
          >
            {mediaType === "video" ? (
              <PlayIcon size={60} color="white" />
            ) : mediaType === "gallery" ? (
              <MdOutlinePhotoSizeSelectLarge size={60} color="white" />
            ) : (
              <MdOpenInNew size={60} color="white" />
            )}
          </Box>
          {mediaType === "video" && videoDuration && (
            <Chip
              label={videoDuration}
              size="small"
              sx={{
                position: "absolute",
                bottom: 8,
                right: 8,
                backgroundColor: "rgba(0, 0, 0, 0.8)",
                color: "white",
                fontWeight: "bold",
              }}
            />
          )}
        </Box>
        <CardContent>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Typography
              variant="subtitle1"
              component="h3"
              fontWeight="500"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                flex: 1,
                textTransform: "capitalize",
              }}
            >
              {title}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default MediaCard;
