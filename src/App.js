import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PlayerManagement from './pages/PlayerManagement';
import TeamManagement from './pages/TeamManagement';
import Home from './pages/Home';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/players" element={<PlayerManagement />} />
        <Route path="/teams" element={<TeamManagement />} />
      </Routes>
    </Router>
  );
};

export default App;
