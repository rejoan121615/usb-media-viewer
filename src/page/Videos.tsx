import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Grid
} from '@mui/material';
import VideoCard from '@/src/components/VideoCard';
import { VideoFile, VideoTree } from '../types/main.types';

// Sample video data
const videoData = [
  {
    id: 1,
    title: 'Introduction to React',
    thumbnail: 'https://via.placeholder.com/320x180/2d65e8/ffffff?text=Video+1',
    duration: '12:45',
    views: '1.2K',
    date: '2 days ago',
  },
  {
    id: 2,
    title: 'TypeScript Advanced Patterns',
    thumbnail: 'https://via.placeholder.com/320x180/4a90e2/ffffff?text=Video+2',
    duration: '25:30',
    views: '850',
    date: '5 days ago',
  },
  {
    id: 3,
    title: 'Building Electron Apps',
    thumbnail: 'https://via.placeholder.com/320x180/7c4dff/ffffff?text=Video+3',
    duration: '18:15',
    views: '2.1K',
    date: '1 week ago',
  },
  {
    id: 4,
    title: 'Material-UI Components',
    thumbnail: 'https://via.placeholder.com/320x180/00897b/ffffff?text=Video+4',
    duration: '15:20',
    views: '3.5K',
    date: '2 weeks ago',
  },
  {
    id: 5,
    title: 'State Management with Redux',
    thumbnail: 'https://via.placeholder.com/320x180/e91e63/ffffff?text=Video+5',
    duration: '32:10',
    views: '4.2K',
    date: '3 weeks ago',
  },
  {
    id: 6,
    title: 'React Router Deep Dive',
    thumbnail: 'https://via.placeholder.com/320x180/ff6f00/ffffff?text=Video+6',
    duration: '22:35',
    views: '1.8K',
    date: '1 month ago',
  },
];

const Videos = () => {
  const [videos, setVideos] = useState<{ videoTree: VideoTree[]; videoList: VideoFile[] } | null>(null);
  // const [videoList, setVideoList] = useState<VideoFile[]>([]);

  useEffect(() => {
    window.storageApi.videoData().then((response) => {
      const { data , success, message } = response;
      if (success && data) {
        console.log('Video tree data:', data);
        setVideos(data);
        // setVideoList(data.videoList);
      } else {
        console.log(message);
      }
    }).catch((error) => {
      console.error('Error fetching video tree:', error);
    });
  }, []);

  const handleVideoClick = () => {
    console.log('Playing video:');
    // Add your video play logic here
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
        Video Library
      </Typography>

      <Grid container spacing={3}>
        {videos?.videoList.map((video, index) => (
          <VideoCard handleVideoClick={() => handleVideoClick()} video={video} key={index} />
        ))}
      </Grid>
    </Box>
  );
};

export default Videos;