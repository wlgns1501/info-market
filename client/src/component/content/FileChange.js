import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserInfo } from '../../store/slices/userInfo';
import {
  updatePostState,
  selectSelectedPost,
  deleteFile,
} from '../../store/slices/selectedPost';
import AWS from 'aws-sdk';
import { v1, v3, v4, v5 } from 'uuid';

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

const FileBtn = styled.button`
  display: none;
  &.selected {
    display: inline-block;
  }
`;

export default function FileChange() {
  const dispatch = useDispatch();
  const { modifyFileStep, fileURL } = useSelector(selectSelectedPost);
  const [selectedFile, setSelectedFile] = useState('');

  //파일 변경이 있을 때 s3에 새로운 파일을 올리고, 기존파일을 삭제해야 함.
  useEffect(() => {
    if (!modifyFileStep) return;

    const fileName = `file/${v4().toString().replaceAll('-', '')}.${
      selectedFile.type.split('/')[1]
    }`;

    const putParams = {
      ACL: 'public-read-write',
      Body: selectedFile,
      Bucket: S3_BUCKET,
      Key: fileName,
    };

    myBucket.putObject(putParams, (err, data) => {
      console.log('err: ', err);
      console.log('data: ', data);
    });

    if (fileURL) dispatch(deleteFile());

    dispatch(
      updatePostState({
        modyfiedFileName: fileName,
        modifyFileStep: false,
        modifyTextStep: true,
      }),
    );
    setSelectedFile('');
  }, [modifyFileStep]);

  //파일 업로드 input
  const fileInput = useRef(null);

  //파일 선택
  const handleInputChange = (e) => {
    setSelectedFile(e.target.files[0]);
    dispatch(
      updatePostState({
        fileChange: true,
      }),
    );
  };

  //파일 선택 취소
  const handleCancel = (e) => {
    e.preventDefault();
    fileInput.current.value = null;
    setSelectedFile('');
    dispatch(
      updatePostState({
        fileChange: false,
      }),
    );
  };

  return (
    //파일 입력 폼
    <div className="file-upload">
      <input type="file" onChange={handleInputChange} ref={fileInput} />
      <FileBtn className={selectedFile && 'selected'} onClick={handleCancel}>
        파일 취소
      </FileBtn>
    </div>
  );
}
