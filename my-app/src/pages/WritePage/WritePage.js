import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function WritePage({ onAdd }) {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author || !content) {
      alert('모든 항목을 입력해주세요!');
      return;
    }

    const newPost = {
      id: Date.now().toString(),
      title,
      author,
      content,
      createdAt: new Date().toISOString(),
    };

    onAdd(newPost);
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl  mb-6 text-center">게시글 작성</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="작성자"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          placeholder="내용"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border border-gray-300 px-4 py-2 h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        ></textarea>
        <button
          type="submit"
          className="w-full bg-gray-100 hover:bg-gray-300 text-black font-semibold py-2 px-4 transition"
        >
          저장
        </button>
      </form>
    </div>
  );
}

export default WritePage;