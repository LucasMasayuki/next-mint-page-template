import { Logout } from '@mui/icons-material';
import {
  Box,
  IconButton,
  ListItemIcon,
  MenuItem,
  Tooltip,
} from '@mui/material';
import { useState } from 'react';
import PhotoAvatar from '../photo-avatar';
import AppMenu from './app-menu';

const AccountMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (): void => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Conta">
          <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <PhotoAvatar name={'template'} picture={''} />
          </IconButton>
        </Tooltip>
      </Box>
      <AppMenu anchorEl={anchorEl} onClose={handleClose}>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </AppMenu>
    </>
  );
};

export default AccountMenu;
