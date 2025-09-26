import React, { useState, useEffect } from 'react';
import { Problem } from '../types';
import { problemService } from '../services/api';
import ProblemList from '../components/problems/ProblemList';
import LoadingSpinner from '../components/common/LoadingSpinner';

const Problems: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'ALL' | 'EASY' | 'MEDIUM' | 'HARD'>('ALL');

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      setLoading(true);
      const response = await problemService.getAllProblems();

      // ✅ Deduplicate by id
      const uniqueProblems = response.data.filter(
        (problem: Problem, index: number, self: Problem[]) =>
          index === self.findIndex((p) => p.id === problem.id)
      );

      setProblems(uniqueProblems);
    } catch (error) {
      console.error('Error fetching problems:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProblems =
    filter === 'ALL'
      ? problems
      : problems.filter((p) => p.difficulty === filter);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '2rem 0' }}>
      <div className="container">
        <div style={{ marginBottom: '2rem' }}>
          <h1
            style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              color: '#0f172a',
              marginBottom: '1rem',
            }}
          >
            Coding Problems
          </h1>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {(['ALL', 'EASY', 'MEDIUM', 'HARD'] as const).map((difficulty) => (
              <button
                key={difficulty}
                onClick={() => setFilter(difficulty)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  backgroundColor:
                    filter === difficulty
                      ? difficulty === 'EASY'
                        ? '#10b981'
                        : difficulty === 'MEDIUM'
                        ? '#f59e0b'
                        : difficulty === 'HARD'
                        ? '#ef4444'
                        : '#0ea5e9'
                      : 'white',
                  color: filter === difficulty ? 'white' : '#374151',
                  border: filter === difficulty ? 'none' : '1px solid #d1d5db',
                }}
              >
                {difficulty}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <ProblemList problems={filteredProblems} loading={loading} />
        )}
      </div>
    </div>
  );
};

export default Problems;
