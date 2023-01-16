import { Grid } from '@mui/material';
import type { NextPage } from 'next';

const FaqSection: NextPage = () => {
  return (
        <Grid
        id="faq"
        container
        textAlign="center"
        alignItems="center"
        pr={{ xs: 2, md: 4 }}
        pl={{ xs: 2, md: 4 }}
        sx={{backgroundImage: 'url("/background.png")', height: '100vh'}}
        >
        </Grid>
  );
};

export default FaqSection;
