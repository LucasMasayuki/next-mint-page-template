import { Close } from '@mui/icons-material';
import { Alert, IconButton, Snackbar } from '@mui/material';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../src/presentation/app/hooks';
import {
  closeNotification,
  selectNotification,
} from '../../src/presentation/stores/notification-slice';

const Notification: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isOpen, message, severity, duration } =
    useSelector(selectNotification);

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={duration}
      onClose={(event, reason) => {
        if (reason === 'clickaway') {
          return;
        }

        dispatch(closeNotification(null));
      }}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      action={
        <>
          <IconButton
            aria-label="close"
            color="inherit"
            onClick={() => {
              dispatch(closeNotification(null));
            }}
          >
            <Close />
          </IconButton>
        </>
      }
    >
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
};

Notification.defaultProps = {
  duration: 3000,
};

export default Notification;
