import React, { useState } from 'react';

function PostSearchBox({ onSearch }) {
  const [field, setField] = useState('title');
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim() === '') {
      alert('검색어를 입력해 주세요');
      return;
    }
    onSearch(field, keyword);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <select
        value={field}
        onChange={(e) => setField(e.target.value)}
        className="border border-gray-300 px-1 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
      >
        <option value="title">제목</option>
        <option value="content">내용</option>
        <option value="author">작성자</option>
      </select>

      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="검색어 입력"
        className="border border-gray-300 px-2 py-1 text-sm w-48 focus:outline-none focus:ring-1 focus:ring-gray-400"
      />

      <button
        type="submit"
        className="border border-black hover:bg-gray-300 text-black text-sm px-2 py-1 transition"
      >
        검색
      </button>
    </form>
  );
}

export default PostSearchBox;