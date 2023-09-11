// RepoList.test.js (Test file)

import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For extended matchers
import RepoList from '../components/RepoList';


// Mock the fetch function
beforeAll(() => {
  global.fetch = jest.fn();
});

beforeEach(() => {
  jest.clearAllMocks(); // Clear all mock function calls before each test
});

test('it fetches and renders a list of repositories', async () => {
  // Mock the fetch response
  global.fetch.mockResolvedValue({
    ok: true,
    json: () => Promise.resolve([{ id: 1, name: 'repo1' }, { id: 2, name: 'repo2' }]), // Mock data
  });

  render(<RepoList />);

  // Wait for the component to render and the API call to complete
  await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

  // Check if the component renders the list of repositories
  expect(screen.getByTestId('github-title')).toHaveTextContent('GitHub Repositories');
});
