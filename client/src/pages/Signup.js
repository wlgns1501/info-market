import React, { useState } from 'react';
import Header from '../component/Header';
import Footer from '../component/Footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();
  // const handleCreateId = () => {
  //   navigate(`/login`)
  // }

  const [isSignup, setIsSignup] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    phone: '',
    nickname: '',
  });

  const [errMessage, setErrMessage] = useState('');
  const handleInputValue = (key) => (e) => {
    setUserInfo({ ...userInfo, [key]: e.target.value });
  };

  const handleSignup = () => {
    setIsSignup(true);
    if (
      !userInfo.email ||
      !userInfo.password ||
      !userInfo.phone ||
      !userInfo.nickname
    ) {
      setErrMessage('모두 입력해 주세요');
    } else {
      axios.post(
        `http://localhost:3000/auth/signup`,
        {
          email: userInfo.email,
          password: userInfo.password,
          phone: userInfo.phone,
          nickname: userInfo.nickname,
        },
      )
      navigate(`/login`)
    }
    console.log(userInfo);
    // 추가적으로 닉네임 중복체크
  };
  return (
    <div className="signup">
      <div className="signup-input">
        <h1>회원가입</h1>
        <div>모든 항목은 필수 입니다</div>
        <div>
          <input
            type="email"
            className="signup-id"
            placeholder="아이디(email)"
            onChange={handleInputValue('email')}
          ></input>
          {/* <button>인증</button> */}
        </div>
        <div>
          <input
            type="password"
            className="signup-password"
            placeholder="비밀번호"
            onChange={handleInputValue('password')}
          ></input>
        </div>
        {/* <div>
            <input type='password' className='signup-password' placeholder='비밀번호 재확인' onChange={handleInputValue('password')}></input>
          </div> */}
        <div>
          <input
            type="tel"
            className="signup-phone"
            placeholder="핸드폰 번호"
            onChange={handleInputValue('phone')}
          ></input>
          {/* <button>인증번호받기</button> */}
        </div>
        {/* <div>
            <input type='text' className='signup-phone-check' placeholder='인증번호' onChange={handleInputValue('phone')}></input>
            <button>확인</button>
          </div> */}
        <div>
          <input
            type="text"
            className="signup-name"
            placeholder="닉네임"
            onChange={handleInputValue('nickname')}
          ></input>
        </div>
        <div className="signup-button">
          <button type="submit" onClick={handleSignup}>
            회원가입하기
          </button>
        </div>
      </div>
      <div className="alert-box">{errMessage}</div>
    </div>
  );
}
export default Signup;
