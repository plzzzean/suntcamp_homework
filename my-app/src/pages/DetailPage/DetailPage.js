import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createComment, deleteComment } from '../../api/comments';

function DetailPage({ posts, onDelete }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = useMemo(
    () => posts.find((p) => String(p.id) === String(id)),
    [posts, id]
  );

  const [comments, setComments] = useState([]);
  const [loadingCmt, setLoadingCmt] = useState(true);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!post) return;
    setComments(post.comments || []);
    setLoadingCmt(false);
  }, [post]);

  if (!post) {
    return (
      <div className="p-6">
        <p>해당 게시글을 찾을 수 없습니다.</p>
        <button className="mt-3 px-3 py-2 rounded bg-gray-800 text-white" onClick={() => navigate('/')}>
          홈으로
        </button>
      </div>
    );
  }

  const handleDeletePost = async () => {
    const ok = window.confirm('정말 삭제할까요?');
    if (!ok) return;
    await onDelete(post.id);
    navigate('/');
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;

    try {
      const payload = { postId: post.id, author, content };
      const { data: created } = await createComment(payload);
      setComments((prev) => [created, ...prev]); 
      setAuthor('');
      setContent('');
    } catch (e) {
      console.error('댓글 등록 실패:', e);
      alert('댓글 등록 실패!');
    }
  };

  const handleRemoveComment = async (commentId) => {
    const ok = window.confirm('댓글을 삭제할까요?');
    if (!ok) return;
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => String(c.id) !== String(commentId)));
    } catch (e) {
      console.error('댓글 삭제 실패:', e);
      alert('댓글 삭제 실패!');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      <article className="space-y-2">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <div className="text-sm text-gray-500">작성자: {post.author}</div>
        <p className="mt-4 whitespace-pre-wrap leading-7">{post.content}</p>

        <div className="mt-6 flex gap-2">
          <button className="px-3 py-2 rounded bg-gray-800 text-white" onClick={() => navigate('/')}>
            목록
          </button>
          <button className="px-3 py-2 rounded bg-red-600 text-white" onClick={handleDeletePost}>
            삭제
          </button>
        </div>
      </article>

      <section className="border-t pt-6">
        <h2 className="text-xl font-semibold mb-3">댓글</h2>

        <form onSubmit={handleAddComment} className="space-y-3">
          <input
            type="text"
            placeholder="작성자 이름"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full border px-3 py-2"
          />
          <textarea
            placeholder="댓글 내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border px-3 py-2"
            rows={3}
          />
          <button type="submit" className="px-3 py-2 bg-blue-600 text-white">
            댓글 등록
          </button>
        </form>

        {loadingCmt ? (
          <div className="mt-4 text-sm text-gray-500">댓글 로딩 중...</div>
        ) : (
          <ul className="mt-6 space-y-3">
            {comments.length === 0 && (
              <li className="text-sm text-gray-500">등록된 댓글이 없습니다.</li>
            )}
            {comments.map((c) => (
              <li key={c.id} className="border rounded p-3">
                <div className="text-sm text-gray-600 mb-1">작성자: {c.author}</div>
                <div className="whitespace-pre-wrap">{c.content}</div>
                <button
                  className="mt-2 text-sm px-2 py-1 bg-red-500 text-white"
                  onClick={() => handleRemoveComment(c.id)}
                >
                  삭제
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default DetailPage;