import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counter';
import userInfoReducer from './slices/userInfo';
import userPostReducer from './slices/userPost';
import purchaseDetailsReducer from './slices/purchaseDetails';

export default configureStore({
  reducer: {
    userInfo: userInfoReducer,
    counter: counterReducer, //테스트용
    userPost: userPostReducer,
    purchaseDetails: purchaseDetailsReducer,
  },
});
