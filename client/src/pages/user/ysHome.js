import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  increment,
  decrement,
  incrementByAmount,
  selectCount,
} from '../../store/slices/counter.js';
import Modal from '../../modals/Modal-1';
import Payment from '../../component/Payment.js';
import AWS from 'aws-sdk';
import styled from 'styled-components';
import { v1, v3, v4, v5 } from 'uuid';

const ImgBox = styled.div`
  /* background-image: url('https://info-market-upload.s3.ap-northeast-2.amazonaws.com/upload/%EC%97%AC%EC%9E%901.jpg'); */
  background-image: ${(props) => `url(${props.name})`};
  width: 800px;
  height: 500px;
`;

function Home() {
  // const [isOpen, setIsOpen] = useState(false);
  // const count = useSelector(selectCount);
  // const dispatch = useDispatch();

  // const modalToggle = () => {
  //   setIsOpen(!isOpen);
  // };
  // const handleButtonClick = useCallback((e) => {
  //   e.stopPropagation();
  //   setIsOpen((nextIsOpen) => !nextIsOpen);
  // }, []);

  // useEffect(() => {
  //   if (!isOpen) return;

  //   const handleClickOutside = () => setIsOpen(false);
  //   window.addEventListener('click', handleClickOutside);

  //   return () => {
  //     window.removeEventListener('click', handleClickOutside);
  //   };
  // }, [isOpen]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [s3FileName, setS3FileName] = useState(null);
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

  const imgS3Url = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/{파일명}`;

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    // if (file.type !== 'image/jpeg' || fileExt !== 'jpg') {
    //   alert('jpg 파일만 Upload 가능합니다.');
    //   return;
    // }
    setSelectedFile(e.target.files[0]);
  };

  // Key: `image/${v4().toString().replaceAll("-", "")}.${
  //   file.type.split("/")[1]
  // }`

  const uploadFile = (file) => {
    const fileName = `image/${v4().toString().replaceAll('-', '')}.${
      file.type.split('/')[1]
    }`;
    setS3FileName(fileName);
    const params = {
      ACL: 'public-read-write',
      Body: file,
      Bucket: S3_BUCKET,
      // Key: 'upload/' + file.name,
      Key: fileName,
    };

    myBucket
      .putObject(params)
      .on('httpUploadProgress', (evt) => {
        setProgress(Math.round((evt.loaded / evt.total) * 100));
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          setSelectedFile(null);
        }, 3000);
        console.log('evt: ', evt);
      })
      .send((err) => {
        if (err) console.log(err);
      });
  };

  const deleteFile = (fileName) => {
    const params = {
      Bucket: S3_BUCKET,
      Key: 'upload/' + fileName,
    };

    myBucket.deleteObject(params, (err, data) => {
      if (data) alert('성공: ', data);
      if (err) alert('실패: ', err);
    });
  };

  return (
    <div>
      {/* {isOpen ? (
        <Modal handleBtnClick={modalToggle} content={'모달 테스트'} />
      ) : (
        ''
      )}
      Home 입니다.
      <button onClick={modalToggle}>모달 열기</button>
      <div>
        <button onClick={() => dispatch(increment())}>increment</button>
        <div>count is {count}</div>
        <button onClick={() => dispatch(decrement())}>decrement</button>
        <button onClick={() => dispatch(incrementByAmount(5))}>
          5 increment
        </button>
      </div>
      <Payment /> */}
      <input
        type="file"
        name="img"
        accept="image/*"
        onChange={handleFileInput}
      />
      <input
        type="file"
        name="file"
        accept="파일 확장자"
        onChange={handleFileInput}
      />
      {selectedFile ? (
        <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
      ) : null}
      {showAlert ? (
        <p>업로드 진행률 : {progress}%</p>
      ) : (
        <p>파일을 선택해 주세요.</p>
      )}
      {/* <img src="https://info-market-upload.s3.ap-northeast-2.amazonaws.com/upload/%EC%97%AC%EC%9E%901.jpg" /> */}
      <ImgBox name="" />
      {/* <a href="https://info-market-upload.s3.ap-northeast-2.amazonaws.com/upload/search.jpg">
        다운받기
      </a> */}
      <button onClick={() => deleteFile('search.jpg')}>삭제하기</button>
    </div>
  );
}

export default Home;
