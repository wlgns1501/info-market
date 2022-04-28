import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import user from '../../images/user.png';
import Modal from '../../modals/Modal-1.js';
import { useDispatch, useSelector } from 'react-redux';
import { updateState, selectUserInfo } from '../../store/slices/userInfo';

const EntireContainer = styled.div`
  border: 5px solid yellow;
  height: 100%;
  > ul#user-Info-container {
    margin-top: 0;
    border: 5px solid orange;
    height: 25%;
    display: flex;
    list-style: none;
    padding-left: 0;
    align-items: center;
    > li {
      border: 1px dotted black;

      &.profile {
        flex: 3;
        display: flex;
        justify-content: center;
        align-items: center;
        display: flex;
        justify-content: space-evenly;
        > p {
          border: 1px solid purple;
          margin: 0 5px 0 5px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          > figure {
            margin: 0;
            margin-bottom: 8px;
            border: 1px solid black;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background-image: url(${(props) => props.img || user});
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
          }
        }
      }
      &.my-points {
        flex: 2;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid green;
        > div.point-container {
          width: 90%;
          border: 1px solid red;
          display: flex;
          flex-direction: column;
          > p.title {
            margin: 0;
            padding: 2%;
            border: 1px solid black;
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          > div.detail {
            border: 1px solid black;
            flex: 6;
            /* padding: 2%; */
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            > p {
              border: 1px solid blue;
              margin: 0;
              text-align: center;
            }
            > div#charged {
              border: 1px solid blue;
              margin: 10% auto;
              > p {
                border: 1px solid orange;
                margin: 0;
                text-align: center;
              }
            }
            > div#earnings {
              border: 1px solid blue;
              > p {
                border: 1px solid orange;
                margin: 0;
                text-align: center;
              }
            }
          }
        }
      }

      &.charging-withdrawal {
        flex: 2;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        > button {
          margin: 10px 0;
          padding: 2%;
          font-size: 1rem;
        }
      }
    }
  }
`;

function UserInfo() {
  const {
    nickname,
    profileImg,
    point,
    accToken,
    grade,
    chargedPoint,
    earnings,
  } = useSelector(selectUserInfo);
  const dispatch = useDispatch();

  const [image, setImage] = useState('');
  const [file, setFile] = useState('');
  const fileInput = useRef(null);

  const profileBtnClick = (e) => {
    e.preventDefault();
    fileInput.current.click();
  };

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImage(reader.result);
        resolve();
      };
    });
  };

  const saveImg = async () => {
    //loading indicator: true
    const formData = new FormData();
    formData.append('file', file);

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        Authorization: `Bearer ${accToken}`,
      },
      withCredentials: true,
    };
    const response = await axios.post(
      'http://localhost:8080',
      formData,
      config,
    );
    // dispatch(updateState({
    //   profileImg: response.data//어쩌구..
    // }))
    //loading indicator: false
    setImage('');
  };

  return (
    <EntireContainer>
      {image && (
        <Modal
          content={
            <div>
              <img
                src={image}
                style={{
                  height: '15vh',
                }}
                alt="preview-img"
              />
              <button onClick={saveImg}>업로드</button>
              <button onClick={() => setImage('')}>취소</button>
            </div>
          }
          handleBtnClick={() => setImage('')}
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
              setFile(e.target.files[0]);
              encodeFileToBase64(e.target.files[0]);
            }}
            ref={fileInput}
          />
          <p className="user-photo">
            <figure img={profileImg} onClick={profileBtnClick} />
            {profileImg && (
              <button
                onClick={() => {
                  dispatch(
                    updateState({
                      profileImg: '',
                    }),
                  );
                }}
              >
                기본 이미지로 변경
              </button>
            )}
          </p>
          <p style={{ whiteSpace: 'nowrap' }}>{nickname}</p>
          <p style={{ whiteSpace: 'nowrap' }}>{grade}</p>
        </li>
        <li className="my-points">
          <div className="point-container">
            <p className="title" style={{ whiteSpace: 'nowrap' }}>
              보유 포인트
            </p>
            <div className="detail">
              <p>{point} P</p>
              <div id="charged">
                <p style={{ whiteSpace: 'nowrap' }}>충전 포인트</p>
                <p>{chargedPoint} P</p>
              </div>
              <div id="earnings">
                <p style={{ whiteSpace: 'nowrap' }}>누적 수익 포인트</p>
                <p>{earnings} P</p>
              </div>
            </div>
          </div>
        </li>
        <li className="charging-withdrawal">
          <button style={{ whiteSpace: 'nowrap' }}>포인트 충전</button>
          <button style={{ whiteSpace: 'nowrap' }}>포인트 출금</button>
        </li>
      </ul>
      <Outlet />
    </EntireContainer>
  );
}

export default UserInfo;
