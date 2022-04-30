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
  const isAuthenticated = () => {
    axios
      .get(`http://localhost:3000/auth/login`)
      .then((res) => {
        setUserInfo(res.data.userInfo);
      })
      .catch((err) => err);
  };

  /* 로그인 요청 성공 */
  const handleResponseSuccess = () => {
    isAuthenticated();
    setIsLogin(true);
  };

  /* 로그아웃. 로그인 이후 메인페이지에서 체크 예정*/
  const handleLogout = () => {
    axios.post(`http://localhost:3000/auth/logout`).then((res) => {
      setUserInfo(null);
      console.log(userInfo);
      setIsLogin(false);
    });
  };

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
            {/* <Route path="PostList">
              <Route index element={<PostList />} />
              <Route path=":postId" element={<Post />} />
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
