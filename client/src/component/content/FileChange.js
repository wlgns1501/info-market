import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserInfo } from '../../store/slices/userInfo';
import {
  updatePostState,
  selectSelectedPost,
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

export default function FileChange() {
  const dispatch = useDispatch();
  const { modifyFileStep, fileChangeValue, type } =
    useSelector(selectSelectedPost);

  const deleteFile = (fileName) => {
    const params = {
      Bucket: S3_BUCKET,
      Key: fileName,
    };

    myBucket.deleteObject(params, (err, data) => {
      if (data) console.log('기존 파일 삭제 성공');
      if (err) console.log('기존 파일 삭제 실패');
    });
  };

  //파일 변경이 있을 때 s3에 새로운 파일을 올리고, 기존파일을 삭제해야 함.
  useEffect(() => {
    if (!modifyFileStep) return;

    const fileName = `file/${v4().toString().replaceAll('-', '')}.${
      fileChangeValue.type.split('/')[1]
    }`;

    const params = {
      ACL: 'public-read-write',
      Body: fileChangeValue,
      Bucket: S3_BUCKET,
      Key: fileName,
    };

    myBucket.putObject(params, (err, data) => {
      //업로드된 파일 이름을 selectedPostSlice에 저장.
      //예상못한 에러로 data가 아닌 err 객체가 전달됨.
      //근데 파일은 잘 업로드됨.
      //기존 파일 삭제하기
      const params = {
        Bucket: S3_BUCKET,
        Key: fileName,
      };

      myBucket.deleteObject(params, (err, data) => {
        if (data) console.log('기존 파일 삭제 성공');
        if (err) console.log('기존 파일 삭제 실패');
      });

      dispatch(
        updatePostState({
          modifyFileStep: false,
          modifyTextStep: true,
          modyfiedFileName: fileName,
        }),
      );
    });
  }, [modifyFileStep]);

  //파일 업로드 input
  const fileInput = useRef(null);

  //파일 선택
  const handleInputChange = (e) => {
    dispatch(
      updatePostState({
        fileChangeValue: e.target.files[0],
      }),
    );
  };

  //파일 선택 취소
  const handleCancel = (e) => {
    e.preventDefault();
    fileInput.current.value = null;
    dispatch(
      updatePostState({
        fileChangeValue: null,
      }),
    );
  };

  return (
    //파일 입력 폼
    <div className="file-upload">
      <input type="file" onChange={handleInputChange} ref={fileInput} />
      <button onClick={handleCancel}>파일 취소</button>
    </div>
  );
}
