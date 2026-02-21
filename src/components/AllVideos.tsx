import { Grid } from "@mui/material";
import React, { useContext, useEffect } from "react";
import MediaCard from "./MediaCard";
import GlobalContext from "../context/GlobalContext";
import { VideoFileType } from "../types/main.types";
import useFuseSearch from "../hooks/useFuseSearch";
import NotFound from "./NotFound";

const AllVideos = ({
  handleVideoClick,
}: {
  handleVideoClick: (video: VideoFileType) => void;
}) => {
  const { videos, searchQuery } = useContext(GlobalContext);

  const filteredVideos = useFuseSearch<VideoFileType>(
    searchQuery,
    videos?.videoList ?? [],
    { keys: ["title"], threshold: 0.3 },
  );

  return (
    <Grid container spacing={3}>
      {filteredVideos.length === 0 ? (
        <Grid size={12}>
          <NotFound
            title="Not Found"
            description="No videos available in the data/videos folder."
          />
        </Grid>
      ) : (
        filteredVideos.map((video, index) => (
          <Grid size={4} key={index}>
            <MediaCard
              key={index}
              title={video.title}
              thumbnail={video.thumbnail}
              thumbnailAlt={`Thumbnail for ${video.title}`}
              mediaType="video"
              videoDuration={video.duration}
              handleClick={() => handleVideoClick(video)}
            />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default AllVideos;
