import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserInfo } from '../../store/slices/userInfo';
import {
  updatePostState,
  selectSelectedPost,
} from '../../store/slices/selectedPost';
import ContentFree from '../content/ContentFree';
import ContentPaid from '../content/ContentPaid';

function Post() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { postId } = useParams();
  const { accToken } = useSelector(selectUserInfo);
  const { type } = useSelector(selectSelectedPost);

  const getConfig = {
    headers: {
      Authorization: `Bearer ${accToken}`,
    },
    withCredentials: true,
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_DEV_URL}/info/${postId}`, getConfig)
      .then((res) => {
        const { info, reply } = res.data;
        dispatch(updatePostState({ reviews: [...reply], ...info.rows }));
        //조회수는 애초에 get 요청 보내질 때 서버에서 조회수 1 더하고 응답하는 걸로...
      })
      .catch((err) => {
        alert('게시물을 불러올 수 없습니다.');
        navigate(-1);
      });
  }, []);

  return type === 'Free' ? <ContentFree /> : <ContentPaid />;
}

export default Post;
