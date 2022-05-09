import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateState, selectUserInfo } from '../store/slices/userInfo';
import AWS from 'aws-sdk';
import styled from 'styled-components';
import { v1, v3, v4, v5 } from 'uuid';

// const [selectedFile, setSelectedFile] = useState(null);
// const [progress, setProgress] = useState(0);
// const [showAlert, setShowAlert] = useState(false);
// const [s3FileName, setS3FileName] = useState(null);

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

// const imgS3Url = `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/{파일명}`;

export const uploadFile = (file, type) => {
  let path = 'file';
  if (type === 'image') path = 'image';

  const fileName = `${path}/${v4().toString().replaceAll('-', '')}.${
    file.type.split('/')[1]
  }`;

  const params = {
    ACL: 'public-read-write',
    Body: file,
    Bucket: S3_BUCKET,
    Key: fileName,
  };

  myBucket
    .putObject(params, (err, data) => {
      if (data) {
        //서버로 profileImg 값 보내주기.
        dispatch(
          updateState({
            profileImg: fileName,
          }),
        );
      }
    })
    .on('httpUploadProgress', (evt) => {
      dispatch(
        updateState({
          progress: Math.round((evt.loaded / evt.total) * 100),
          showAlert: true,
        }),
      );
      setTimeout(() => {
        dispatch(
          updateState({
            showAlert: false,
            selectedFile: null,
          }),
        );
      }, 3000);
    })
    .send((err) => {
      if (err) console.log(err);
    });
};

export const deleteFile = (fileName) => {
  const params = {
    Bucket: S3_BUCKET,
    Key: fileName,
  };

  myBucket.deleteObject(params, (err, data) => {
    if (data) alert('삭제 성공');
    if (err) alert('실패 실패');
  });
};
