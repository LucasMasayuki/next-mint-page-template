import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';
import { store } from '../../src/presentation/app/store';
import {
  AlertSeverity,
  openNotification,
} from '../../src/presentation/stores/notification-slice';
import Notification from './notification';

describe.concurrent('Notification component', () => {
  describe('when first loaded', () => {
    it('should not open snackbar', () => {
      const { container } = render(
        <Provider store={store}>
          <Notification />
        </Provider>
      );

      expect(container.innerHTML).toMatchSnapshot();
    });
  });

  describe('when change notification state', () => {
    it('should open snackbar, when is open is true', () => {
      const { container } = render(
        <Provider store={store}>
          <Notification />
        </Provider>
      );

      store.dispatch(
        openNotification({
          message: 'test',
          severity: AlertSeverity.ERROR,
        })
      );

      expect(container.innerHTML).toMatchSnapshot();
    });
  });
});
