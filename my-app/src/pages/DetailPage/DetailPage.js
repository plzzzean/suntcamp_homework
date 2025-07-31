import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function DetailPage({ posts }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = posts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded mt-10">
        <p className="text-red-500 text-center mb-4">게시글을 찾을 수 없습니다.</p>
        <div className="flex justify-center">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded transition"
          >
            ← 뒤로가기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-2xl font-bold mb-4 text-black-600">{post.title}</h2>
      <div className="text-sm text-gray-600 mb-">
        <p><strong>작성자:</strong> {post.author}</p>
        <p><strong>작성일:</strong> {new Date(post.createdAt).toLocaleString()}</p>
      </div>
      <hr className="my-4" />
      <p className="text-gray-800 whitespace-pre-wrap mb-6">{post.content}</p>
      <div className="flex justify-end">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-100 hover:bg-gray-300 text-black text-xs px-4 py-2 transition"
        >
          ← 뒤로가기
        </button>
      </div>
    </div>
  );
}

export default DetailPage;