import React, { useState, useRef } from 'react';
import axios from 'axios';
import '../css/Login.css';
import logo from '../images/logo.png';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateState,
  clearState,
  selectUserInfo,
} from '../store/slices/userInfo.js';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email, password } = useSelector(selectUserInfo);

  const handleRegister = () => {
    navigate(`/tos`);
  };

  // const [loginInfo, setLoginInfo] = useState({
  //   email: '',
  //   password: '',
  // });

  const [errorMessage, setErrorMessage] = useState('');

  const handleInputValue = (key) => (e) => {
    // setLoginInfo({ ...loginInfo, [key]: e.target.value });
    dispatch(updateState({ [key]: e.target.value }));
  };

  const handleLogin = () => {
    if (!email || !password) {
      return setErrorMessage('이메일과 비밀번호를 입력하세요');
    } else {
      axios
        .post(
          `http://ec2-13-125-246-202.ap-northeast-2.compute.amazonaws.com/auth/login`,
          { email, password },
          {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
          },
        )
        .then((res) => {
          if (res.data) {
            dispatch(
              updateState({
                ...res.data,
                isLogin: true,
              }),
            );
            navigate('/main');
          }
          return;
        })
        .catch((err) => {
          dispatch(clearState());
          const { message } = err.response.data;
          if (message) setErrorMessage(message);
        });
    }
  };

  const kakaoOauth = useRef();
  const naverOauth = useRef();
  const loginRef = useRef();
  /* 카카오, 네이버 로그인 관련 부분
    배포 및 사이트 등록이 완료되면, 해당 도메인을 redirect_uri 등록하여 bit.ly 주소를 받을 수 있음
    임시로 타 프로젝트와 연동한 부분
  */
  const handleOauth = (oauth) => {
    if (oauth === kakaoOauth) {
      window.open('https://bit.ly/37DB7qp');
    }
    if (oauth === naverOauth) {
      window.open('https://bit.ly/3rIXmCH');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') loginRef.current.click();
  };
  return (
    //   <NavLink to='/'>
    //     <img src={logo} alt='logo ' className='login-logo' />
    //   </NavLink>
    <div className="login-container">
      <div className="login-input">
        <input
          type="email"
          className="login-id"
          placeholder="email을 입력하세요"
          onChange={handleInputValue('email')}
          onKeyPress={handleKeyPress}
        />
        <input
          type="password"
          className="login-password"
          placeholder="password을 입력하세요"
          onChange={handleInputValue('password')}
          onKeyPress={handleKeyPress}
        />
        <div>
          <button
            className="button"
            type="submit"
            onClick={handleLogin}
            ref={loginRef}
          >
            로그인
          </button>
          {!email || !password ? (
            <div className="alert-box" style={{ color: 'red' }}>
              {errorMessage}
            </div>
          ) : null}
        </div>
        <div>
          <div>
            <button
              className="kakao-login"
              onClick={() => handleOauth(kakaoOauth)}
              ref={kakaoOauth}
            >
              카카오 로그인
            </button>
            <button
              className="naver-login"
              onClick={() => handleOauth(naverOauth)}
              ref={naverOauth}
            >
              네이버 로그인
            </button>
          </div>
          <div>
            <button className="button">아이디 찾기</button>
            <button className="button">비밀번호 찾기</button>
            <button className="button" onClick={handleRegister}>
              회원가입
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
