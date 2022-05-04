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
  min-height: 75vh;
  /* border: 5px solid blue; */
  overflow-y: scroll;
  > div#order {
    /* border: 1px solid red; */
    width: 50%;
    margin-top: 10px;
    /* border: 1px solid black; */
    > ul#paging {
      list-style: none;
      display: flex;
      /* width: 30px; */
      justify-content: center;
      align-items: center;
      /* border: 1px solid black; */
      padding: 0;
      margin: 0;
      > li {
        width: 1.5rem;
        height: 1.5rem;
        text-align: center;
        line-height: 1.5rem;
        border: 1px solid gray;
        border-radius: 5px;
        box-shadow: 2px;
      }
    }
  }
  > ul.postList {
    /* border: 3px solid red; */
    list-style: none;
    padding: 0;
    max-width: 50%;
    height: 600px;
    padding: 1%;
    > li.post {
      border: 1px solid black;
      background-color: white;
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
      > p {
        border: 1px dotted black;
        margin: 0;
        overflow: hidden;
        padding: 5px;
        &.title {
          margin-top: 3px;
          margin-bottom: 2px;
        }
        &.content {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          margin-bottom: 3px;
        }
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
      <p className="content">{content}</p>
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
  const range = (total) => Array.from({ length: total }, (_, i) => i + 1);
  // const [list, setList] = useState([]);
  const [list, setList] = useState([...posts.slice(0, 8)]);
  const [page, setPage] = useState(1);
  const LIMIT = 6;
  const [totalPage, setTotalPage] = useState(null);

  // useEffect(() => {
  //   axios
  //     .get(
  //       `${process.env.REACT_APP_SERVER_URL}/test/freeBoard?pages=${page}&limit=${LIMIT}`,
  //     )
  //     .then((res) => {
  //       const { rows, total } = res.data;
  //       if (!rows) return;
  //       setTotalPage(Math.ceil(Number(total) / LIMIT));
  //       setList([...rows]);
  //     })
  //     .catch((err) => console.log(err));
  // }, [page]);

  // const pagingArr = range(totalPage);
  const pagingArr = range(10);
  return (
    <EntireContainer>
      <div id="order">
        <input type="radio" name="info_order" value="최신순" checked />
        최신순
        <input
          type="radio"
          name="info_order"
          value="인기순"
          style={{ marginLeft: '10px' }}
        />
        인기순
        {/* <ul id="paging">
          {pagingArr.map((el) => (
            <li key={el} name={el}>
              {el}
            </li>
          ))}
        </ul> */}
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
