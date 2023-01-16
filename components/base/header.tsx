import { Box, Grid, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import AccountButton from './account-button';

const Header: React.FC = () => {
  return (
    <Box width="100%" sx={{ p: '2% 0', position: 'absolute', zIndex: 2 }}>
      <Grid container alignItems="center">
        <Grid item xs={1}>
          <Image src="/logo.webp" width="100%" height="30px" alt="logo" />
        </Grid>
        <Grid item xs={1}>
          <Typography
            color="primary"
            component={Link}
            sx={{ color: 'white' }}
            href="#home"
          >
            Home
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography component={Link} href="#mint">
            Mint
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography component={Link} href="#faq">
            Faq
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography component={Link} href="#social">
            Socials
          </Typography>
        </Grid>
        <Grid item xs={7} textAlign="right">
          <AccountButton />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;
