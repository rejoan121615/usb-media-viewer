import { Grid } from '@mui/material'
import React, { useContext } from 'react'
import MediaCard from './MediaCard'
import GlobalContext from '../context/GlobalContext';
import { VideoFileType } from '../types/main.types';

const AllVideos = ({handleVideoClick} : {handleVideoClick: (video: VideoFileType) => void}) => {
  const { videos } = useContext(GlobalContext);


  return (
     <Grid container spacing={3}>
        {videos?.videoList.map((video, index) => (
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
        ))}
      </Grid> 
  )
}

export default AllVideos