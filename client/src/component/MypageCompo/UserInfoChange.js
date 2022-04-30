import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faLockOpen } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateState,
  clearState,
  selectUserInfo,
} from '../../store/slices/userInfo';
import axios from 'axios';

const EntireContainer = styled.div`
  border: 5px solid red;
  height: 57%;
  display: flex;
  > div.first {
    border: 1px solid black;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > .key {
      font-size: 2rem;
    }
    > input {
      margin: 10% 0;
      width: 60%;
    }
    > button {
      width: 30%;
    }
  }
  > form.second {
    border: 1px solid gold;
    flex: 2;
    display: flex;
    flex-direction: column;
    > div.modifying-box {
      border: 3px solid green;
      flex: 9;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      > div.input-box {
        border: 1px solid red;
        margin-bottom: 10px;
        > input {
          font-size: 1rem;
        }
        > p {
          margin: 0;
          font-size: 0.8rem;
        }
        > input#new-pwd-check {
          margin-top: 1rem;
        }
      }
      > div#pwd-box {
        display: flex;
        flex-direction: column;
      }
      > button.account {
        min-width: 20%;
        padding: 2%;
        background-color: orange;
        font-size: 1rem;
      }
    }
    > div.confirm {
      padding: 2%;
      border: 3px solid black;
      flex: 1;
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
      > button {
        margin-right: 2%;
        font-size: 1rem;
      }
    }
  }
`;

