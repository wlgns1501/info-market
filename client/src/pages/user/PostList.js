import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Search from '../../component/Search';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserInfo } from '../../store/slices/userInfo';
import { updateSearch, selectSearch } from '../../store/slices/search';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EntireContainer = styled.div``;

function Post({ post }) {}

function PostList() {
  const navigate = useNavigate();
  const { accToken } = useSelector(selectUserInfo);
  const { inputVal, selectBox1, selectBox2 } = useSelector(selectSearch);

  const getConfig = {
    headers: {
      Authorization: `Bearer ${accToken}`,
    },
    withCredentials: true,
  };

  const [page, setPage] = useState(1);
  const LIMIT = 10;
  const offset = page * LIMIT - LIMIT;
  const [totalCount, setTotalCount] = useState(null);
  const [list, setList] = useState([]);
  const totalPage = Math.ceil(Number(totalCount) / LIMIT);

  useEffect(() => {
    const params = {
      search_type: selectBox1,
      info_type: selectBox2,
      pages: page,
      limit: LIMIT,
      inputVal, //고치기
    };
    axios
      .get(`${process.env.REACT_APP_SERVER_DEV_URL}/search`, {
        params,
        ...getConfig,
      })
      .then((res) => {
        console.log('검색 결과: ', res.data);
        const { count, rows } = res.data.info;
        if (count && page === 1) setTotalCount(count);
        if (rows) setList([...list, ...rows]);
      })
      .catch((err) => {
        alert(err.response.message);
        navigate(-1);
      });
  }, [page]);

  return (
    <EntireContainer>
      <button disabled={page === totalPage} onClick={() => setPage(page + 1)}>
        다음
      </button>
      <button disabled={page === 1} onClick={() => setPage(page - 1)}>
        이전
      </button>
      <Search />
      {list.slice(offset, offset + LIMIT).map((post) => {
        <Post key={post.id} post={post} />;
      })}
    </EntireContainer>
  );
}

export default PostList;
