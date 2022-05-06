import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import UserInfo from '../../component/MypageCompo/UserInfo';
import UserInfoChange from '../../component/MypageCompo/UserInfoChange';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateState, selectUserInfo } from '../../store/slices/userInfo';
import axios from 'axios';

function Mypage() {
  const navigate = useNavigate();
  const { id, accToken } = useSelector(selectUserInfo);
  const dispatch = useDispatch();

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
          navigate('/mypage/info/change');
        }
      })
      .catch((err) => {
        alert('회원정보 불러오기 실패');
        navigate(-1);
      });
  }, []);

  return <div>마이페이지 입니다.</div>;
}

export default Mypage;
