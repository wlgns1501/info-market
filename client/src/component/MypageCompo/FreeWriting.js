import { freeze } from '@reduxjs/toolkit';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../store/slices/userInfo';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoins } from '@fortawesome/free-solid-svg-icons';

const WritingContainer = styled.div`
  border: 3px solid skyblue;
  height: 80%;
  width: 100%;
  > form {
    border: 3px solid yellow;
    height: 100%;
    width: 99%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > textarea {
      font-size: 1rem;
      width: 95%;
      &#title {
        margin-top: 2%;
        margin-bottom: 2%;
        height: 2rem;
      }
      &#content {
        flex-grow: 1;
      }
    }
    > div.submit {
      /* margin: 2% 2% 1% auto; */
      display: flex;
      width: 95%;
      justify-content: flex-end;
      align-items: center;
      border: 1px solid green;
      > span.msg {
        display: none;
        &.alert {
          display: inline-block;
          color: red;
          font-size: 0.8rem;
        }
      }
      > button#submit {
        margin-left: 2%;
        font-size: 1rem;
        padding: 0.5em;
        background-color: #f5f5f5;
        border: 1px solid gray;
        cursor: pointer;
        @media screen and (max-width: 1024px) {
          font-size: 0.9rem;
        }
        @media screen and (max-width: 600px) {
          font-size: 0.8rem;
        }
      }
    }
  }
`;

function Writing() {
  const { accToken } = useSelector(selectUserInfo);
  const config = {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accToken}`,
    },
    withCredentials: true,
  };
  const [textValues, setTextValues] = useState({
    title: null,
    content: null,
  });

  //확인용... 나중에 삭제하기
  useEffect(() => {
    console.log(textValues);
  }, [textValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${process.env.REACT_APP_SERVER_DEV_URL}/info`,
        {
          type: 'Free',
          targetPoint: 0,
          ...textValues,
        },
        config,
      )
      .then((res) => {
        if (res.data.infoId) alert('글이 등록되었습니다.');
        setTextValues({
          title: null,
          content: null,
        });
      })
      .catch((err) => {
        alert('서버 에러 발생! 다시 시도해주세요.');
      });
  };

  return (
    <form>
      <textarea
        name="title"
        id="title"
        rows="1"
        cols="55"
        placeholder="제목"
        maxlength="100"
        value={textValues.title}
        onChange={(e) =>
          setTextValues({ ...textValues, title: e.target.value })
        }
      ></textarea>
      <textarea
        name="content"
        id="content"
        // rows="10"
        // cols="55"
        placeholder="내용"
        value={textValues.content}
        onChange={(e) =>
          setTextValues({ ...textValues, content: e.target.value })
        }
      ></textarea>
      <div className="submit">
        <span
          className={
            textValues.title && textValues.content ? 'msg' : 'msg alert'
          }
        >
          제목과 내용 모두 작성해주세요.
        </span>
        <button
          id="submit"
          disabled={!textValues.title || !textValues.content}
          onClick={handleSubmit}
        >
          작성 완료
        </button>
      </div>
    </form>
  );
}

function FreeWriting() {
  return (
    <WritingContainer>
      <Writing />
    </WritingContainer>
  );
}

export default FreeWriting;
