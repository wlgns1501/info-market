import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counter';
import userInfoReducer from './slices/userInfo';
import userPostReducer from './slices/userPost';
import purchaseDetailsReducer from './slices/purchaseDetails';
import pointReducer from './slices/point';
import postListReducer from './slices/postList';
import selectedPostReducer from './slices/selectedPost';

export default configureStore({
  reducer: {
    userInfo: userInfoReducer,
    counter: counterReducer, //테스트용
    userPost: userPostReducer, //삭제?
    purchaseDetails: purchaseDetailsReducer, //삭제?
    point: pointReducer,
    postList: postListReducer, //삭제?
    selectedPost: selectedPostReducer,
  },
});
