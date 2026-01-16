import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Characters from '../../src/pages/Characters';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as useCharactersHook from '../../src/hooks/useCharacters';

// Mock the hook
vi.mock('../../src/hooks/useCharacters');

const mockData = {
  info: { count: 2, pages: 1, next: null, prev: null },
  results: [
    {
      id: 1,
      name: "Rick Sanchez",
      status: "Alive",
      species: "Human",
      image: "image-url",
      location: { name: "Earth" }
    },
    {
      id: 2,
      name: "Morty Smith",
      status: "Alive",
      species: "Human",
      image: "image-url",
      location: { name: "Earth" }
    }
  ]
};

describe('Characters Page', () => {
    beforeEach(() => {
        vi.resetAllMocks();
    });

  it('renders loading state initially', () => {
    useCharactersHook.default.mockReturnValue({
      loading: true,
      error: null,
      data: { results: [], info: {} }
    });

    render(
      <BrowserRouter>
        <Characters />
      </BrowserRouter>
    );

    // Loader usually has some specific markup, or we check absence of chars
    // But better to check for Loader if it has text or specific role
    // My Loader is just a spinner. I can check for "Error" absence and "No characters" absence
    expect(screen.queryByText('Error loading characters.')).not.toBeInTheDocument();
    expect(screen.queryByText('No characters found.')).not.toBeInTheDocument();
  });

  it('renders characters when data is loaded', () => {
     useCharactersHook.default.mockReturnValue({
      loading: false,
      error: null,
      data: mockData
    });

    render(
      <BrowserRouter>
        <Characters />
      </BrowserRouter>
    );

    expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
    expect(screen.getByText('Morty Smith')).toBeInTheDocument();
  });

  it('renders error state', () => {
     useCharactersHook.default.mockReturnValue({
      loading: false,
      error: { message: "Failed" },
      data: { results: [], info: {} }
    });

    render(
      <BrowserRouter>
        <Characters />
      </BrowserRouter>
    );

    expect(screen.getByText('Error loading characters.')).toBeInTheDocument();
  });

  it('handles search and pagination interactions', async () => {
    // Initial load
    useCharactersHook.default.mockReturnValue({
      loading: false,
      error: null,
      data: {
          info: { count: 20, pages: 2, next: 'url', prev: 'url' },
          results: mockData.results
      }
    });

    render(
      <BrowserRouter>
        <Characters />
      </BrowserRouter>
    );

    // Search Interaction
    const searchInput = screen.getByPlaceholderText('Search characters...');
    fireEvent.change(searchInput, { target: { value: 'Morty' } });
    
    // Check if the search term triggers a re-render or call (mock implementation details)
    // In a real integration, this updates state and triggers the hook. 
    // Since we mock the hook, we can't easily see the new hook call unless we intentionally re-render with new mock return or spy on useCharacters arguments if possible.
    // However, checking the state update effect on the hook is tricky with just mocking the return value.
    // Standard approach: Check if the hook was called with new params.
    expect(useCharactersHook.default).toHaveBeenCalledWith(1, { name: 'Morty' });


    // Pagination Interactions
    const nextButton = screen.getByText('Next');
    fireEvent.click(nextButton);
    expect(useCharactersHook.default).toHaveBeenCalledWith(2, { name: 'Morty' });

    const prevButton = screen.getByText('Previous');
    fireEvent.click(prevButton);
    expect(useCharactersHook.default).toHaveBeenCalledWith(1, { name: 'Morty' });
  });

  it('handles edge cases where data is missing structure', () => {
       useCharactersHook.default.mockReturnValue({
          loading: false,
          error: null,
          data: null // Force data to be null to test destructive destructuring protection
        });

        render(
          <BrowserRouter>
            <Characters />
          </BrowserRouter>
        );
        
        // Should verify it doesn't crash and acts as no results or similar
        // Based on logic: const { results, info } = data || {};
        // results will be undefined.
        // !loading && !error && results?.length === 0 -> undefined?.length is undefined. Condition false.
        // !loading && !error && results?.length > 0 -> undefined?.length > 0 is false.
        // So it renders nothing or just header.
        
        expect(screen.getByRole('heading', { name: "Meet the cast" })).toBeInTheDocument();
  });
});
