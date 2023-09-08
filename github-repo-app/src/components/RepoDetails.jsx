import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const RepoDetails = () => {
  const { repoName } = useParams();
  const [repo, setRepo] = useState(null);

  useEffect(() => {
    // Fetch data for the specific repository
    fetch(`https://api.github.com/repos/godaddy/${repoName}`)
      .then((response) => response.json())
      .then((data) => setRepo(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, [repoName]);

  if (!repo) {
    return (
      <div className="container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>{repo.name}</h2>
      <p>{repo.description}</p>
      <p>Language(s): {repo.language}</p>
      <p>Forks: {repo.forks_count}</p>
      <p>Open Issues: {repo.open_issues_count}</p>
      <p>Watchers: {repo.watchers_count}</p>
      <div className="link-container">
        <a
          href={repo.html_url}
          className="repo-link"
          target="_blank" // Open link in a new tab
          rel="noopener noreferrer" // Security best practice for external links
        >
          Visit Repository
        </a>
      </div>
      <Link to="/" className="back-link">
        Back to Repository List
      </Link>
    </div>
  );
};

export default RepoDetails;
