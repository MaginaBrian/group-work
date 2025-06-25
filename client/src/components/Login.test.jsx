
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';
import { BrowserRouter } from 'react-router-dom';

describe('Login Component', () => {
  test('renders login form and handles submission', async () => {
    const mockSetIsAuthenticated = jest.fn();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          token: { access: 'mock-access-token', refresh: 'mock-refresh-token' },
        }),
      })
    );

    render(
      <BrowserRouter>
        <Login setIsAuthenticated={mockSetIsAuthenticated} />
      </BrowserRouter>
    );

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const loginButton = screen.getByLabelText(/login/i);

    fireEvent.change(usernameInput, { target: { value: 'testuser' } });
    fireEvent.change(passwordInput, { target: { value: 'Test12345' } });
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockSetIsAuthenticated).toHaveBeenCalledWith(true);
      expect(localStorage.getItem('access_token')).toBe('mock-access-token');
      expect(localStorage.getItem('refresh_token')).toBe('mock-refresh-token');
    });
  });

  test('displays error for missing fields', () => {
    render(
      <BrowserRouter>
        <Login setIsAuthenticated={jest.fn()} />
      </BrowserRouter>
    );

    const loginButton = screen.getByLabelText(/login/i);
    fireEvent.click(loginButton);

    expect(screen.getByRole('alert')).toHaveTextContent('Username and password are required');
  });
});

