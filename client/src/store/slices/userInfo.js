import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
  id: '',
  email: '',
  password: '',
  nickname: '',
  accToken: '',
  point: 0,
  grade: '',
  profileImg: '',
  phoneNumber: '',
  accout: '',
};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
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
    // login: (state, action) => {
    //   const stateKeys = Object.keys(state);
    //   for (let key in action.payload) {
    //     if (key in stateKeys) state.key = action.payload.key;
    //   }
    // },
    logout: (state) => {
      state = { ...initialState };
    },
  },
});

export const { logout } = userInfoSlice.actions;
export default userInfoSlice.reducer;
export const selectUserInfo = (state) => state.userInfo;

// inputHandler(e) {
//   this.setState({ [e.target.name]: e.target.value });
// }
