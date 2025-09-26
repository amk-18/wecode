import React from 'react';
import { Problem } from '../../types';
import { Link } from 'react-router-dom';

interface ProblemCardProps {
  problem: Problem;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ problem }) => {
  const getDifficultyClass = (difficulty: string) => {
    switch (difficulty) {
      case 'EASY': return 'difficulty difficulty-easy';
      case 'MEDIUM': return 'difficulty difficulty-medium';
      case 'HARD': return 'difficulty difficulty-hard';
      default: return 'difficulty';
    }
  };

  return (
    <div className="problem-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
        <div style={{ flex: 1 }}>
          <Link 
            to={`/problem/${problem.slug}`}
            className="problem-title"
          >
            {problem.title}
          </Link>
          <p className="problem-description">
            {problem.description.substring(0, 150)}...
          </p>
        </div>
        <span className={getDifficultyClass(problem.difficulty)}>
          {problem.difficulty}
        </span>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.9rem', color: '#64748b' }}>
          Created: {new Date(problem.createdAt).toLocaleDateString()}
        </span>
        <Link 
          to={`/problem/${problem.slug}`}
          className="btn btn-primary"
        >
          Solve Problem
        </Link>
      </div>
    </div>
  );
};

export default ProblemCard;