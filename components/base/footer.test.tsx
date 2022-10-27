import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Footer from './footer';

describe.concurrent('Footer component', () => {
  describe('when render', () => {
    it('should fill the footer with correct components', () => {
      // When rendered
      const { container } = render(<Footer />);

      // Then it should show all content
      expect(container.innerHTML).toMatchSnapshot();
    });
  });
});
