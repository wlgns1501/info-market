import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Search from '../../component/Search';
import Pagination from '../../component/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserInfo } from '../../store/slices/userInfo';
import { updateSearch, selectSearch } from '../../store/slices/search';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faEye, faUser } from '@fortawesome/free-solid-svg-icons';

const EntireContainer = styled.div`
  > ul {
    list-style: none;
    padding: 0;
    display: flex;
  }
`;
const PostContainer = styled.li``;

function Post({ post }) {
  const navigate = useNavigate();
  const {
    id: postId,
    title,
    nickname,
    content,
    totalLikes,
    totalViews,
    createdAt,
    updatedAt,
    userId,
    type,
  } = post;

  const day = createdAt.split('T')[0];

  //type으로 유료, 무료 구분해서 디자인하기
  return (
    <PostContainer>
      <div className="writer_createdAt">
        <span className="writer">
          <span className="icon">
            <FontAwesomeIcon icon={faUser} />
          </span>
          {nickname}
        </span>
        <span className="createdAt">{day}</span>
      </div>
      <p
        className="title"
        style={{ cursor: 'pointer' }}
        onClick={() => navigate(`/main/search/${postId}`)}
      >
        {title}
      </p>
      <div className="total_Likes_Views">
        <span className="totalLikes">
          <FontAwesomeIcon icon={faThumbsUp} /> {totalLikes}
        </span>
        <span className="totalViews">
          <FontAwesomeIcon icon={faEye} /> {totalViews}
        </span>
      </div>
    </PostContainer>
  );
}

function PostList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accToken } = useSelector(selectUserInfo);
  const { inputVal, selectBox1, selectBox2, page, list, totalPage } =
    useSelector(selectSearch);

  const getConfig = {
    headers: {
      Authorization: `Bearer ${accToken}`,
    },
    withCredentials: true,
  };

  const LIMIT = 10;
  const offset = page * LIMIT - LIMIT;

  useEffect(() => {
    const params = {
      search_type: selectBox1,
      info_type: selectBox2,
      pages: page,
      limit: LIMIT,
      [selectBox1]: inputVal,
    };

    axios
      .get(`${process.env.REACT_APP_SERVER_DEV_URL}/search`, {
        params,
        ...getConfig,
      })
      .then((res) => {
        const { count, rows } = res.data.info;
        if (count && page === 1) {
          const totalPage = Math.ceil(Number(count) / LIMIT);
          const totalMark = Math.ceil(totalPage / 10);
          dispatch(
            updateSearch({
              totalCount: count,
              totalPage,
              totalMark,
            }),
          );
        }
        if (rows) dispatch(updateSearch({ list: [...rows] }));
      })
      .catch((err) => {
        alert(err.response.message);
        navigate(-1);
      });
  }, [page]);

  return (
    <EntireContainer>
      <Search />
      <ul className="postList">
        {list.slice(offset, offset + LIMIT).map((post) => {
          <Post key={post.id} post={post} />;
        })}
        {list.length === 0 && <li>해당하는 정보가 없습니다.</li>}
      </ul>
      <Pagination />
    </EntireContainer>
  );
}

export default PostList;
