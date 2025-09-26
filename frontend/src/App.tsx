import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/common/Header';
import Home from './pages/Home';
import Problems from './pages/Problems';
import ProblemSolve from './pages/ProblemSolve';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/problems" element={<Problems />} />
          <Route path="/problem/:slug" element={<ProblemSolve />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;