import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Search from '../Search';

const EntireContainer = styled.div`
  border: 3px solid black;
  height: 60%;

  > ul.posts {
    border: 3px solid pink;
    list-style: none;
    padding-left: 0;
    height: 70%;
    overflow: auto;
    padding: 1%;
    > li.post {
      border: 3px solid orange;
      margin-bottom: 4%;
      /* display: flex;
      flex-direction: column;
      flex-wrap: auto; */
      > span.purchased-at {
        /* flex: 1; */
      }
      > p {
        border: 1px solid black;
        margin: 0;
        &.title {
          /* flex: 1; */
        }
        &.content {
          /* flex: 4; */
          height: 5vh;
          text-overflow: ellipsis;
        }
      }
      > div.btn-price {
        /* flex: 1; */
        display: flex;
        justify-content: space-between;
        > span {
          &.btn {
          }
          &.price {
            margin-right: 3%;
          }
        }
      }
    }
  }
`;

function ValidBtn() {
  return (
    <span className="btn">
      <button>구매 확정</button>
      <button>환불 요청</button>
    </span>
  );
}

function InValidBtn() {
  return (
    <span className="btn">
      <button>구매 완료</button>
    </span>
  );
}

//타이틀 버튼 틀릭하면 해당 포스트로 이동
function Post() {
  return (
    <li className="post">
      <span className="purchased-at">2022.04.20.20:09</span>
      <p className="title">타이틀1</p>
      <p className="content">내용 미리보기</p>
      <div className="btn-price">
        <ValidBtn />
        <span className="price">3000원</span>
      </div>
    </li>
  );
}

function PaidPosts() {
  //일단 ValidBtn만..
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

export default PaidPosts;
