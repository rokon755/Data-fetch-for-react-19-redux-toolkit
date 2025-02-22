import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, nextPage, prevPage } from "./postsSlice";

const PostsView = () => {

  const dispatch = useDispatch();
  const { data: posts, isLoading, error, currentPage, postsPerPage } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  // Get current posts for the page
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  // Total pages calculation
  const totalPages = Math.ceil(posts.length / postsPerPage);

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <div className='mainFetchData'>
      <h1>Data Fetching for - Redux Toolkit - React-19</h1>
      <div className='postData--fetch'>
        {currentPosts.map((post) => (
          <div key={post.id}>
            <p>{post.id}</p>
            <hr />
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </div>
        ))}
      </div>

      {/* Pagination Buttons  */}
      <div className='paginationButton'>
        <button
          onClick={() => dispatch(prevPage())}
          disabled={currentPage === 1}
          className={currentPage === 1 ? "disabled-btn" : ""}
        >
          ← Previous
        </button>
        <span className='showPageText'> Page - {currentPage} </span>
        <button
          onClick={() => dispatch(nextPage())}
          disabled={currentPage === totalPages}
          className={currentPage === totalPages ? "disabled-btn" : ""}
        >
          Next  →
        </button>
      </div>
    </div>
  )
}

export default PostsView