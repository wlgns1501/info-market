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
            background-image: url(${(props) => props.img || user});
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
  const { id, nickname, profileImg, point, accToken, grade, earnings } =
    useSelector(selectUserInfo);
  const { modalOpen } = useSelector(selectPoint);
  const dispatch = useDispatch();

  const [image, setImage] = useState('');
  const [file, setFile] = useState('');
  const fileInput = useRef(null);

  const config = {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accToken}`,
    },
    withCredentials: true,
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_DEV_URL}/users/${id}`, config)
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

  const handleModalOpen = (e) => {
    e.preventDefault();
    dispatch(
      updatePointState({
        modalOpen: true,
      }),
    );
  };

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
      `${process.env.REACT_APP_SERVER_DEV_URL}`,
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
          <div className="user-photo">
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
          {/* </div> */}
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
