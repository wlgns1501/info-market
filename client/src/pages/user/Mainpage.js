import React, { useState, useEffect } from 'react';
import Search from '../../component/Search';
import styled from 'styled-components';
import freeBoardData from '../../mockdata/freeBoardData';
import { useDispatch, useSelector } from 'react-redux';
import { updateState, selectUserInfo } from '../../store/slices/userInfo';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EntireContainer = styled.div`
  margin: auto auto;
  width: 120vh;
  height: 80vh;
  border: 5px solid red;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  > div.top {
    width: 100%;
    border: 2px solid orange;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: palegreen; */
    > div.bar {
      width: 80%;
    }
  }
`;

const UlContainer = styled.ul`
  list-style: none;
  padding: 0;
  border: 2px solid blue;
  margin: 0;
  width: 45%;
  margin-top: -30px;
  &.first {
    margin-right: 5%;
    border: 3px solid yellow;
  }
  > li {
    border: 1px solid black;
    display: flex;
    > p {
      &.title {
        width: 90%;
        overflow: hidden;
      }
      &.writer {
        text-align: center;
        width: 10%;
        border-left: 2px solid gray;
        margin-left: 10px;
      }
    }
  }
`;

function Post({ post, order }) {
  const navigate = useNavigate();
  const { id: postId, title, nickname, userId } = post;

  const handleClick = () => {
    navigate(`main/search/${postId}`);
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
  const { posts } = freeBoardData; //임시
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
        </div>
        <List posts={list} />
      </EntireContainer>
    </>
  );
}

export default Mainpage;
