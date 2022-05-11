import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  inputVal: null,
  selectBox1: 'title',
  selectBox2: 'All',
};

const stateKeys = Object.keys(initialState);

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    // prev: (state) => {
    //   state.currentPage -= 1;
    // },
    // next: (state) => {
    //   state.currentPage += 1;
    // },
    // searchReset: (state, action) => {
    //   state = { ...state, ...action.payload };
    // },
    // updatePostList: (state, action) => {
    //   state.postList = [...state.postList, ...action.payload];
    // },
    updateSearch: (state, action) => {
      for (let key in action.payload) {
        if (stateKeys.includes(key)) state[key] = action.payload[key];
      }
    },
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

export const { updateSearch } = searchSlice.actions;
export default searchSlice.reducer;
export const selectSearch = (state) => state.search;
