import React, { useState, useEffect } from 'react';
import Search from '../../component/Search';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { updateState, selectUserInfo } from '../../store/slices/userInfo';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import gold from '../../images/gold.png';
import second from '../../images/second.png';
import third from '../../images/third.png';
import main from '../../images/main.jpeg';
import bulb from '../../images/bulb.jpeg';

const EntireContainer = styled.div`
  border: 0;
  height: 90vh;
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, minmax(100px, auto));

  > div.top {
    border: 0;
    grid-column: 1 / 5;
    grid-row: 1 / 8;
    background-image: url(${main});
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    display: grid;
  }

  > div.bar {
    grid-column: 5 / 9;
    grid-row: 2;
    align-items: end;
    justify-self: center;
    border: 0;
    width: 90%;
    > form {
      border: 0;
      background-color: #ccccba;
      opacity: 0.7;
      padding: 15px 25px;
      box-shadow: 7px 5px 2px #a5a690;
      margin-bottom: 15px;
      z-index: 100;
    }
  }
`;

const UlContainer = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  border: 15px solid #ccccba;
  border-radius: 10px;
  width: 90%;
  grid-column: 5 / 9;
  grid-row: 2 / 8;
  justify-self: center;
  opacity: 0.8;
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
    padding: 2%;
    &#top10_title {
      font-size: 1.5rem;
      font-weight: bolder;
      color: black;
      line-height: 1.5rem;
      vertical-align: center;
      padding-top: 5%;
      background-color: white;
      color: #403d3d;
      > span {
        border-bottom: 5px solid #c90e2a;
        border-radius: 5px;
        color: #09429e;
      }
    }

    &.top10_post {
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 5px 7px 3px lightgray;
      margin-bottom: 10px;
      /* opacity: 0.9; */
      font-weight: bold;
      font-size: 1.1rem;
      > span.head {
        /* border: 1px solid red; */
        display: flex;
        align-items: center;
        width: 90%;

        > p.title {
          margin-left: 10px;
          border-bottom: 2px solid gray;
          cursor: pointer;
          box-shadow: 0px 1px 2px gray;
          overflow: hidden;
        }
      }
      > p.writer {
        font-size: 1rem;
        color: white;
        background-color: #6b1170;
        padding: 3px 1px;
      }
    }
  }
  > div img#ad {
    margin-top: 15px;
    grid-column: 1;
    grid-row: 2 / 6;
    width: 100%;
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
      <span className="head">
        {order === 1 && <img src={gold} />}
        {order === 2 && <img src={second} />}
        {order === 3 && <img src={third} />}
        <p className="title" onClick={handleClick}>
          {title}
        </p>
      </span>
      <p className="writer">{nickname}</p>
    </li>
  );
}

function List({ posts, className }) {
  return (
    <UlContainer className={className}>
      <li id="top10_title">
        Best Info <span>TOP 10</span>
      </li>
      {posts.map((post, idx) => (
        <Post key={post.id} post={post} order={idx + 1} />
      ))}
      <div>
        <img id="ad" src={bulb} />
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
        <div className="top" />
        <Search />
        <List posts={list} />
      </EntireContainer>
    </>
  );
}

export default Mainpage;
