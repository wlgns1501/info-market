import logo from '../src/images/logo.png';
import './App.css';
import { BrowserRouter, Route, Link, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Login from './pages/Login';
import Tos from './pages/Tos';
import Signup from './pages/Signup';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  axios.defaults.withCredentials = true;

  // const T = [];

  /* 로그인상태 변경, 메인페이지 불러옴 */
  const isAuthenticated = () => {
    // axios
    //   .get(
    //     `http://ec2-13-125-246-202.ap-northeast-2.compute.amazonaws.com/auth/login`,
    //   )
    //   .then((res) => {
    //     setUserInfo(res.data.userInfo);
    //   })
    //   .catch((err) => err);
  };

  /* 로그인 요청 성공 */
  const handleResponseSuccess = () => {
    isAuthenticated();
    setIsLogin(true);
  };

  /* 로그아웃. 로그인 이후 메인페이지에서 체크 예정*/
  const handleLogout = () => {
    axios
      .post(
        `http://ec2-13-125-246-202.ap-northeast-2.compute.amazonaws.com/auth/logout`,
      )
      .then((res) => {
        setUserInfo(null);
        console.log(userInfo);
        setIsLogin(false);
      });
  };

  useEffect(() => {
    console.log('before', userInfo);
    isAuthenticated();
    console.log('after', userInfo);
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/login"
            element={<Login />}
            handleResponseSuccess={handleResponseSuccess}
          />
        </Routes>
        <Routes>
          <Route path="/tos" element={<Tos />} />
        </Routes>
        <Routes>
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
