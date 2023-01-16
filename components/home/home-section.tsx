import { Grid, Typography } from '@mui/material';
import type { NextPage } from 'next';

const HomeSection: NextPage = () => {
  return (
    <Grid
      id="home"
      container
      textAlign="right"
      alignItems="center"
      pr={{ xs: 8 }}
      pl={{ xs: 8 }}
      sx={{ backgroundImage: 'url("/background.webp")', height: '100vh' }}
    >
      <Grid item xs={12}>
        <Typography color="primary" variant="h1">
          Bored Ape Yatch Club
        </Typography>
      </Grid>
    </Grid>
  );
};

export default HomeSection;
