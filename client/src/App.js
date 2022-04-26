import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Login from './pages/Login';
import Tos from './pages/Tos';
import Signup from './pages/Signup';
import Header from './component/Header';
import Footer from './component/Footer';
import Home from './pages/user/Home';
import SideBar from './component/MypageCompo/SideBar';
import FreeWriting from './component/MypageCompo/FreeWriting';
import SalesWriting from './component/MypageCompo/SalesWriting';
import MyPosts from './component/MypageCompo/MyPosts';
import PaidPosts from './component/MypageCompo/PaidPosts';
import ChargedPointList from './component/MypageCompo/ChargedPointList';
import RefundList from './component/MypageCompo/RefundList';
import UserInfoChange from './component/MypageCompo/UserInfoChange';
import UserInfo from './component/MypageCompo/UserInfo';
import Mypage from './pages/user/Mypage';
import Mainpage from './pages/user/Mainpage';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  // const T = [];

  /* 로그인상태 변경, 메인페이지 불러옴 */

  // /* 로그인 요청 성공 */
  // const handleResponseSuccess = () => {
  //   setIsLogin(true);
  // };

  // /* 로그아웃 */
  // const handleLogout = () => {
  //   axios.post(`https://localhost:3000/auth/logout`).then((res) => {
  //     setUserInfo(null);
  //     console.log(userInfo);
  //     setIsLogin(false);
  //   });
  // };

  useEffect(() => {
    console.log('before', userInfo);
    // isAuthenticated();
    console.log('after', userInfo);
  }, []);

  return (
    <BrowserRouter>
      {/* <div className="App"> */}
      <Header />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="tos" element={<Tos />} />
          <Route path="signup" element={<Signup />} />
          <Route path="main" element={<Mainpage />}>
            {/* <Route path="freePostList">
              <Route index element={<FreePostList />} />
              <Route path=":postId" element={<FreePost />} />
            </Route>
            <Route path="salesPostList">
              <Route index element={<SalesPostList />} />
              <Route path=":postId" element={<SalesPost />} />
            </Route> */}
          </Route>
          <Route path="mypage" element={<SideBar />}>
            <Route index element={<Mypage />} />
            <Route path="info" element={<UserInfo />}>
              <Route path="change" element={<UserInfoChange />} />
              <Route path="myposts" element={<MyPosts />} />
              <Route path="paidPosts" element={<PaidPosts />} />
              <Route path="chargedPointList" element={<ChargedPointList />} />
              <Route path="refundList" element={<RefundList />} />
            </Route>
            <Route path="freeWriting" element={<FreeWriting />} />
            <Route path="salesWriting" element={<SalesWriting />} />
          </Route>
          {/* <Route path="admin" element={<Admin />} />
          <Route path="*" element={<NotFoundPage />} /> */}
        </Route>
      </Routes>
      <Footer />
      {/* </div> */}
    </BrowserRouter>
  );
}

export default App;
