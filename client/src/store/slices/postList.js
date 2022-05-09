import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  postList: [],
};

export const postListSlice = createSlice({
  name: 'postList',
  initialState,
  reducers: {
    prev: (state) => {
      state.currentPage -= 1;
    },
    next: (state) => {
      state.currentPage += 1;
    },
    searchReset: (state, action) => {
      state = { ...state, ...action.payload };
    },
    updatePostList: (state, action) => {
      state.postList = [...state.postList, ...action.payload];
    },
    // updateSearch: (state, action) => {
    //   state.searchOptions = {
    //     ...state.searchOptions,
    //     ...action.payload,
    //   };
    //   console.log(state.searchOptions);
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
});

export const {} = postListSlice.actions;
export default postListSlice.reducer;
export const selectPostList = (state) => state.postList;
