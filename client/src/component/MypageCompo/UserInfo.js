import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import user from '../../images/user.png';
import Modal from '../../modals/Modal-1.js';
import { useDispatch, useSelector } from 'react-redux';
import { updateState, selectUserInfo } from '../../store/slices/userInfo';
import {
  selectPoint,
  updatePointState,
  inputPayment,
} from '../../store/slices/point';
import ChargeBox from '../ChargeBox';
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

const EntireContainer = styled.div`
  border: 5px solid blue;
  height: 100%;
  @media screen and (max-width: 800px) {
    font-size: 0.9rem;
  }
  @media screen and (max-width: 590px) {
    font-size: 0.7rem;
  }
  > div.modal div.content {
    max-width: 600px;
    background-color: #f3f702;
    @media screen and (max-width: 700px) {
      > div.charge-box {
        font-size: 0.8rem;
        > input,
        button {
          font-size: inherit;
        }
      }
    }
  }
  > ul#user-Info-container {
    margin-top: 0;
    border: 5px solid orange;
    min-height: 25%;
    display: flex;
    list-style: none;
    padding-left: 0;
    align-items: center;
    justify-content: space-around;
    > li {
      border: 1px dotted black;
      height: 200px;
      &.profile {
        /* flex: 3; */
        min-width: 35%;
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        @media screen and (max-width: 800px) {
          flex-direction: column;
        }
        > div {
          border: 3px solid purple;
          margin: 0 5px 0 5px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          > figure {
            margin: 0;
            margin-bottom: 8px;
            border: 1px solid black;
            min-width: 80px;
            min-height: 80px;
            border-radius: 50%;
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            @media screen and (max-width: 700px) {
              min-width: 60px;
              min-height: 60px;
            }
          }
        }
      }
      &.my-points {
        /* flex: 2; */
        min-width: 35%;
        display: flex;
        justify-content: center;
        /* align-items: center; */
        border: 1px solid green;

        > div.detail {
          border: 2px solid black;
          /* flex: 6; */
          width: 85%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: stretch;
          > div {
            border: 1px solid blue;
            margin: 0;
            /* width: 80%; */
            &#charged {
              /* margin-bottom: 5%; */
            }
            &#earnings {
              /* margin-bottom: 7px; */
            }
            > p {
              border: 1px solid orange;
              margin: 0;
              text-align: center;
              &.amount {
                padding: 3%;
              }
            }
          }
        }
      }

      &.charging-withdrawal {
        /* flex: 2; */
        min-width: 30%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        > button {
          margin: 10px 0;
          padding: 2%;
          font-size: 1rem;
          @media screen and (max-width: 800px) {
            font-size: 0.9rem;
          }
          @media screen and (max-width: 590px) {
            font-size: 0.7rem;
          }
        }
      }
    }
  }
`;

