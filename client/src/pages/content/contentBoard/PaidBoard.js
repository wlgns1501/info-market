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

const OrderContainer = styled.div`
  background-color: #e68feb;
  width: 100%;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  box-shadow: 3px 3px 3px #e3e6e4;
  > div {
    /* border: 2px solid red; */
    width: 50%;
    display: flex;
    justify-content: space-between;
    > span {
      &.latest_best {
        margin-left: -5px;
        > input.best {
          margin-left: 20px;
        }
      }
      &.count {
      }
    }
  }
`;
const EntireContainer = styled.div`
  display: flex;
  background-color: #faf9f5;
  flex-direction: column;
  align-items: center;
  min-height: 75vh;
  overflow-y: scroll;
  > ul.postList {
    /* border: 3px solid red; */
    margin: 0;
    list-style: none;
    padding: 0;
    width: 55%;
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

  const testUrl = `http://ec2-13-125-246-202.ap-northeast-2.compute.amazonaws.com/info?pages=${page}&limit=${LIMIT}`;
  // const url = `${process.env.REACT_APP_SERVER_DEV_URL}/info?pages=${page}&limit=${LIMIT}`;
  useEffect(() => {
    axios
      .get(testUrl)
      .then((res) => {
        const { rows, total } = res.data;
        if (rows) setList([...list, ...rows]);
        if (total) setTotalCnt(total);
      })
      .catch((err) => {
        if (err.response?.message) alert(err.response.message);
      });
  }, [page]);

  const handleScroll = (e) => {
    if (e.target.clientHeight + e.target.scrollTop === e.target.scrollHeight)
      setPage((prevState) => prevState + 1);
  };
  return (
    <>
      <OrderContainer>
        <div>
          <span className="latest_best">
            <input
              className="latest"
              type="radio"
              name="info_order"
              value="최신순"
              defaultChecked
              style={{ marginLeft: '0' }}
            />
            최신순
            <input
              className="best"
              type="radio"
              name="info_order"
              value="인기순"
            />
            인기순
          </span>
          <span className="count">총 게시물 수 : {totalCnt || 0}</span>
        </div>
      </OrderContainer>
      <EntireContainer id="box" ref={elm} onScroll={handleScroll}>
        <ul className="postList">
          {list.map((post) => (
            <Post key={post.id} post={post} />
          ))}
          {/*{isLoading && <Loading/>}*/}
        </ul>
      </EntireContainer>
    </>
  );
}

export default FreeBoard;
