import { api } from './client';

export const getBoards = () => api.get('/boards');
export const createBoard = (payload) => api.post('/boards', payload);
export const deleteBoard = (id) => api.delete(`/boards/${id}`);