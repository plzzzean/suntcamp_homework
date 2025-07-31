import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import WritePage from './pages/WritePage/WritePage';
import DetailPage from './pages/DetailPage/DetailPage';

function App() {
  const [posts, setPosts] = useState(() => {
    
    const dummy = [];
    for (let i = 1; i <= 20; i++) {
      dummy.push({
        id: i.toString(),
        title: `샘플 제목 ${i}`,
        author: `작성자${i}`,
        content: `이것은 샘플 본문 ${i}입니다.`,
        createdAt: new Date().toISOString(),
      });
    }
    return dummy;
  });

  
  const addPost = (newPost) => {
    setPosts([newPost, ...posts]); 
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage posts={posts} />} />
        <Route path="/write" element={<WritePage onAdd={addPost} />} />
        <Route path="/post/:id" element={<DetailPage posts={posts} />} />
        <Route path="*" element={<div>404 - 페이지를 찾을 수 없습니다.</div>} />
      </Routes>
    </BrowserRouter>

  );

}







export default App;
