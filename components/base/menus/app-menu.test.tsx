import { fireEvent, render } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AppMenu from './app-menu';

describe.concurrent('App Menu component', () => {
  describe('when has not anchor element', () => {
    it('should not open menu', () => {
      const onClosse = vi.fn();
      const { container } = render(
        <AppMenu anchorEl={null} onClose={onClosse}>
          <div>test</div>
        </AppMenu>
      );

      expect(container.innerHTML).toMatchSnapshot();
    });
  });

  describe('when has anchor element', () => {
    it('should open menu', () => {
      const anchorEl = document.createElement('div');
      const onClosse = vi.fn();
      const { container } = render(
        <AppMenu anchorEl={anchorEl} onClose={onClosse}>
          <div>test</div>
        </AppMenu>
      );

      expect(container.innerHTML).toMatchSnapshot();
    });
  });

  describe('when trigger close action', () => {
    it('should close menu', () => {
      const anchorEl = document.createElement('div');
      const onClosse = vi.fn();
      const { container } = render(
        <AppMenu anchorEl={anchorEl} onClose={onClosse}>
          <div>test</div>
        </AppMenu>
      );

      fireEvent.keyDown(container, {
        key: 'Escape',
        code: 'Escape',
        keyCode: 27,
        charCode: 27,
      });

      expect(container.innerHTML).toMatchSnapshot();
    });
  });
});
