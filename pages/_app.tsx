import { CssBaseline } from '@mui/material';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import Notification from '../components/base/notification';
import { store } from '../src/presentation/app/store';
import AppThemeProvider from '../src/presentation/providers/app-theme-provider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AppThemeProvider>
        <>
          <CssBaseline />
          <Notification />
          <Component {...pageProps} />
        </>
      </AppThemeProvider>
    </Provider>
  );
}

export default MyApp;
