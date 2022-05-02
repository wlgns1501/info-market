import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import Search from '../Search';
import { useDispatch, useSelector } from 'react-redux';
import { selectPurchaseDetails } from '../../store/slices/purchaseDetails';
import { selectUserInfo } from '../../store/slices/userInfo';
import axios from 'axios';

const EntireContainer = styled.div`
  border: 3px solid black;
  height: 60%;
  > ul.posts {
    border: 3px solid pink;
    margin: 0;
    list-style: none;
    padding-left: 0;
    height: 100%;
    overflow: auto;
    padding: 1%;
    > li.post {
      border: 3px solid greenyellow;
      padding: 1%;
      margin-bottom: 4%;
      display: flex;
      flex-direction: column;
      /* flex-wrap: auto; */
      > span.purchased-at {
        /* flex: 1; */
        margin-bottom: 1%;
      }
      > p {
        border: 1px solid red;
        margin: 0;
        width: 100%;
        padding: 1%;
        text-overflow: ellipsis;
        &.title {
          /* flex: 1; */
          &:hover {
            text-decoration: underline;
            cursor: pointer;
          }
        }
        &.content {
          /* flex: 4; */
          /* height: 5vh; */
          word-break: normal;
          /* white-space: normal; */
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      }
      > div.btn-price {
        /* flex: 1; */
        display: flex;
        justify-content: space-between;
        margin-top: 1%;
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
function Post({ post }) {
  const { id, title, content, fileURL, point, like, writer, createdAt } = post;
  const day = createdAt.split(' ')[0];

  const handleClick = (e) => {
    e.preventDefault();
    //게시글 이동 창.
    window.open(`/main/postList/${id}`, '_blank');
  };

  return (
    <li className="post">
      <span className="purchased-at">{day}</span>
      <p className="title" onClick={handleClick}>
        {title}
      </p>
      <p className="content">{content}</p>
      <div className="btn-price">
        <span className="writer">{writer}</span>
        <span className="price">{point} P</span>
      </div>
    </li>
  );
}

function PaidPosts() {
  //일단 ValidBtn만..
  const { paidPostList } = useSelector(selectPurchaseDetails);
  return (
    <EntireContainer>
      {/* <Search single={true} /> */}
      <ul className="posts">
        {paidPostList.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    </EntireContainer>
  );
}

export default PaidPosts;
