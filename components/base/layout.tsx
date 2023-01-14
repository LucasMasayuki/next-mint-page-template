import { Pause, PlayArrow } from '@mui/icons-material';
import { Fab, IconButton } from '@mui/material';
import { useState, useRef, useEffect } from 'react';
import Header from './header';

type Props = {
  children?: React.ReactElement | React.ReactElement[] | undefined;
  className?: string | undefined;
};

const Layout: React.FC<Props> = ({ children, className }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying && audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }

  function toggleIsPlaying() {
    setIsPlaying(!isPlaying);
  }

  return (
    <div className={className}>
      <Header />
      <main>{children}</main>
      <Fab sx={{position: 'absolute', bottom: 16, right: 16}}>
        {isPlaying ? (
            <IconButton
              color="secondary"
              onClick={toggleIsPlaying}
            >
              <Pause />
            </IconButton>
          ) : (
            <IconButton
              color="secondary"
              onClick={toggleIsPlaying}
            >
              <PlayArrow />
            </IconButton>
          )}
      </Fab>
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
    </div>
  );
};

export default Layout;
