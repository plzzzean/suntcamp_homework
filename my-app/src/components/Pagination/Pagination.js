import React from 'react';

function Pagination({ total, currentPage, onChangePage }) {
  const totalPages = Math.ceil(total / 10); 

  const maxPageCount = 5;
  const startPage = Math.max(1, currentPage - Math.floor(maxPageCount / 2));
  const endPage = Math.min(totalPages, startPage + maxPageCount - 1);
  const adjustedStartPage = Math.max(1, endPage - maxPageCount + 1);

  const pages = [];
  for (let i = adjustedStartPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex justify-center items-center space-x-2 mt-6">
      {currentPage > 1 && (
        <button
          onClick={() => onChangePage(currentPage - 1)}
          className="px-3 py-2 hover:bg-gray-200 text-xs"
        >
          ◀
        </button>
      )}

      {pages.map((num) => (
        <button
          key={num}
          onClick={() => onChangePage(num)}
          className={`px-3 py-2 border transition text-xs ${
            num === currentPage
              ? 'bg-gray-500 text-white text-xs'
              : 'hover:bg-gray-100'
          }`}
        >
          {num}
        </button>
      ))}

      {currentPage < totalPages && (
        <button
          onClick={() => onChangePage(currentPage + 1)}
          className="px-3 py-2 hover:bg-gray-200 text-xs"
        >
          ▶
        </button>
      )}
    </div>
  );
}

export default Pagination;