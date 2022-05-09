import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { updateState } from '../store/slices/userInfo.js';

const Msg = styled.div`
  color: red;
  &.checked {
    color: blue;
  }
`;

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    phone: '',
    nickname: '',
  });
  const [checked, setChecked] = useState({
    emailCk: false,
    passwordCk: false,
    phoneCk: true, //나중에 고치기
    nicknameCk: true, //나중에 고치기
  });
  const [message, setMessage] = useState({
    emailMsg: null,
    passwordMsg: null,
    rePasswordMsg: null,
    phoneMsg: null,
    nicknameMsg: null,
    result: null,
  });
  const handleInputValue = (key) => (e) => {
    if (key === 'phone') {
      setUserInfo({ ...userInfo, [key]: `${e.target.value}` });
      setChecked({ ...checked, phoneCk: false });
    }
    setUserInfo({ ...userInfo, [key]: e.target.value });
    if (key === 'email') setChecked({ ...checked, emailCk: false });
    if (key === 'nickname') setChecked({ ...checked, nicknameCk: false });
  };

  //이메일 인증 버튼 클릭:
  const handleEmailCheck = (e) => {
    e.preventDefault();
    const emailRegex =
      /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

    if (!userInfo.email)
      return setMessage({
        ...message,
        emailMsg: '이메일을 입력해주세요.',
      });
    if (!emailRegex.test(userInfo.email))
      return setMessage({
        ...message,
        emailMsg: '이메일 형식으로 입력해주세요.',
      });

    //이메일 인증 api 작성...
    //모달창 뜨고 '해당 이메일로 인증번호가 발송되었습니다. 인증번호를 입력해주세요'라는 내용, 인증번호 입력창, 확인버튼, 에러메세지 포함.
    setChecked({ ...checked, emailCk: true });
    setMessage({ ...message, emailMsg: '인증되었습니다.' });
  };

  //비밀번호 유효성 검사
  const handlePwdCheck = (e) => {
    setUserInfo({ ...userInfo, password: e.target.value });
    setChecked({ ...checked, passwordCk: false });

    const pwdRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!pwdRegex.test(e.target.value)) {
      return setMessage({
        ...message,
        passwordMsg:
          '최소 8자, 하나 이상의 문자, 하나의 숫자와 특수 문자를 포함해야 합니다.',
      });
    }
    setMessage({ ...message, passwordMsg: '' });
  };

  //비밀번호 재확인
  const handlePwdReCheck = (e) => {
    setChecked({ ...checked, passwordCk: false });
    if (userInfo.password && e.target.value !== userInfo.password) {
      return setMessage({
        ...message,
        rePasswordMsg: '일치하지 않습니다.',
      });
    }
    setMessage({ ...message, rePasswordMsg: '' });
    setChecked({ ...checked, passwordCk: true });
  };

  //핸드폰 인증 버튼 클릭
  const handlePhoneCheck = (e) => {
    e.preventDefault();
    const phoneRegex = /^01([0|1|6|7|8|9])[-]+[0-9]{4}[-]+[0-9]{4}$/;
    if (!phoneRegex.test(userInfo.phone)) {
      return setMessage({
        ...message,
        phoneMsg: '형식에 맞지 않는 번호입니다.',
      });
    }
    //인증번호 받아서 인증하는 api...
    setMessage({ ...message, phoneMsg: '' });
    setChecked({ ...checked, phoneCk: true });
  };

  //닉네임 중복검사 클릭
  const handleNicknameCheck = (e) => {
    e.preventDefault();
    setChecked({ ...checked, nicknameCk: true }); //나중에 삭제
    // axios
    //   .get(`${process.env.REACT_APP_SERVER_DEV_URL}/check/${userInfo.nickname}`)
    //   .then((res) => setChecked({ ...checked, nicknameCk: true }))
    //   .catch((err) => {
    //     if (err.response === 'repeated') {
    //       return setMessage({
    //         ...message,
    //         nicknameMsg: '중복된 닉네임이 있습니다.',
    //       });
    //     }
    //     alert('서버 에러: 닉네임 중복 검사 요청 실패');
    //   });
    setMessage({ ...message, nicknameMsg: '사용 가능한 닉네임입니다.' });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const { email, password, phone, nickname } = userInfo;
    const { emailCk, passwordCk, phoneCk, nicknameCk } = checked;
    if (!email || !password || !phone || !nickname) {
      return setMessage({ ...message, result: '모두 입력해주세요.' });
    }

    if (!emailCk || !passwordCk || !phoneCk || !nicknameCk) {
      return setMessage({ ...message, result: '모두 인증해주세요.' });
    }

    setMessage({ ...message, result: '' });
    axios
      .post(
        'http://ec2-13-125-246-202.ap-northeast-2.compute.amazonaws.com/auth/signup',
        { email, password, phone, nickname },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        },
      )
      .then((res) => {
        const { id } = res.data;
        if (id) {
          alert('성공');
          dispatch(updateState({ id }));
          navigate(`/login`);
        }
      })
      .catch((err) => {
        console.log('에러: ', err);
        alert(err.response.message);
      });
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
          />
          <button onClick={handleEmailCheck}>인증</button>
          <Msg className={checked.emailCk ? 'email-msg checked' : 'email-msg'}>
            {message.emailMsg}
          </Msg>
        </div>
        <div>
          <input
            type="password"
            className="signup-password"
            placeholder="비밀번호"
            onChange={handlePwdCheck}
          />
          <Msg className="password-msg">{message.passwordMsg}</Msg>
          <input
            type="password"
            className="signup-rePassword"
            placeholder="비밀번호 재확인"
            onChange={handlePwdReCheck}
          />
          <Msg className="rePassword-msg">{message.rePasswordMsg}</Msg>
        </div>
        <div>
          <input
            type="tel"
            className="signup-phone"
            placeholder="010-0000-0000"
            onChange={handleInputValue('phone')}
          />
          <button onClick={handlePhoneCheck}>인증번호받기</button>
          <Msg className="phone-msg">{message.phoneMsg}</Msg>
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
          />
          <button onClick={handleNicknameCheck}>중복검사</button>
          <Msg className={checked.emailCk ? 'checked' : ''}>
            {message.nicknameMsg}
          </Msg>
        </div>
        <div className="signup-button">
          <button type="submit" onClick={handleSignup}>
            회원가입하기
          </button>
        </div>
      </div>
      <Msg className="alert-box">{message.result}</Msg>
    </div>
  );
}
export default Signup;
