import React from 'react';
import { Typography, Paper, Box } from '@mui/material';

const Home = () => {
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Welcome to My App
      </Typography>
      <Paper elevation={2} sx={{ p: 3, mt: 2 }}>
        <Typography variant="body1" paragraph>
          Hello Mohd Rejoan! This is your home page with a Material-UI sidebar.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Navigate using the sidebar menu to explore different sections of the app.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Home;