import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Data Fetching start
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/posts'
  );
  return response.data;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    data: [],
    isLoading: false,
    error: null,
    currentPage: 1,
    postsPerPage: 6,
  },
  reducers: {
    nextPage: (state) => {
      if (
        state.currentPage < Math.ceil(state.data.length / state.postsPerPage)
      ) {
        state.currentPage += 1;
      }
    },
    prevPage: (state) => {
      if (state.currentPage > 1) {
        state.currentPage -= 1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.data = [];
        state.error = action.error.message;
      });
  },
});

export const { nextPage, prevPage } = postsSlice.actions;
export default postsSlice.reducer;
