import React, { useState, useEffect } from 'react';
import Search from '../../component/Search';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { updateState, selectUserInfo } from '../../store/slices/userInfo';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import searchBack from '../../images/searchBack.jpg';
import gold from '../../images/gold.png';
import second from '../../images/second.png';
import third from '../../images/third.png';

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
        box-shadow: 7px 5px 2px black;
        margin-bottom: 7px;
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
  grid-row: 2 / 9;
  opacity: 0.9;
  border-top: 0;
  display: grid;
  grid-template-columns: repeat(1, minmax(100%, auto));
  grid-template-rows: repeat(20, minmax(100px, auto));
  overflow-y: auto;
  overflow-x: hidden;
  gap: 10px 0px;
  min-width: 600px;
  > li {
    border: 0;
    background-color: whitesmoke;
    opacity: 0.9;
    padding: 2%;
    &#top10_title {
      font-size: 1.5rem;
      font-weight: bold;
      color: black;
      line-height: 1.5rem;
      vertical-align: center;
      padding-top: 5%;
    }

    &.top10_post {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  > div#ad {
    min-height: 500px;
    font-weight: bolder;
    font-family: '순천B';
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 1410px) {
      flex-direction: column;
    }
    @media screen and (max-width: 600px) {
      display: none;
    }
    > span {
      font-size: 40px;
      &.first {
        margin-right: 8px;
        @media screen and (max-width: 1410px) {
          margin-right: 0px;
          margin-bottom: 20px;
        }
      }
      @media screen and (max-width: 1000px) {
        font-size: 35px;
      }
      @media screen and (max-width: 600px) {
        font-size: 30px;
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
    <li className="top10_post">
      {order === 1 && <img src={gold} />}
      {order === 2 && <img src={second} />}
      {order === 3 && <img src={third} />}
      <p style={{ overflow: 'hidden' }} className="title" onClick={handleClick}>
        {title}
      </p>

      <p className="writer">{nickname}</p>
    </li>
  );
}

function List({ posts, className }) {
  return (
    <UlContainer className={className}>
      <li id="top10_title">Top 10 인기 정보글</li>
      {posts.map((post, idx) => (
        <Post key={post.id} post={post} order={idx + 1} />
      ))}
      <div id="ad">
        <span className="first">당신이 가진 정보가</span>
        <span>돈이 됩니다!</span>
      </div>
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
