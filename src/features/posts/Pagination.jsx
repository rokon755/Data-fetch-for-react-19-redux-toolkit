import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nextPage, prevPage, goToPage } from './postsSlice';

const Pagination = () => {

  const dispatch = useDispatch();

  const { data, currentPage, postsPerPage } = useSelector(
    (state) => state.posts
  );

  const totalPages = Math.ceil(data.length / postsPerPage);


  const paginationNumbers = () => {
    const pages = [];
    const maxPagesToShow = 3;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 2) pages.push('...');
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      )
        pages.push(i);
      if (currentPage < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className='pagination'>
      <button className='privButton' onClick={() => dispatch(prevPage())} disabled={currentPage === 1}>← Prev</button>

      {paginationNumbers().map((page, index) =>
        page === '...' ? (
          <span key={index} className='dots'>
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => dispatch(goToPage(page))}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </button>
        )
      )}

      <button className='nextButton'
        onClick={() => dispatch(nextPage())}
        disabled={currentPage === totalPages}
      >Next  →</button>
    </div>
  );
};

export default Pagination;
