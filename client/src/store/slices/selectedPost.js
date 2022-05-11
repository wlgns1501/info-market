import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  title: null,
  content: null,
  nickname: null,
  targetPoint: 0,
  type: null,
  totalViews: 0,
  totalLikes: 0,
  userId: null,
  createdAt: null,
  updatedAt: null,
  reviews: [], //[{id, nickname, userId, content, createdAt}, {}, {}, {}...]
  like: false,
  isPurchased: false,
  //아래는 테스트용
  fileURL: null,
};

const stateKeys = Object.keys(initialState);

export const selectedPostSlice = createSlice({
  name: 'selectedPost',
  initialState,
  reducers: {
    updatePostState: (state, action) => {
      for (let key in action.payload) {
        if (stateKeys.includes(key)) state[key] = action.payload[key];
      }
    },
    clearPostState: (state) => {
      stateKeys.forEach((el) => {
        state[el] = initialState[el];
      });
    },
    addLike: (state) => {
      state.totalLikes += 1;
    },
    cancelLike: (state) => {
      state.totalLikes -= 1;
    },
    addComment: (state, action) => {
      state.reviews = [action.payload, ...state.reviews];
    },
    deleteComment: (state, action) => {
      const { replyId } = action.payload;
      state.reviews = state.reviews.filter(
        (R) => String(R.id) !== String(replyId),
      );
    },
    modifyComment: (state, action) => {
      const { id, content, updatedAt } = action.payload;
      state.reviews = state.reviews.map((R) => {
        if (String(R.id) === String(id)) return { ...R, content, updatedAt };
        else return R;
      });
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

export const {
  updatePostState,
  clearPostState,
  addLike,
  cancelLike,
  addComment,
  deleteComment,
  modifyComment,
} = selectedPostSlice.actions;
export default selectedPostSlice.reducer;
export const selectSelectedPost = (state) => state.selectedPost;
