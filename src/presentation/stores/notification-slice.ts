import { createSlice, Slice } from '@reduxjs/toolkit';
import { RootState } from 'presentation/app/store';

export enum AlertSeverity {
  SUCCESS = 'success',
  ERROR = 'error',
  WARINING = 'warning',
  INFO = 'info',
}

export type NotificationState = {
  isOpen: boolean;
  severity: AlertSeverity;
  message: string;
  duration: number;
};

const initialState: NotificationState = {
  isOpen: false,
  severity: AlertSeverity.INFO,
  message: '',
  duration: 4500,
};

export const notificationSlice: Slice<NotificationState> = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    openNotification: (state, { payload }) => {
      state.isOpen = true;
      state.severity = payload.severity ?? AlertSeverity.INFO;
      state.message = payload.message ?? '';
      state.duration = payload.duration ?? 3000;
    },
    closeNotification: (state) => {
      state.isOpen = false;

      return state;
    },
  },
});

export const { openNotification, closeNotification } =
  notificationSlice.actions;

export const selectNotification = (state: RootState) => state.notification;
