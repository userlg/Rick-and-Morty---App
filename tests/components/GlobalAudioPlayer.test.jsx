import { render, screen, fireEvent } from '@testing-library/react';
import GlobalAudioPlayer from '../../src/components/UI/GlobalAudioPlayer';
import { describe, it, expect, vi } from 'vitest';

describe('GlobalAudioPlayer', () => {
    it('renders and toggles play/pause', () => {
        // Mock HTMLMediaElement functions
        const playMock = vi.fn().mockResolvedValue(undefined);
        const pauseMock = vi.fn();
        
        window.HTMLMediaElement.prototype.play = playMock;
        window.HTMLMediaElement.prototype.pause = pauseMock;

        render(<GlobalAudioPlayer />);

        const button = screen.getByLabelText('Play music');
        expect(button).toBeInTheDocument();

        // Click to play
        fireEvent.click(button);
        expect(playMock).toHaveBeenCalled();
        expect(screen.getByLabelText('Pause music')).toBeInTheDocument();

        // Click to pause
        fireEvent.click(button);
        expect(pauseMock).toHaveBeenCalled();
        expect(screen.getByLabelText('Play music')).toBeInTheDocument();
    });

    it('adjusts volume', () => {
        render(<GlobalAudioPlayer />);
        const slider = screen.getByRole('slider');
        
        fireEvent.change(slider, { target: { value: '0.5' } });
        expect(slider.value).toBe('0.5');
    });

    it('handles playback error', async () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
        const playMock = vi.fn().mockRejectedValue(new Error('Playback error'));
        window.HTMLMediaElement.prototype.play = playMock;

        render(<GlobalAudioPlayer />);
        const button = screen.getByLabelText('Play music');
        
        fireEvent.click(button);
        
        // Wait for promise rejection handling
        await expect(playMock).toHaveBeenCalled();
        // Since it's a promise rejection in a handler, we might need to wait a tick or just verify console was called if possible
        // But better to just check if console.error was called.
        // We need to wait for the promise chain to resolve.
        await new Promise(resolve => setTimeout(resolve, 0));
        
        expect(consoleSpy).toHaveBeenCalledWith("Playback failed:", expect.any(Error));
        consoleSpy.mockRestore();
    });
});
