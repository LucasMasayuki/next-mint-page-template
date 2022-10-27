import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { describe, expect, it } from 'vitest';
import { store } from '../../src/presentation/app/store';
import Header from './header';

describe.concurrent('Header component', () => {
  describe('when render', () => {
    it('should fill the header with correct components', () => {
      // When rendered
      const { container } = render(
        <Provider store={store}>
          <Header />
        </Provider>
      );

      // Then it should show all content
      expect(container.innerHTML).toMatchSnapshot();
    });
  });
});
