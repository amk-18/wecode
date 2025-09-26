import React from 'react';
import { Problem } from '../../types';
import ProblemCard from './ProblemCard';

interface ProblemListProps {
  problems: Problem[];
  loading: boolean;
}

const ProblemList: React.FC<ProblemListProps> = ({ problems, loading }) => {
  if (loading) {
    return (
      <div>
        {[1, 2, 3].map((n) => (
          <div key={n} style={{ 
            height: '120px', 
            backgroundColor: '#f1f5f9', 
            borderRadius: '8px',
            marginBottom: '1rem',
            animation: 'pulse 2s infinite'
          }}></div>
        ))}
      </div>
    );
  }

  return (
    <div>
      {problems.map((problem) => (
        <ProblemCard key={problem.id} problem={problem} />
      ))}
    </div>
  );
};

export default ProblemList;