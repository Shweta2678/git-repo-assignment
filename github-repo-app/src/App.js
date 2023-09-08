// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RepoList from './components/RepoList';
import RepoDetails from './components/RepoDetails'; // Create this component later
import './styles.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RepoList />} />
        <Route path="/repos/:repoName" element={<RepoDetails/>} />
      </Routes>
    </Router>
  );
}

export default App;
