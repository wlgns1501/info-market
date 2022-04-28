import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
  userId: '',
  email: '',
  password: '',
  nickname: '',
  accToken: '',
  point: 0,
  chargedPoint: 0,
  earnings: 0,
  grade: '',
  profileImg: '',
  phone: '',
  accout: '',
};

const mockData = {
  isLogin: true,
  userId: 1,
  email: 'choji95@naver.com',
  password: 'pass1010!',
  nickname: '김코딩',
  accToken: '1111111111',
  point: 0,
  chargedPoint: 0,
  earnings: 0,
  grade: '브론즈',
  profileImg: '',
  phone: '01012341377',
  accout: '',
};
const stateKeys = Object.keys(initialState);
export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: mockData,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
    updateState: (state, action) => {
      for (let key in action.payload) {
        if (stateKeys.includes(key)) state[key] = action.payload[key];
      }
    },
    clearState: (state) => {
      state = { ...initialState };
    },
    // signup: (state, action) => {
    //   const { key, value } = action.payload;
    //   state[key] = value;
    // },
  },
});

export const { updateState, clearState } = userInfoSlice.actions;
export default userInfoSlice.reducer;
export const selectUserInfo = (state) => state.userInfo;

// inputHandler(e) {
//   this.setState({ [e.target.name]: e.target.value });
// }
