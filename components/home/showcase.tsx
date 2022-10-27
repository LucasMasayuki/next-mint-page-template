import { Box } from '@mui/material';
import Image from 'next/image';
import Styles from '../../styles/showcase.module.css';

type Props = {
  images: string[];
};

const ShowCase: React.FC<Props> = ({ images }) => {
  return (
    <Box
      height={{ xs: '150px', md: '400px' }}
      width={{ xs: '150px', md: '100%' }}
      sx={{
        position: 'relative',
        borderColor: 'orange',
        borderStyle: 'solid',
        borderWidth: 2,
        borderRadius: '30px',
        boxShadow:
          'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;',
      }}
    >
      <Image
        src={`/${images[0]}.png`}
        layout="fill"
        alt="showcase-1"
        className={Styles['first-img']}
      />
      <Image
        src={`/${images[1]}.png`}
        layout="fill"
        alt="showcase-2"
        className={Styles['second-img']}
      />
      <Image
        src={`/${images[2]}.png`}
        layout="fill"
        alt="showcase-3"
        className={Styles['third-img']}
      />
      <Image
        src={`/${images[3]}.png`}
        layout="fill"
        alt="showcase-4"
        className={Styles['four-img']}
      />
    </Box>
  );
};

export default ShowCase;
