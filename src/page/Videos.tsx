import React, { useEffect, useState } from 'react';
import {
  Typography,
  Box,
  Grid
} from '@mui/material';
import VideoCard from '@/src/components/VideoCard';
import VideoPlayerModal from '@/src/components/VideoPlayerModal';
import { VideoFile, VideoTree } from '../types/main.types';



const Videos = () => {
  const [videos, setVideos] = useState<{ videoTree: VideoTree[]; videoList: VideoFile[] } | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoFile | null>(null);

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

  const handleVideoClick = (video: VideoFile) => {
    console.log('Playing video:', video);
    setSelectedVideo(video);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
        Video Library
      </Typography>

      <Grid container spacing={3}>
        {videos?.videoList.map((video, index) => (
          <VideoCard handleVideoClick={() => handleVideoClick(video)} video={video} key={index} />
        ))}
      </Grid>

      {/* Video Player Modal */}
      <VideoPlayerModal
        open={modalOpen}
        onClose={handleCloseModal}
        videoUrl={selectedVideo?.VideoUrl || '/sample.mp4'}
        videoTitle={selectedVideo?.Title}
      />
    </Box>
  );
};

export default Videos;