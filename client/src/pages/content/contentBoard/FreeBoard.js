import React from 'react';
import { useCallback, useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons';
import { faEye, faUser } from '@fortawesome/free-solid-svg-icons';
import freeBoardData from '../../../mockdata/freeBoardData';
const { posts, total } = freeBoardData;

const EntireContainer = styled.div`
  display: flex;
  background-color: #faf9f5;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  min-height: 78vh;
  /* border: 3px solid blue; */
  overflow-y: scroll;
  > div#order {
    position: fixed;
    background-color: #e68feb;
    opacity: 0.9;
    width: 50%;
    padding: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* border: 1px solid #afb3b0; */
    border-radius: 8px;
    box-shadow: 3px 3px 3px #e3e6e4;
    > span {
      &.count {
        margin-right: 5px;
      }
    }
  }
  > ul.postList {
    /* border: 3px solid red; */
    list-style: none;
    padding: 0;
    width: 52%;
    height: 600px;
    padding: 1%;
    > li.post {
      border: 1px solid black;
      background-color: white;
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 15px;
      }
      > div.writer_createdAt {
        border: 1px dotted black;
        padding: 5px;
        display: flex;
        justify-content: space-between;
        > span {
          border: 2px dotted purple;
          &.writer {
            > span.icon {
              margin-right: 10px;
            }
          }
          &.createdAt {
          }
        }
      }
      > p.title {
        border: 1px dotted black;
        margin: 0;
        padding: 5px;
        margin-top: 3px;
        margin-bottom: 2px;
        display: inline-block;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        width: 100%;
      }
      > div.total_Likes_Views {
        border: 1px dotted black;
        padding: 5px;
        display: flex;
        justify-content: space-between;
        > span {
          border: 1px dotted orange;
          &.totalLikes {
          }
        }
      }
    }
  }
`;

function Post({ post }) {
  const {
    id,
    title,
    writer,
    content,
    totalLikes,
    reviews,
    totalViews,
    createdAt,
    updatedAt,
  } = post;

  const day = createdAt.split(' ')[0];
  return (
    <li className="post">
      <div className="writer_createdAt">
        <span className="writer">
          <span className="icon">
            <FontAwesomeIcon icon={faUser} />
          </span>
          {writer}
        </span>
        <span className="createdAt">{day}</span>
      </div>
      <p className="title">{title}</p>
      {/* <p className="content">{content}</p> */}
      <div className="total_Likes_Views">
        <span className="totalLikes">
          <FontAwesomeIcon icon={faThumbsUp} /> {totalLikes}
        </span>
        <span className="totalViews">
          <FontAwesomeIcon icon={faEye} /> {totalViews}
        </span>
      </div>
    </li>
  );
}

function FreeBoard() {
  const [list, setList] = useState([]);
  // const [list, setList] = useState([...posts.slice(0, 8)]);
  const [page, setPage] = useState(1);
  const [totalCnt, setTotalCnt] = useState(null);
  const LIMIT = 6;
  const elm = useRef(null);

  useEffect(() => {
    console.log('@', process.env.REACT_APP_SERVER_DEV_URL);
    axios
      .get(`http://localhost:80/test/freeBoard?pages=${page}&limit=${LIMIT}`)
      .then((res) => {
        const { rows, total } = res.data;
        if (!rows || !rows.length) {
          // alert('마지막 페이지입니다.');
          return;
        }
        setList([...list, ...rows]);
        setTotalCnt(total);
      })
      .catch((err) => console.log(err));
  }, [page]);

  const handleScroll = (e) => {
    if (e.target.clientHeight + e.target.scrollTop === e.target.scrollHeight)
      setPage((prevState) => prevState + 1);
  };
  return (
    <EntireContainer id="box" ref={elm} onScroll={handleScroll}>
      <div id="order">
        <span className="latest_popularity">
          <input type="radio" name="info_order" value="최신순" defaultChecked />
          최신순
          <input
            type="radio"
            name="info_order"
            value="인기순"
            style={{ marginLeft: '10px' }}
          />
          인기순
        </span>
        <span className="count">총 게시물 수 : {totalCnt}</span>
      </div>
      <ul className="postList">
        {list.map((post) => (
          <Post key={post.id} post={post} />
        ))}
        {/* <>{isLoading && <Loading/>}</> */}
      </ul>
    </EntireContainer>
  );
}

export default FreeBoard;
