import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counter';
import userInfoReducer from './slices/userInfo';

export default configureStore({
  reducer: {
    userInfo: userInfoReducer,
    counter: counterReducer,
  },
});
