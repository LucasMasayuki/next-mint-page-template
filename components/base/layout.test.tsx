import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';
import { store } from '../../src/presentation/app/store';
import Layout from './layout';

describe.concurrent('Layout component', () => {
  describe('when rendered', () => {
    it('should render correctly', () => {
      // When rendered
      const { container } = render(
        <Provider store={store}>
          <Layout />
        </Provider>
      );

      // Then it should show all content
      expect(container.innerHTML).toMatchSnapshot();
    });
  });
});
