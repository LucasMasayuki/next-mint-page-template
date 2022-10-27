import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import PhotoAvatar from './photo-avatar';

describe.concurrent('PhotoAvatar component', () => {
  describe('when picture is not loaded', () => {
    it('should render the first letter of the name', () => {
      // When rendered
      const { container } = render(<PhotoAvatar name={'test'} />);

      // Then it should show all content
      expect(container.innerHTML).toMatchSnapshot();
    });
  });

  describe('when image is loaded', () => {
    it('should render the picture', () => {
      // When rendered
      const { container } = render(
        <PhotoAvatar name={'test'} picture="test.com" />
      );

      // Then it should show all content
      expect(container.innerHTML).toMatchSnapshot();
    });
  });
});
