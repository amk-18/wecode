import axios from 'axios';
import { Problem, Submission, CodeSubmission } from '../types';

const API_BASE_URL = 'http://localhost:8010/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const problemService = {
  getAllProblems: () => api.get<Problem[]>('/problems'),
  getProblemById: (id: number) => api.get<Problem>(`/problems/${id}`),
  getProblemBySlug: (slug: string) => api.get<Problem>(`/problems/slug/${slug}`),
  getProblemsByDifficulty: (difficulty: string) => 
    api.get<Problem[]>(`/problems/difficulty/${difficulty}`),
};

export const submissionService = {
  submitCode: (submission: CodeSubmission) => 
    api.post<Submission>('/submissions/submit', submission),
  getUserSubmissions: (userId: number) => 
    api.get<Submission[]>(`/submissions/user/${userId}`),
};

export default api;