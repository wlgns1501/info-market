import React, { useState, useRef } from 'react';
import axios from 'axios';
import '../css/Login.css';
import logo from '../images/logo.png';
import { NavLink } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateState,
  clearState,
  selectUserInfo,
} from '../store/slices/userInfo.js';

function Login() {
  const navigate = useNavigate();
  const { state: sign } = useLocation();
  const dispatch = useDispatch();
  const { email, password } = useSelector(selectUserInfo);
  const [role, setRole] = useState('일반');
  const handleRegister = () => {
    navigate(`/tos`);
  };

  const [errorMessage, setErrorMessage] = useState('');

  const handleInputValue = (key) => (e) => {
    dispatch(updateState({ [key]: e.target.value }));
  };

  const handleLogin = () => {
    if (!email || !password) {
      return setErrorMessage('이메일과 비밀번호를 입력하세요');
    } else {
      const normalURL = `${process.env.REACT_APP_SERVER_DEV_URL}/auth/login`;
      const adminURL = `${process.env.REACT_APP_SERVER_DEV_URL}/admin/login`;
      axios
        .post(
          role === '관리자' ? adminURL : normalURL,
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
            //이전 페이지가 회원가입, 홈화면이면 메인으로 이동하게 하기.
            if (sign) navigate('/main');
            else navigate(-1);
          }
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

  const handleRoleCheck = (e) => {
    setRole(e.target.value);
  };

  return (
    <div style={{ height: '60vh' }} className="login-container">
      <div className="login-input">
        <div className="radio-btn">
          <input
            type="radio"
            name="role"
            value="일반"
            checked={role === '일반'}
            onChange={handleRoleCheck}
          />
          일반
          <input
            type="radio"
            name="role"
            value="관리자"
            checked={role === '관리자'}
            onChange={handleRoleCheck}
          />
          관리자
        </div>
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
