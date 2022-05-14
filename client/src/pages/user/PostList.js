import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Search from '../../component/Search';
import Pagination from '../../component/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserInfo } from '../../store/slices/userInfo';
import { updateSearch, selectSearch } from '../../store/slices/search';
import { useNavigate, useLocation } from 'react-router-dom';
import QueryString from 'qs';
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
    targetPoint,
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
          {type === 'Paid' && (
            <span style={{ marginRight: '20px', border: '3px solid gold' }}>
              {targetPoint} P
            </span>
          )}
          <FontAwesomeIcon icon={faEye} /> {totalViews}
        </span>
      </div>
    </PostContainer>
  );
}

function PostList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { search_type, info_type, input_value } = QueryString.parse(
    location.search,
    {
      ignoreQueryPrefix: true,
    },
  );

  const { accToken } = useSelector(selectUserInfo);
  const { page, list } = useSelector(selectSearch);

  const getConfig = {
    headers: {
      Authorization: `Bearer ${accToken}`,
    },
    withCredentials: true,
  };

  const LIMIT = 10;
  const offset = page * LIMIT - LIMIT;

  useEffect(() => {
    //아래 코드는 그때 그때 다시 받지 않게 함.
    if (list.length > offset) return;
    const select1 = search_type || 'title';
    const select2 = info_type || 'All';

    const params = {
      search_type: select1,
      info_type: select2,
      pages: page,
      limit: LIMIT,
      [select1]: input_value,
    };

    axios
      .get(`${process.env.REACT_APP_SERVER_DEV_URL}/search`, {
        params,
        ...getConfig,
      })
      .then((res) => {
        const { count, rows } = res.data.info;
        console.log('검색 결과', res.data);
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
        console.log('###', err);
        // navigate(-1);
      });
  }, [page]);

  return (
    <EntireContainer>
      <Search />
      <ul className="postList">
        {list.slice(offset, offset + LIMIT).map((post) => {
          console.log('!!!', post);
          return <Post key={post.id} post={post} />;
        })}
        {list.length === 0 && <li>해당하는 정보가 없습니다.</li>}
      </ul>
      <Pagination />
    </EntireContainer>
  );
}

export default PostList;