function UserInfo() {
  const dispatch = useDispatch();
  const {
    id,
    nickname,
    profileImg,
    point,
    accToken,
    grade,
    earnings,
    previewImg,
    progress,
    showAlert,
  } = useSelector(selectUserInfo);
  const { modalOpen } = useSelector(selectPoint);
  const fileInput = useRef(null);
  const [selectedFile, setSelectedFile] = useState('');
  // const [ProfileURL, setProfileURL] = useState('');

  //서버 통신 헤더
  const config = {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accToken}`,
    },
    withCredentials: true,
  };

  //처음 렌더링때 작동: 유저정보 불러오기
  useEffect(() => {
    axios
      .get(
        `http://ec2-13-125-246-202.ap-northeast-2.compute.amazonaws.com/users/${id}`,
        config,
      )
      .then((res) => {
        const { user } = res.data;
        if (user) {
          delete user.password;
          dispatch(updateState({ ...user }));
        }
      })
      .catch((err) => {
        alert('회원정보 불러오기 실패');
      });
  }, []);

  //포인트 결제 모달 열기
  const handleModalOpen = (e) => {
    e.preventDefault();
    dispatch(
      updatePointState({
        modalOpen: true,
      }),
    );
  };

  //프로필 사진을 클릭하면 파일 업로드 input창이 클릭됨.
  const profileBtnClick = (e) => {
    e.preventDefault();
    fileInput.current.click();
  };

  //선택한 이미지파일 --> 미리보기
  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        dispatch(
          updateState({
            previewImg: reader.result,
          }),
        );
        resolve();
      };
    });
  };

  //모달 안의 프로필 변경 버튼 클릭: s3에 파일 전송됨.
  const saveImg = (file, path) => {
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
        //서버로 profileImg 값 보내주기.(일단 임시로 작성)
        axios
          .post(
            `${process.env.REACT_APP_SERVER_DEV_URL}/users/${id}`,
            { profileImg: fileName },
            config,
          )
          .then((res) => {
            dispatch(
              updateState({
                profileImg: fileName,
              }),
            );
          })
          .catch((err) => alert('파일업로드 주소가 서버에 반영 안 됨.'));
        //아래 코드는 서버랑 연동되면 삭제
        dispatch(
          updateState({
            profileImg: fileName,
          }),
        );
      })
      .on('httpUploadProgress', (evt) => {
        dispatch(
          updateState({
            progress: Math.round((evt.loaded / evt.total) * 100),
            showAlert: true,
          }),
        );
        setTimeout(() => {
          setSelectedFile('');
          dispatch(
            updateState({
              showAlert: false,
              previewImg: null,
            }),
          );
        }, 2000);
      })
      .send((err) => {
        if (err) console.log(err);
      });
  };

  //기본 이미지로 변경 버튼 클릭
  const resetImg = () => {
    //s3 이미지 삭제후, 서버에 반영하고 난 후 아래코드 작동.
    dispatch(
      updateState({
        profileImg: null,
      }),
    );
  };

  return (
    <EntireContainer>
      {modalOpen && (
        <Modal
          handleBtnClick={() =>
            dispatch(
              updatePointState({
                modalOpen: false,
              }),
            )
          }
          content={<ChargeBox />}
        />
      )}
      {previewImg && (
        <Modal
          content={
            <div>
              <img
                src={previewImg}
                style={{
                  height: '15vh',
                }}
                alt="preview-img"
              />
              <button
                onClick={() => saveImg(selectedFile, 'image')}
                disabled={showAlert}
              >
                프로필 변경하기
              </button>
              <button
                disabled={showAlert}
                onClick={() =>
                  dispatch(
                    updateState({
                      previewImg: null,
                    }),
                  )
                }
              >
                취소
              </button>
              {showAlert && <p>업로드 진행률: {progress} %</p>}
            </div>
          }
          handleBtnClick={() => dispatch(updateState({ previewImg: null }))}
        />
      )}
      <ul id="user-Info-container">
        <li className="profile">
          <input
            type="file"
            style={{ display: 'none' }}
            accept="image/*"
            name="profile-img"
            onChange={(e) => {
              setSelectedFile(e.target.files[0]);
              encodeFileToBase64(e.target.files[0]);
            }}
            ref={fileInput}
          />
          <div className="user-photo">
            <figure
              // img={`https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/${profileImg}`}
              // img="https://info-market-upload.s3.ap-northeast-2.amazonaws.com/image/afa0493f428c4050ba1859f290a3d7d6.jpeg"
              style={{
                backgroundImage: `url(${
                  profileImg
                    ? `https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/` +
                      profileImg
                    : user
                })`,
              }}
              onClick={profileBtnClick}
            />
            {profileImg && (
              <button onClick={resetImg}>기본 이미지로 변경</button>
            )}
          </div>
          <div style={{ whiteSpace: 'nowrap' }}>{nickname}</div>
          <div style={{ whiteSpace: 'nowrap' }}>{grade}</div>
        </li>
        <li className="my-points">
          <div className="detail">
            <div id="charged">
              <p style={{ whiteSpace: 'nowrap' }}>충전 포인트</p>
              <p className="amount">{point} P</p>
            </div>
            <div id="earnings">
              <p style={{ whiteSpace: 'nowrap' }}>누적 수익 포인트</p>
              <p className="amount">{earnings} P</p>
            </div>
          </div>
        </li>
        <li className="charging-withdrawal">
          <button onClick={handleModalOpen} style={{ whiteSpace: 'nowrap' }}>
            포인트 충전
          </button>
          <button style={{ whiteSpace: 'nowrap' }}>포인트 출금</button>
        </li>
      </ul>
      <Outlet />
    </EntireContainer>
  );
}

export default UserInfo;
