import { render, screen } from '@testing-library/react';
import Welcome from '../../Components/Welcome.js';

test('renders the welcome message', () => {
    render(<Welcome />);
    const welcome = screen.getByText(/Welcome to fidofinder!/i);
    expect(welcome).toBeInTheDocument();

    const welcome_capt = screen.getByText(/fidofinder was made with with simplicity in mind. Browse available adoptees, pick your favorites, then use our Match feature to find companions most suited to you/i)
    expect(welcome_capt).toBeInTheDocument();

});
