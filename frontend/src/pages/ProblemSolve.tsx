import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Problem, CodeSubmission } from '../types';
import { problemService, submissionService } from '../services/api';
import CodeEditor from '../components/editor/CodeEditor';
import LoadingSpinner from '../components/common/LoadingSpinner';

const ProblemSolve: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [output, setOutput] = useState('');

  useEffect(() => {
    if (slug) {
      fetchProblem(slug);
    }
  }, [slug]);

  const fetchProblem = async (problemSlug: string) => {
    try {
      setLoading(true);
      const response = await problemService.getProblemBySlug(problemSlug);
      setProblem(response.data);
      setCode(response.data.starterCode || '// Write your code here');
    } catch (error) {
      console.error('Error fetching problem:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!problem) return;

    try {
      const submission: CodeSubmission = {
        problemId: problem.id,
        code,
        language
      };

      const response = await submissionService.submitCode(submission);
      setOutput(`Submission Result: ${response.data.status}\nExecution Time: ${response.data.executionTime}ms`);
    } catch (error) {
      setOutput('Error submitting code');
      console.error('Submission error:', error);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!problem) return <div>Problem not found</div>;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', padding: '2rem 0' }}>
      <div className="container">
        <div className="grid grid-cols-2">
          {/* Problem Description */}
          <div className="card">
            <h1 style={{ fontSize: '2rem', fontWeight: '600', color: '#0f172a', marginBottom: '1rem' }}>
              {problem.title}
            </h1>
            <span className={`difficulty difficulty-${problem.difficulty.toLowerCase()}`}>
              {problem.difficulty}
            </span>
            
            <div style={{ marginTop: '1.5rem' }}>
              <p style={{ color: '#475569', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
                {problem.description}
              </p>
              
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginTop: '1.5rem', marginBottom: '0.5rem' }}>
                Examples:
              </h3>
              <pre style={{ 
                backgroundColor: '#f1f5f9', 
                padding: '1rem', 
                borderRadius: '4px',
                overflow: 'auto',
                marginBottom: '1rem'
              }}>
                {problem.examples}
              </pre>
              
              <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                Constraints:
              </h3>
              <p style={{ color: '#475569' }}>{problem.constraints}</p>
            </div>
          </div>

          {/* Code Editor */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <select 
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  style={{
                    padding: '0.5rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    backgroundColor: 'white'
                  }}
                >
                  <option value="python">Python</option>
                  <option value="java">Java</option>
                  <option value="javascript">JavaScript</option>
                </select>
                <button 
                  onClick={handleSubmit}
                  className="btn btn-primary"
                >
                  Submit Code
                </button>
              </div>
              
              <CodeEditor 
                code={code}
                language={language}
                onChange={setCode}
                height="400px"
              />
            </div>

            {/* Output */}
            {output && (
              <div className="card">
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem' }}>Output:</h3>
                <pre style={{ 
                  backgroundColor: '#f1f5f9', 
                  padding: '1rem', 
                  borderRadius: '4px',
                  overflow: 'auto',
                  whiteSpace: 'pre-wrap'
                }}>
                  {output}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolve;