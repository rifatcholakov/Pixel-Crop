import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import ErrorBoundary from './ErrorBoundary';

const HealthyChild = () => <div>All Good!</div>;

const CrashedChild = () => {
    throw new Error('I crashed the app on purpose!');
    return <div>Never reached</div>;
};

describe('ErrorBoundary', () => {
    // React will naturally aggressively log rendering errors to the console.
    // We mock console.error here so our terminal isn't spammed with giant red stack traces during the tests!
    const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => { });

    afterEach(() => {
        vi.clearAllMocks();
    });

    it('renders normal children without issue when there is no error', () => {
        render(
            <ErrorBoundary>
                <HealthyChild />
            </ErrorBoundary>
        );

        expect(screen.getByText('All Good!')).toBeInTheDocument();
        expect(screen.queryByText(/Oops, something went horribly wrong/i)).not.toBeInTheDocument();
    });

    it('catches rendering errors and displays the fallback UI', () => {
        render(
            <ErrorBoundary>
                <CrashedChild />
            </ErrorBoundary>
        );

        // The actual app failed to render
        expect(screen.queryByText('All Good!')).not.toBeInTheDocument();

        // The Error Boundary fallback took over the screen
        expect(screen.getByText(/Oops, something went horribly wrong/i)).toBeInTheDocument();

        // It successfully extracted the raw error message string
        expect(screen.getByText('I crashed the app on purpose!')).toBeInTheDocument();

        // Verify the ErrorBoundary actually called console.error inside `componentDidCatch`
        expect(consoleErrorMock).toHaveBeenCalled();
    });

    it('reloads the page when the refresh button is clicked', () => {
        render(
            <ErrorBoundary>
                <CrashedChild />
            </ErrorBoundary>
        );

        // We temporarily hijack the browser's window.location to prove the button calls reload()
        const originalLocation = window.location;
        const reloadMock = vi.fn();

        Object.defineProperty(window, 'location', {
            configurable: true,
            value: { reload: reloadMock }
        });

        // Click the refresh button
        const refreshButton = screen.getByRole('button', { name: /refresh page/i });
        fireEvent.click(refreshButton);

        // It worked!
        expect(reloadMock).toHaveBeenCalledTimes(1);

        // Put the normal window.location back so we don't break other tests
        Object.defineProperty(window, 'location', {
            configurable: true,
            value: originalLocation
        });
    });
});
