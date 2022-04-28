import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey } from '@fortawesome/free-solid-svg-icons';

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
      border: 1px solid green;
      flex: 8;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      > .modifying-content {
        width: 40%;
        margin-bottom: 5%;
      }
      > div#pwd-box {
        display: flex;
        flex-direction: column;
        > input#new-pwd {
          margin-bottom: 2%;
        }
      }
      > button {
        width: 30%;
        padding: 2%;
      }
    }
    > div.confirm {
      padding: 2%;
      border: 1px solid black;
      flex: 2;
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
      > button {
        margin-right: 2%;
        padding: 2%;
      }
    }
  }
`;

function UserInfoChange() {
  return (
    <EntireContainer>
      <div className="first">
        <FontAwesomeIcon className="pwd-check key" icon={faKey} />
        <input type="password" className="pwd-check" />
        <button className="pwd-check">확인</button>
      </div>
      <form className="second">
        <div className="modifying-box">
          <input
            className="modifying-content"
            type="email"
            placeholder="이메일"
          />
          <input
            className="modifying-content"
            type="text"
            placeholder="닉네임"
          />
          <input
            className="modifying-content"
            type="tel"
            placeholder="핸드폰"
          />
          <div id="pwd-box" className="modifying-content">
            <input id="new-pwd" type="password" placeholder="새 비밀번호" />
            <input type="password" placeholder="비밀번호 확인" />
          </div>
          <button style={{ whiteSpace: 'nowrap' }} className="modifying-btn">
            계좌 인증 하기
          </button>
        </div>
        <div className="confirm">
          <button>회원 탈퇴</button>
          <button>수정</button>
        </div>
      </form>
    </EntireContainer>
  );
}

export default UserInfoChange;
