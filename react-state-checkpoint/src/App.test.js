import { act, fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('shows and hides the person profile', () => {
  render(<App />);

  expect(screen.queryByRole('article')).toBeNull();
  fireEvent.click(screen.getByRole('button', { name: 'Show profile' }));
  expect(screen.getByRole('heading', { name: 'Alex Morgan' })).toBeTruthy();
  expect(screen.getByRole('img', { name: 'Alex Morgan' })).toBeTruthy();

  fireEvent.click(screen.getByRole('button', { name: 'Hide profile' }));
  expect(screen.queryByRole('article')).toBeNull();
});

test('updates elapsed time and clears its interval when unmounted', () => {
  jest.useFakeTimers();
  const { unmount } = render(<App />);

  act(() => {
    jest.advanceTimersByTime(2000);
  });

  expect(screen.getByRole('status').textContent).toContain('2 seconds');

  unmount();
  expect(jest.getTimerCount()).toBe(0);
  jest.useRealTimers();
});
