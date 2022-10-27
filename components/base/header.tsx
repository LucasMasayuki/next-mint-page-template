import { Pause, PlayArrow } from '@mui/icons-material';
import { Box, Grid, IconButton } from '@mui/material';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { FaTwitter } from 'react-icons/fa';
import AccountButton from './account-button';

const Header: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  function toggleIsPlaying() {
    setIsPlaying(!isPlaying);
  }

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying && audioRef.current.paused) {
      audioRef.current.play();
      console.log(audioRef.current.paused);
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <Box width="100%" sx={{ p: '2% 0' }}>
      <Grid container alignItems="center" justifyItems="center">
        <Grid item xs={7} md={3} pl={{ xs: 0, md: 4 }}>
          <IconButton
            sx={{
              background: 'white',
              boxShadow:
                'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;',
              mr: 2,
            }}
            onClick={() => {
              window.open('https://twitter.com', '_blank');
            }}
          >
            <FaTwitter color="#1DA1F2" />
          </IconButton>
          <IconButton
            sx={{
              background: 'white',
              boxShadow:
                'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;',
              mr: 2,
            }}
            onClick={() => {
              window.open(
                'https://opensea.io/collection/',
                '_blank'
              );
            }}
          >
            <Image
              src={
                'https://storage.googleapis.com/opensea-static/Logomark/Logomark-Blue.png'
              }
              alt="opensea-logo"
              height={27}
              width={27}
            />
          </IconButton>
          <IconButton
            sx={{
              background: 'white',
              mr: 2,
              boxShadow:
                'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;',
            }}
            onClick={() => {
              window.open(
                'https://etherscan.io/address/',
                '_blank'
              );
            }}
          >
            <Image
              src={
                'https://etherscan.io/images/brandassets/etherscan-logo-circle.png'
              }
              alt="opensea-logo"
              height={27}
              width={27}
            />
          </IconButton>
        </Grid>
        <Grid item md={6} sx={{ display: { xs: 'none', md: 'block' } }} />
        <Grid item xs={1} md={1} justifyContent="end" display="grid">
          {isPlaying ? (
            <IconButton
              color="secondary"
              onClick={toggleIsPlaying}
              sx={{
                background: 'linear-gradient(#f12711, #f5af19)',
                mr: 2,
                boxShadow:
                  'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;',
              }}
            >
              <Pause />
            </IconButton>
          ) : (
            <IconButton
              color="secondary"
              onClick={toggleIsPlaying}
              sx={{
                background: 'linear-gradient(#f12711, #f5af19)',
                mr: 2,
                boxShadow:
                  'rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;',
              }}
            >
              <PlayArrow />
            </IconButton>
          )}
          <audio
            id="player"
            loop
            autoPlay={true}
            ref={audioRef}
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
          >
            <track kind="captions" />
            <source src="/hell.mpeg" type="audio/mpeg" />
          </audio>
        </Grid>
        <Grid item xs={4} md={2} textAlign="center">
          <AccountButton />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Header;
