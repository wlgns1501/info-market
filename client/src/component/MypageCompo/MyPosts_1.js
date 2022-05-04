import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Search from '../Search';
import myPostData from '../../mockdata/myPostData';

const EntireContainer = styled.div`
  border: 3px solid blue;
  height: 60%;
  > ul.posts {
    height: 70%;
    border: 3px solid black;
    list-style: none;
    padding: 2%;
    overflow: auto;
    > li.post {
      border: 1px solid red;
      /* display: flex;
      flex-direction: column; */
      margin-bottom: 3%;
      > p {
        border: 1px dotted darkblue;
        margin: 0;
        padding: 1%;
        &.title {
        }
        &.content {
          height: 5vh;
          text-overflow: ellipsis;
        }
      }
      > div.sub-details {
        display: flex;
        justify-content: flex-end;
        > span {
          margin: 0 2%;
        }
      }
    }
  }
`;

function Post({ post }) {
  const {
    id,
    title,
    type,
    content,
    point,
    like,
    active,
    createdAt,
    updatedAt,
  } = post;
  return (
    <li className="post">
      <p className="title">{title}</p>
      <p className="content">{content}</p>
      <div className="sub-details">
        <span className="point">{point}</span>
        <span className="like">{like}</span>
        <span className="create-at">{createdAt}</span>
      </div>
    </li>
  );
}

//타이틀 클릭하면 해당 포스트로 이동
function MyPosts_1() {
  return (
    <EntireContainer>
      <Search single={true} />
      <ul className="posts">
        {myPostData.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    </EntireContainer>
  );
}

export default MyPosts_1;
