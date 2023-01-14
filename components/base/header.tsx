import { Box, Grid } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import AccountButton from './account-button';
import Styles from '../../styles/header.module.css';

const Header: React.FC = () => {
  return (
    <Box width="100%" sx={{ p: '2% 0', position: 'absolute', zIndex: 2 }}>
      <Grid container alignItems="center">
        <Grid item xs={1}  >
            <Image src="/logo.webp" width="100%" height="30px" alt="logo"/>
        </Grid>
        <Grid item xs={1}  >
            <Link className={Styles['link']} href="#home">Home</Link>
        </Grid>
        <Grid item xs={1} >
            <Link className={Styles['link']} href="#mint">Mint</Link>
        </Grid>
        <Grid item xs={1} >
            <Link className={Styles['link']} href="#faq">Faq</Link>
        </Grid>
        <Grid item xs={1} >
            <Link className={Styles['link']} href="#faq">Socials</Link>
        </Grid>
        <Grid item xs={7} textAlign="right">
          <AccountButton />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;
