import React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import freeBoardData from '../../../mockdata/freeBoardData';
const { posts, total } = freeBoardData;

const EntireContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  min-height: 80vh;
  border: 5px solid blue;
  > ul.postList {
    border: 3px solid black;
    list-style: none;
    padding: 0;
    max-width: 50%;
    /* min-height: 100%; */
    flex-grow: 1;
    padding: 1%;
    > li.post {
      border: 1px solid red;
      &:not(:last-child) {
        margin-bottom: 5px;
      }
      > div.writer_createdAt {
        border: 1px dotted black;
        > span {
          border: 2px dotted purple;
          &.writer {
          }
          &.createdAt {
          }
        }
      }
      > p {
        border: 1px dotted black;
        margin: 0;
        overflow: hidden;
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
      }
    }
  }
`;

function Post({ post, ref }) {
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
    <li className="post" ref={ref}>
      <div className="writer_createdAt">
        <span className="writer">{writer}</span>
        <span className="createdAt">{day}</span>
      </div>
      <p className="title">{title}</p>
      <p className="content">{content}</p>
      <div className="total_Likes_Views">
        <span className="totalLikes">{totalLikes}</span>
        <span className="totalViews">{totalViews}</span>
      </div>
    </li>
  );
}

function FreeBoard() {
  const LIMIT = 10;
  const [ref, inView] = useInView();
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [freePosts, setFreePost] = useState([]);

  const getPosts = useCallback(async () => {
    setLoading(true);
    await axios
      .get(`${process.env.REACT_APP_SERVER_URL}?pages=${page}&limit=${LIMIT}`)
      .then((res) => {
        const { rows, count } = res.data.info;
        if (!count) return;
        setFreePost((freePosts) => [...freePosts, ...rows]);
      });
    setLoading(false);
  }, [page]);

  useEffect(() => {
    // setFreePost([...posts]);
    getPosts();
  }, [getPosts]);

  useEffect(() => {
    // 사용자가 마지막 요소를 보고 있고, 로딩 중이 아니라면
    if (inView && !loading) {
      setPage((prevState) => prevState + 1);
    }
  }, [inView, loading]);

  return (
    <EntireContainer>
      <ul className="postList" inView={inView}>
        {freePosts.map((post, idx) =>
          idx === freePosts.length - 1 ? (
            <Post key={post.id} ref={ref} post={post} />
          ) : (
            <Post key={post.id} post={post} />
          ),
        )}
      </ul>
    </EntireContainer>
  );
}

export default FreeBoard;
