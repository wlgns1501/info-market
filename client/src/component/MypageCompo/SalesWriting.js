import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import UploadFiles from './UploadFiles';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../store/slices/userInfo';
import { useNavigate } from 'react-router-dom';
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
    > div.form-group {
      border: 3px dotted blue;
      display: flex;
      min-width: 95%;
      align-items: center;
      justify-content: space-between;
      padding: 1%;
      > label input {
        border: 1px dotted red;
      }
      > div.alert {
      }
    }
    > div.submit {
      border: 1px dotted red;
      width: 95%;
      height: 5%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1%;
      > input#price {
        font-size: 1rem;
        max-width: 120px;
        @media screen and (max-width: 1024px) {
          font-size: 0.9rem;
        }
        @media screen and (max-width: 600px) {
          font-size: 0.8rem;
        }
      }
      > button#save {
        font-size: 1rem;
        padding: 0.3em;
        appearance: none;
        background-color: #f5f5f5;
        border: 1px solid gray;
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
  const uploadReferenece = React.createRef();
  const [textValues, setTextValues] = useState({
    title: null,
    content: null,
    targetPoint: null,
  });

  const handleTextChange = (e) => {
    setTextValues({
      ...textValues,
      [e.target.name]: e.target.value,
    });
  };

  async function onClickSearch(e) {
    e.preventDefault();
    await uploadReferenece.current
      .upload(textValues)
      .then((result) => {
        // const fileURL = result;
        if (result) alert('저장 완료');
      })
      .catch((err) => {
        alert('서버 에러 발생! 다시 시도해주세요.');
      });
  }

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
        onChange={handleTextChange}
      ></textarea>
      <textarea
        name="content"
        id="content"
        // rows="10"
        // cols="55"
        placeholder="내용"
        value={textValues.content}
        onChange={handleTextChange}
      ></textarea>
      <UploadFiles ref={uploadReferenece} />
      <div className="submit">
        <input
          id="price"
          name="targetPoint"
          type="text"
          placeholder="가격"
          value={textValues.targetPoint}
          onChange={handleTextChange}
        />
        <button
          id="save"
          disabled={
            !textValues.title || !textValues.content || !textValues.targetPoint
          }
          onClick={onClickSearch}
        >
          작성 완료
        </button>
      </div>
    </form>
  );
}

function SalesWriting() {
  const { isLogin, grade } = useSelector(selectUserInfo);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLogin) return navigate('/main');
    if (grade === 'Bronze') {
      alert('실버 등급부터 가능합니다.');
      navigate(-1);
    }
  }, []);

  return (
    <WritingContainer>
      <Writing />
    </WritingContainer>
  );
}

export default SalesWriting;
