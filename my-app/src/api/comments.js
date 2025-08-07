import { api } from './client';
import axios from 'axios';

export const createComment = (payload) => api.post('/comments', payload);
export const deleteComment = (id) => api.delete(`/comments/${id}`);
export const getCommentsByNested = async (postId) => {
  const res = await axios.get(`/comments?postId=${postId}`);
  return res.data;
};