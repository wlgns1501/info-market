import React, { useContext, useState } from "react";
import styled from "styled-components";

const CommentWrapper = styled.div`
  border: 1px solid black;
  p{
    margin: 0;
  }
`;
const UserInfoWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eeeeee;
`;
const Button = styled.button`
  border: 0;
  height: 20px;
  background: none;
`

const Comment = () => {
  const [input, setInput] = useState();
  const [comments, setComments] = useState([]);

  const onChange = (e) => {
    setInput(e.target.value);
  };

  // 댓글 추가. 임시용
  const addComment = () => {
    setComments(
      comments.concat({
        id: comments.length + 1,
        content: input,
        userId: '박제곤',
        createdAt: Date()
      })
    );
    setInput("");
  };

  // 코멘트 삭제
  const removeComment = (id) => {
    return setComments(comments.filter((comment) => comment.id !== id));
  };

  // // 코멘트 수정 미완성
  // const chagneContent = (id, inputWord) => {
  //   return setComments(comments.map((comment) => {
  //     if (comment.id === id) {
  //       return {
  //         ...comment,
  //         content: inputWord,
  //       };
  //     }
  //     return comment;
  //   }));
  // };

  return (
    <div>
      <textarea value={input} onChange={onChange}></textarea>
      <button
        onClick={() => {
          addComment(input);
          setInput("");
        }}
      >
        댓글달기
      </button>
      {comments.map((comment, index) => (
        <CommentWrapper key={`${comment.userId}_${index}`}>
          <UserInfoWrapper>
            <p>작성자 : {comment.userId}</p>
            <p>작성일자 : {comment.createdAt}</p>
            <Button onClick={() => removeComment(comment.id)}>삭제</Button>
            {/* <Button onClick={() => chagneContent(comment.id, input)}>
              수정
            </Button> */}
          </UserInfoWrapper>
          {comment.content}
        </CommentWrapper>
      ))}
    </div>
  );
};

export default Comment;