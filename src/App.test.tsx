import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
    it('renders the main Vite + React heading', () => {
        render(<App />);
        const heading = screen.getByText(/Vite \+ React/i);
        expect(heading).toBeInTheDocument();
    });
});
