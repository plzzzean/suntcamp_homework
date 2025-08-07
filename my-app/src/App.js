import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import HomePage from './pages/HomePage/HomePage';
import WritePage from './pages/WritePage/WritePage';
import DetailPage from './pages/DetailPage/DetailPage';

const BASE_URL =
  (process.env.REACT_APP_API_BASE_URL || 'http://192.168.100.194:8080').replace(/\/+$/, ''); 

const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/boards');
        setPosts(data);
      } catch (e) {
        console.error('게시글 불러오기 실패:', e);
        alert('게시글 목록을 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const addPost = async ({ title, author, content }) => {
    try {
      const { data: created } = await api.post('/boards', { title, author, content });
      setPosts((prev) => [created, ...prev]);
    } catch (e) {
      console.error('게시글 작성 실패:', e);
      alert('게시글 작성에 실패했습니다.');
    }
  };

  const removePost = async (id) => {
    try {
      await api.delete(`/boards/${id}`);
      setPosts((prev) => prev.filter((p) => String(p.id) !== String(id)));
    } catch (e) {
      console.error('게시글 삭제 실패:', e);
      alert('게시글 삭제에 실패했습니다.');
    }
  };

  if (loading) return <div className="p-6">로딩 중...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage posts={posts} />} />
        <Route path="/write" element={<WritePage onAdd={addPost} />} />
        <Route path="/post/:id" element={<DetailPage posts={posts} onDelete={removePost} />} />
        <Route path="*" element={<div>404 - 페이지를 찾을 수 없습니다.</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;