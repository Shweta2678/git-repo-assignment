import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RepoList = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    // Fetch data from the GitHub API
    fetch('https://api.github.com/orgs/godaddy/repos')
      .then((response) => response.json())
      .then((data) => setRepos(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="container">
      <h1>GitHub Repositories</h1>
      <ul>
        {repos.map((repo) => (
          <li key={repo.id}>
            <Link
              to={`/repos/${repo.name}`}
              className="repo-link"
              tabIndex="0"
            >
              {repo.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RepoList;
