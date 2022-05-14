import React, { useState, useEffect } from 'react';
import Search from '../../component/Search';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { updateState, selectUserInfo } from '../../store/slices/userInfo';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import searchBack from '../../images/searchBack.jpg';

const EntireContainer = styled.div`
  border: 0;
  height: 100vh;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, minmax(100px, auto));

  > div.top {
    border: 0;
    grid-column: 1 / 9;
    grid-row: 1 / 9;
    background-image: url(${searchBack});
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(10, minmax(100px, auto));

    > div.bar {
      grid-column: 6 / 10;
      grid-row: 2;
      align-items: end;
      border: 0;
      > form {
        border: 0;
        background-color: white;
        opacity: 0.8;
        padding: 10px 20px;
      }
    }
  }
`;

const UlContainer = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  border: 15px solid white;
  border-radius: 10px;
  grid-column: 6 / 10;
  grid-row: 2 / 10;
  opacity: 0.9;
  border-top: 0;
  &.first {
  }
  > li {
    > p {
      &.title {
        /* width: 90%; */
        overflow: hidden;
      }
      &.writer {
        /* text-align: center;
        width: 10%;
        border-left: 2px solid gray;
        margin-left: 10px; */
      }
    }
  }
`;

function Post({ post, order }) {
  const navigate = useNavigate();
  const { id: postId, title, nickname, userId } = post;

  const handleClick = () => {
    navigate(`/main/search/${postId}`);
  };

  return (
    <li>
      <span>{order}</span>
      <p className="title" onClick={handleClick}>
        {title}
      </p>
      <p className="writer">{nickname}</p>
    </li>
  );
}

function List({ posts, className }) {
  return (
    <UlContainer className={className}>
      {posts.map((post, idx) => (
        <Post key={post.id} post={post} order={idx + 1} />
      ))}
    </UlContainer>
  );
}

function Mainpage() {
  const { accToken } = useSelector(selectUserInfo);
  const [list, setList] = useState([]);

  const getConfig = {
    headers: {
      Authorization: `Bearer ${accToken}`,
    },
    withCredentials: true,
  };

  useEffect(() => {
    //인기 top 10개
    const infoURL = `${process.env.REACT_APP_SERVER_DEV_URL}/info`;
    axios
      .get(infoURL, getConfig)
      .then((res) => {
        const { info } = res.data;
        setList([...list, ...info]);
      })
      .catch((err) => {
        if (err.response?.message) alert(err.response.message);
      });
  }, []);

  return (
    <>
      <EntireContainer>
        <div className="top">
          <Search />
          <List posts={list} />
        </div>
      </EntireContainer>
    </>
  );
}

export default Mainpage;
