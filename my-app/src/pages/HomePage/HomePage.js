import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PostSearchBox from '../../components/PostSearchBox/PostSearchBox';
import PostTable from '../../components/PostTable/PostTable';
import Pagination from '../../components/Pagination/Pagination';

function HomePage({ posts }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchField, setSearchField] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const postsPerPage = 10;

  const filteredPosts = useMemo(() => {
    if (!searchField || searchKeyword.trim() === '') return posts;
    return posts.filter((post) =>
      post[searchField].toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [posts, searchField, searchKeyword]);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirst, indexOfLast);

  const handleSearch = (field, keyword) => {
    setSearchField(field);
    setSearchKeyword(keyword);
    setCurrentPage(1);
  };

  const handleResetSearch = () => {
    setSearchField(null);
    setSearchKeyword('');
    setCurrentPage(1);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl text-gray-700 mb-10 text-center">Q&A</h1>

        <div className="mb-6 flex justify-between items-center">
          <PostSearchBox onSearch={handleSearch} />

          <Link
            to="/write"
            className="border border-black text-black text-sm font-medium py-1 px-2 hover:bg-gray-50 transition"
          >
            글쓰기
          </Link>
        </div>


      {searchField && (
        <div className="mb-4 flex justify-center">
          <button
            onClick={handleResetSearch}
            className="border hover:bg-gray-300 text-sm text-gray-800 px-3 py-1 transition"
          >
            전체 목록으로 돌아가기
          </button>
        </div>
      )}

      {filteredPosts.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          ‘<span className="font-semibold">{searchKeyword}</span>’(이)가 포함된 게시글이 없어요 @_@
        </p>
      ) : (
        <div className="space-y-4">
          <PostTable posts={currentPosts} />
          <Pagination
            total={filteredPosts.length}
            currentPage={currentPage}
            onChangePage={(page) => setCurrentPage(page)}
          />
        </div>
      )}
    </div>
  );
}

export default HomePage;