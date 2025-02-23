import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from "./postsSlice";
import Pagination from "./Pagination";

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

  if (isLoading) return <h1 className='isLoadingText'>Loading...</h1>;
  if (error) return <h1 className='errorMessageText'>Error: {error}</h1>;

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

      <Pagination />

    </div>
  )
}

export default PostsView