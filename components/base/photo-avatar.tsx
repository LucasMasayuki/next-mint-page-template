/* eslint-disable no-bitwise */
import { Avatar, AvatarProps } from '@mui/material';

type Props = {
  name: string;
  picture?: string;
  height?: number;
  width?: number;
};

const PhotoAvatar: React.FC<Props> = ({ name, picture, height, width }) => {
  const stringToColor = (string: string): string => {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.substr(-2);
    }

    return color;
  };

  const stringAvatar = (): AvatarProps => {
    return {
      sx: {
        bgcolor:
          picture != null && picture !== '' ? 'inherit' : stringToColor(name),
        width,
        height,
      },
      children: name[0].toUpperCase(),
    };
  };

  return (
    <>
      <Avatar {...stringAvatar()} src={picture ?? ''} />
    </>
  );
};

PhotoAvatar.defaultProps = {
  height: 32,
  width: 32,
};

export default PhotoAvatar;
