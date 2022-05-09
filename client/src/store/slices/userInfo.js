import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
  id: '',
  email: '',
  password: '',
  nickname: '',
  accToken: '',
  point: 0,
  earnings: 0,
  grade: '',
  phone: '',
  accout: '',
  profileImg: null,
  progress: 0,
  showAlert: false,
  previewImg: null,
};

// const mockData = {
//   isLogin: true,
//   id: 1,
//   email: 'choji95@naver.com',
//   password: 'pass1010!',
//   nickname: '김코딩',
//   accToken: '1111111111',
//   point: 0,
//   chargedPoint: 0,
//   earnings: 0,
//   grade: '실버',
//   profileImg: '',
//   phone: '010-1234-1377',
//   accout: '',
// };

const stateKeys = Object.keys(initialState);
export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    updateState: (state, action) => {
      for (let key in action.payload) {
        if (stateKeys.includes(key)) state[key] = action.payload[key];
      }
    },
    clearState: (state) => {
      stateKeys.forEach((el) => {
        state[el] = initialState[el];
      });
    },
  },
});

export const { updateState, clearState } = userInfoSlice.actions;
export default userInfoSlice.reducer;
export const selectUserInfo = (state) => state.userInfo;
