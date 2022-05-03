import React, { useState, useRef } from 'react';
import axios from 'axios';
import Header from '../component/Header';
import Footer from '../component/Footer';
import '../css/Login.css';
import logo from '../images/logo.png';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Login({ handleResponseSuccess }) {
  const navigate = useNavigate();
  const handleRegister = () => {
    navigate(`/tos`);
  };

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const handleInputValue = (key) => (e) => {
    setLoginInfo({ ...loginInfo, [key]: e.target.value });
  };

  const handleLogin = () => {
    if (!loginInfo.email || !loginInfo.password) {
      setErrorMessage('이메일과 비밀번호를 입력하세요');
    } else {
      axios
        .post(
          `http://ec2-13-125-246-202.ap-northeast-2.compute.amazonaws.com/auth/login`,
          {
            email: loginInfo.email,
            password: loginInfo.password,
          },
          {
            headers: { Accept: 'application/json' },
          },
        )
        .then((res) => {
          if (res.status === 200) {
            handleResponseSuccess();
            navigate('/main');
          }
        })
        .catch((err) => err);
    }
    console.log(loginInfo);
  };

  const kakaoOauth = useRef();
  const naverOauth = useRef();

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

  return (
    <div>
      <Header />
      <NavLink to="/">
        <img src={logo} alt="logo " className="login-logo" />
      </NavLink>
      <div className="login-container">
        <div className="login-input">
          <input
            type="email"
            className="login-id"
            placeholder="email을 입력하세요"
            onChange={handleInputValue('email')}
          />
          <input
            type="password"
            className="login-password"
            placeholder="password을 입력하세요"
            onChange={handleInputValue('password')}
          />
          <div>
            <button className="button" type="submit" onClick={handleLogin}>
              로그인
            </button>
            {!loginInfo.email && !loginInfo.password ? (
              <div className="alert-box">{errorMessage}</div>
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
      <Footer />
    </div>
  );
}

export default Login;