function UserInfoChange() {
  const {
    userId,
    email,
    password,
    nickname,
    profileImg,
    point,
    accToken,
    grade,
    chargedPoint,
    earnings,
    phone,
  } = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  const config = {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accToken}`,
    },
    withCredentials: true,
  };

  const [locked, setLocked] = useState(true);
  const [pwdCheckInput, setPwdCheckInput] = useState('');
  const [inputVal, setInputVal] = useState({
    email: '',
    nickname: '',
    phone: '',
    password: '',
    rePwd: '',
    account: '',
    phoneAuthentication: false,
    emailAuthentication: false,
  });
  const [errorMsg, setErrorMsg] = useState({
    email: '',
    nickname: '',
    phone: '',
    password: '',
    rePwd: '',
  });

  const checkPwd = () => {
    if (pwdCheckInput === password) setLocked(false);
    setPwdCheckInput('');
  };

  const handleChange = (e) => {
    setInputVal({ ...inputVal, [e.target.name]: e.target.value });
  };

  const phoneAuthentication = (e) => {
    e.preventDefault();
    if (e.target.value === phone)
      return setErrorMsg({
        ...errorMsg,
        [e.target.name]: '이미 인증된 번호입니다.',
      });
  };

  const emailAuthentication = (e) => {
    e.preventDefault();
  };

  const handleInput = (e) => {
    handleChange(e);
    console.log('4: ', inputVal);
    const { name, value, placeholder } = e.target;

    if (
      (name === 'password' && value === password) ||
      (name !== 'password' && value === placeholder)
    ) {
      return setErrorMsg({ ...errorMsg, [name]: '변화가 없습니다.' });
    }

    const emailRegex =
      /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
    const pwdRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (!value) return setErrorMsg({ ...errorMsg, [name]: '' });
    if (name === 'email' && !emailRegex.test(value)) {
      return setErrorMsg({ ...errorMsg, email: '이메일 형식으로 적어주세요.' });
    } else if (
      name === 'email' &&
      emailRegex.test(value) &&
      !inputVal.emailAuthentication
    ) {
      return setErrorMsg({
        ...errorMsg,
        email: '인증해주세요.',
      });
    } else if (name === 'nickname') {
      axios
        .get(`http://localhost:8080/check/${value}`)
        .then((res) => {
          const { message } = res.data;
          if (message && message !== 'ok')
            return setErrorMsg({
              ...errorMsg,
              nickname: '중복된 닉네임이 있습니다.',
            });
        })
        .catch((err) => {
          alert('서버 에러 발생! 다시 시도해주세요.');
          setInputVal({ ...inputVal, nickname: '' });
        });
    } else if (name === 'phone' && !phoneRegex.test(value)) {
      return setErrorMsg({
        ...errorMsg,
        phone: '휴대폰 번호 형식으로 적어주세요.',
      });
    } else if (
      name === 'phone' &&
      phoneRegex.test(value) &&
      !inputVal.phoneAuthentication
    ) {
      return setErrorMsg({
        ...errorMsg,
        phone: '인증해주세요.',
      });
    } else if (name === 'password' && !pwdRegex.test(value)) {
      console.log('1: ', inputVal.password);
      return setErrorMsg({
        ...errorMsg,
        password: '최소 8자, 하나 이상의 문자, 하나의 숫자와 특수 문자 포함',
      });
    } else if (name === 'rePwd' && inputVal.password !== inputVal.rePwd) {
      return setErrorMsg({
        ...errorMsg,
        rePwd: '일치하지 않습니다.',
      });
    }
    setErrorMsg({ ...errorMsg, [name]: '' });
  };

  //에러 메세지가 안 뜨면서, 수정된 값이 있을 때만 수정 버튼 활성화
  const activateUpdateBtn = () => {
    const { email, nickname, phone, password } = inputVal;
    return (
      !locked &&
      inputVal.password === inputVal.rePwd &&
      Object.values(errorMsg).every((val) => val === '') &&
      [email, nickname, phone, password].some((val) => val !== '')
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const {email, nickname, phone, password} = inputVal;
    // const list = [email, nickname, phone, password].filter(el => el !== '');

    // axios.post(`http://localhost:8080/users/${userId}`, {

    // }, config)
  };

  const handleWithdrawal = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:8080/auth/${userId}`, config)
      .then((res) => dispatch(clearState()))
      .catch((err) => alert('서버 에러 발생! 다시 시도해주세요.'));
  };

  return (
    <EntireContainer>
      <div className="first">
        <FontAwesomeIcon
          className="pwd-check key"
          icon={locked ? faLock : faLockOpen}
        />
        <input
          type="password"
          className="pwd-check"
          placeholder={locked ? 'password' : 'checked'}
          disabled={!locked}
          value={pwdCheckInput}
          onChange={(e) => setPwdCheckInput(e.target.value)}
        />
        <button className="pwd-check" disabled={!locked} onClick={checkPwd}>
          확인
        </button>
      </div>
      <form className="second">
        <div className="modifying-box">
          <div className="input-box">
            <input
              name="email"
              className="content"
              type="email"
              placeholder={email}
              disabled={locked}
              onChange={handleInput}
            />
            <button disabled={locked} onClick={emailAuthentication}>
              인증
            </button>
            <p className="error-message">{errorMsg.email}</p>
          </div>

          <div className="input-box">
            <input
              name="nickname"
              value={inputVal.nickname}
              className="content"
              type="text"
              placeholder={nickname}
              disabled={locked}
              onChange={handleChange}
              onBlur={handleInput}
            />
            <p className="error-message">{errorMsg.nickname}</p>
          </div>

          <div className="input-box">
            <input
              name="phone"
              className="content"
              type="tel"
              placeholder={phone}
              disabled={locked}
              onChange={handleInput}
            />
            <button disabled={locked} onClick={phoneAuthentication}>
              인증
            </button>
            <p className="error-message">{errorMsg.phone}</p>
          </div>

          <div id="pwd-box" className="input-box">
            <input
              name="password"
              id="new-pwd"
              type="password"
              value={inputVal.password}
              placeholder="새 비밀번호"
              disabled={locked}
              onChange={handleInput}
            />
            <p className="error-message">{errorMsg.password}</p>
            <input
              name="rePwd"
              id="new-pwd-check"
              type="password"
              value={inputVal.rePwd}
              placeholder="비밀번호 확인"
              disabled={locked}
              onChange={handleChange}
              onBlur={handleInput}
            />
            <p className="error-message">{errorMsg.rePwd}</p>
          </div>
          <button
            style={{ whiteSpace: 'nowrap' }}
            className="account"
            // disabled={locked}
            disabled
          >
            계좌 인증 하기
          </button>
        </div>
        <div className="confirm">
          <button disabled={locked} onClick={handleWithdrawal}>
            회원 탈퇴
          </button>
          <button disabled={!activateUpdateBtn()} onClick={handleSubmit}>
            수정
          </button>
        </div>
      </form>
    </EntireContainer>
  );
}

export default UserInfoChange;
