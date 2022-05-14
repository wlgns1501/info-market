import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserInfo } from '../../store/slices/userInfo';
import {
  selectSelectedPost,
  addComment,
  deleteComment,
  modifyComment,
} from '../../store/slices/selectedPost';
import axios from 'axios';
import '../../css/Comment.css';

const RegisterBox = styled.div``;

const UserInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eeeeee;
`;

const Button = styled.button`
  border: 0;
  height: 20px;
  background: none;
  display: none;
  &.authorized {
    display: inline-block;
  }
`;

const CommentWrapper = styled.div`
  border: 1px solid black;
  p {
    margin: 0;
  }
`;

function Review({ review, userInfo, infoId, postConfig, getConfig }) {
  const dispatch = useDispatch();
  const textEl = useRef(null);
  const [editMode, setEditMode] = useState(false);
  const [modifyVal, setModifyVal] = useState(review.content);

  useEffect(() => {
    if (!editMode) return;
    textEl.current.focus();
  }, [editMode]);

  //댓글 수정 값
  const handleTextChange = (e) => {
    setModifyVal(e.target.value);
  };

  //댓글 수정 완료
  const chagneContent = (replyId) => {
    if (modifyVal === '') return alert('댓글을 작성해주세요.');
    axios
      .put(
        `${process.env.REACT_APP_SERVER_DEV_URL}/info/${infoId}/reply/${replyId}`,
        { content: modifyVal },
        postConfig,
      )
      .then((res) => {
        const { updatedAt } = res.data;
        dispatch(
          modifyComment({
            id: replyId,
            content: modifyVal,
            updatedAt,
          }),
        );
        setEditMode(false);
      })
      .catch((err) => alert('댓글 수정 실패'));
  };

  // 코멘트 삭제
  const remove = (replyId) => {
    axios
      .delete(
        `${process.env.REACT_APP_SERVER_DEV_URL}/info/${infoId}/reply/${replyId}`,
        getConfig,
      )
      .then((res) => {
        const { reply } = res.data;
        if (Number(replyId) === Number(reply.id)) {
          dispatch(deleteComment({ replyId }));
        }
      })
      .catch((err) => alert('댓글 삭제 실패'));
  };

  //수정하다가 취소하기
  const modifyCancel = () => {
    setModifyVal(review.content);
    setEditMode(false);
  };

  return (
    <CommentWrapper>
      <UserInfoWrapper>
        <p>작성자 : {review.User.nickname}</p>
        <p>작성일자 : {review.createdAt}</p>
        <Button
          className={
            (Number(review.userId) === Number(userInfo.id) ||
              userInfo.grade === 'admin') &&
            'authorized'
          }
          onClick={() => remove(review.id)}
        >
          삭제
        </Button>
        {editMode ? (
          <button
            className="modify-confirm"
            onClick={() => chagneContent(review.id)}
          >
            수정 완료
          </button>
        ) : (
          <Button
            className={
              Number(review.userId) === Number(userInfo.id)
                ? 'modify-btn authorized'
                : 'modify-btn'
            }
            onClick={() => setEditMode(true)}
          >
            수정
          </Button>
        )}
      </UserInfoWrapper>
      {editMode ? (
        <div>
          <textarea
            className="comment-text"
            cols="30"
            rows="10"
            ref={textEl}
            value={modifyVal}
            onChange={handleTextChange}
          />

          <button onClick={modifyCancel}>취소</button>
        </div>
      ) : (
        <div>
          <pre>{review.content}</pre>
        </div>
      )}
    </CommentWrapper>
  );
}

function Comment() {
  const dispatch = useDispatch();
  const { id: infoId, reviews } = useSelector(selectSelectedPost);
  const userInfo = useSelector(selectUserInfo);

  const [input, setInput] = useState('');

  const postConfig = {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${userInfo.accToken}`,
    },
    withCredentials: true,
  };
  const getConfig = {
    headers: {
      Authorization: `Bearer ${userInfo.accToken}`,
    },
    withCredentials: true,
  };

  //댓글 입력
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  // 댓글 추가
  const add = () => {
    if (!input) return alert('댓글을 작성해주세요.');
    axios
      .post(
        `${process.env.REACT_APP_SERVER_DEV_URL}/info/${infoId}/reply`,
        { content: input },
        postConfig,
      )
      .then((res) => {
        let { replyId, createdAt } = res.data;
        let day = createdAt.split('T');
        let time = day[1].split('.')[0];
        createdAt = `${day[0]} ${time}`;

        dispatch(
          addComment({
            id: replyId,
            nickname: userInfo.nickname,
            userId: userInfo.id,
            content: input,
            createdAt,
          }),
        );
        setInput('');
      })
      .catch((err) => alert('댓글 작성 실패'));
  };

  return (
    <>
      <RegisterBox>
        <textarea
          className="comment-text"
          value={input}
          onChange={handleChange}
          placeholder="댓글을 작성하려면 로그인 해주세요."
          disabled={!userInfo.isLogin}
        />
        <button
          className="comment-btn"
          onClick={add}
          disabled={!userInfo.isLogin}
        >
          등록
        </button>
      </RegisterBox>
      {reviews.map((R) => (
        <Review
          key={R.id}
          review={R}
          infoId={infoId}
          postConfig={postConfig}
          getConfig={getConfig}
          userInfo={userInfo}
        />
      ))}
    </>
  );
}

export default Comment;
