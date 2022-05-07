import { createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';

const initialState = {
  paymentInput: {
    amount: null,
    buyer_tel: '',
    buyer_email: '',
  },
  modalOpen: false,
};
const stateKeys = Object.keys(initialState);
export const pointSlice = createSlice({
  name: 'point',
  initialState,
  reducers: {
    inputPayment: (state, action) => {
      state.paymentInput = { ...action.payload };
    },
    updatePointState: (state, action) => {
      for (let key in action.payload) {
        if (stateKeys.includes(key)) state[key] = action.payload[key];
      }
    },
    initPayment: (state) => {
      state.paymentInput = { ...initialState.paymentInput };
    },
    // clearState: (state) => {
    //   stateKeys.forEach((el) => {
    //     state[el] = initialState[el];
    //   });
    // },
  },
});

export const { inputPayment, updatePointState, initPayment } =
  pointSlice.actions;
export default pointSlice.reducer;
export const selectPoint = (state) => state.point;
