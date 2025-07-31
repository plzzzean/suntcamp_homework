import React from 'react';
import { useNavigate } from 'react-router-dom';

function PostTable({ posts }) {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left border border-gray-300">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-2 border-b">번호</th>
            <th className="px-4 py-2 border-b">제목</th>
            <th className="px-4 py-2 border-b">작성자</th>
            <th className="px-4 py-2 border-b">작성시간</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr
              key={post.id}
              className="hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <td className="px-4 py-2 border-b">{index + 1}</td>
              <td
                className="px-4 py-2 border-b text-black-600 "
                onClick={() => navigate(`/post/${post.id}`)}
              >
                {post.title}
              </td>
              <td className="px-4 py-2 border-b">{post.author}</td>
              <td className="px-4 py-2 border-b">
                {new Date(post.createdAt).toLocaleString('ko-KR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PostTable;