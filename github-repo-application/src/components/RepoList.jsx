// RepoList.js (Component)

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RepoList = () => {
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.github.com/orgs/godaddy/repos')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setRepos(data))
      .catch((error) => setError(error));
  }, []);

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <div className="container">
      <h1 data-testid="github-title">GitHub Repositories</h1>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <Link to={`/repos/${repo.name}`} className="repo-link" tabIndex="0">
              {repo.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepoList;
