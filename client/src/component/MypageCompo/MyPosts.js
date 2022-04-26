import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Search from '../Search';

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

function Post() {
  return (
    <li className="post">
      <p className="title">타이틀1</p>
      <p className="content">내용 미리보기..</p>
      <div className="sub-details">
        <span className="like">추천수</span>
        <span className="create-at">작성일자</span>
      </div>
    </li>
  );
}

//타이틀 클릭하면 해당 포스트로 이동
function MyPosts() {
  return (
    <EntireContainer>
      <Search single={true} />
      <ul className="posts">
        <Post />
        <Post />
        <Post />
        <Post />
      </ul>
    </EntireContainer>
  );
}

export default MyPosts;
