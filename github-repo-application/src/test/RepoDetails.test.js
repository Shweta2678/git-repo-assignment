/* eslint-disable testing-library/no-wait-for-multiple-assertions */
// RepoDetails.test.js (Test file)

import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For extended matchers
import { MemoryRouter, Routes, Route } from 'react-router-dom'; // Import Routes and Route from react-router-dom

import RepoDetails from '../components/RepoDetails';

// Mock the fetch function
beforeAll(() => {
  global.fetch = jest.fn();
});

beforeEach(() => {
  jest.clearAllMocks(); // Clear all mock function calls before each test
});

test('it fetches and renders repository details', async () => {
  // Mock the fetch response
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: () => Promise.resolve({
      name: 'repo1',
      description: 'Test Repository',
      language: 'JavaScript',
      forks_count: 10,
      open_issues_count: 5,
      watchers_count: 20,
      html_url: 'https://github.com/godaddy/repo1',
    }), // Mock data
  });

  render(
    <MemoryRouter initialEntries={['/repos/repo1']}>
      <Routes>
        <Route path="/repos/:repoName" element={<RepoDetails />} />
      </Routes>
    </MemoryRouter>
  );

  // Wait for the component to render and the API call to complete
  await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

  // Check if the component renders the repository details
  expect(screen.getByText('Loading...')).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText('repo1')).toBeInTheDocument();
    expect(screen.getByText('Test Repository')).toBeInTheDocument();
    expect(screen.getByText('Language(s): JavaScript')).toBeInTheDocument();
    expect(screen.getByText('Forks: 10')).toBeInTheDocument();
    expect(screen.getByText('Open Issues: 5')).toBeInTheDocument();
    expect(screen.getByText('Watchers: 20')).toBeInTheDocument();
    expect(screen.getByText('Visit Repository')).toHaveAttribute('href', 'https://github.com/godaddy/repo1');
    expect(screen.getByText('Back to Repository List')).toBeInTheDocument();
  });
});
