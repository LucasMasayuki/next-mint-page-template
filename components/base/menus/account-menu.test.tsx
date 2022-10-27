import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import AccountMenu from './account-menu';

describe.concurrent('Account Menu component', () => {
  describe('when render the first time', () => {
    it('should not open menu', () => {
      const { container } = render(<AccountMenu />);

      expect(container.innerHTML).toMatchSnapshot();
    });
  });

  describe('when clicked in photo avatar', () => {
    it('should open menu', () => {
      const { container } = render(<AccountMenu />);

      const photoAvatarComponent = container.querySelector('button');

      photoAvatarComponent?.click();

      expect(container.innerHTML).toMatchSnapshot();
    });
  });
});
