export interface Problem {
  id: number;
  title: string;
  slug: string;
  description: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  starterCode: string;
  functionName: string;
  constraints: string;
  examples: string;
  hints: string;
  createdAt: string;
}

export interface Submission {
  id: number;
  userId: number;
  problemId: number;
  problemTitle: string;
  code: string;
  language: string;
  status: 'PENDING' | 'ACCEPTED' | 'WRONG_ANSWER' | 'TIME_LIMIT_EXCEEDED' | 'RUNTIME_ERROR' | 'COMPILATION_ERROR';
  executionTime: number;
  memoryUsed: number;
  testCasesPassed: number;
  totalTestCases: number;
  submittedAt: string;
}

export interface CodeSubmission {
  problemId: number;
  code: string;
  language: string;
}