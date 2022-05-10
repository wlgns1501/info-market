import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectUserInfo } from '../../store/slices/userInfo';
import AWS from 'aws-sdk';
import { v1, v3, v4, v5 } from 'uuid';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoins } from '@fortawesome/free-solid-svg-icons';

const ACCESS_KEY = process.env.REACT_APP_AWS_ACCESS_KEY_ID;
const SECRET_ACCESS_KEY = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
const REGION = process.env.REACT_APP_AWS_DEFAULT_REGION;
const S3_BUCKET = process.env.REACT_APP_AWS_BUCKET;

AWS.config.update({
  accessKeyId: ACCESS_KEY,
  secretAccessKey: SECRET_ACCESS_KEY,
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

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
  const { id, accToken } = useSelector(selectUserInfo);
  const config = {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accToken}`,
    },
    withCredentials: true,
  };

  //파일 업로드 input
  const fileInput = useRef(null);

  //게시글 제목, 내용 입력값
  const [textValues, setTextValues] = useState({
    title: null,
    content: null,
  });

  //업로드할 파일 입력값
  const [selectedFile, setSelectedFile] = useState(null);

  //확인용... 나중에 삭제하기
  useEffect(() => {
    console.log(textValues, selectedFile);
  }, [textValues, selectedFile]);

  //업로드 버튼 클릭(파일 없이)
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(11111111111);
    // axios
    //   .post(
    //     `${process.env.REACT_APP_SERVER_DEV_URL}/info`,
    //     {
    //       type: 'Free',
    //       targetPoint: 0,
    //       ...textValues,
    //     },
    //     config,
    //   )
    //   .then((res) => {
    //     if (res.data.infoId) alert('글이 등록되었습니다.');
    //     setTextValues({
    //       title: null,
    //       content: null,
    //     });
    //   })
    //   .catch((err) => {
    //     alert('서버 에러 발생! 다시 시도해주세요.');
    //   });
  };

  //업로드 버튼 클릭(파일 업로드)
  const handleSubmitWithFile = (e) => {
    e.preventDefault();
    console.log(2222222);
    //loading indicator 사용하기
    // const fileName = `file/${v4().toString().replaceAll('-', '')}.${
    //   file.type.split('/')[1]
    // }`;

    // const params = {
    //   ACL: 'public-read-write',
    //   Body: selectedFile,
    //   Bucket: S3_BUCKET,
    //   Key: fileName,
    // };

    // myBucket.putObject(params, (err, data) => {
    //   //서버로 파일 경로 보내주기.(일단 임시로 작성)
    //   axios
    //     .post(
    //       `${process.env.REACT_APP_SERVER_DEV_URL}/info`,
    //       {
    //         type: 'Free',
    //         targetPoint: 0,
    //         ...textValues,
    //         fileURL: fileName,
    //       },
    //       config,
    //     )
    //     .then((res) => {
    //       if (res.data.infoId) alert('글이 등록되었습니다.');
    //       setTextValues({
    //         title: null,
    //         content: null,
    //       });
    //       setSelectedFile(null);
    //     })
    //     .catch((err) => alert('파일업로드 주소가 서버에 반영 안 됨.'));
    // });
  };

  //파일 선택
  const handleInputChange = (e) => {
    // const fileObj = e.target.files[0];
    // const ext = fileObj.name.split('.').pop();
    setSelectedFile(e.target.files[0]);
  };

  //파일 선택 취소
  const handleCancel = (e) => {
    e.preventDefault();
    fileInput.current.value = null;
    setSelectedFile(null);
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
      <div className="file-upload">
        <input
          type="file"
          // accept="image/*, .pdf, .hwp, application/vnd.ms-excel, text/plain, text/html"
          onChange={handleInputChange}
          ref={fileInput}
        />
        <button onClick={handleCancel}>파일 취소</button>
      </div>
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
          onClick={selectedFile ? handleSubmitWithFile : handleSubmit}
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
