import '../../css/Content.css'
import React, { useEffect, useState } from 'react';
import contentData from '../../mockdata/contentData';
import axios from 'axios';
import HeartButton from '../../component/content/Heart';
import Comment from '../../component/content/Comment';

const { posts } = contentData;

function Post({ post, HeartButton }) {
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

  const [reply, setReply] = useState(false);
  const [like, setLike] = useState(false);
  const [checkLike, setCheckLike] = useState(totalLikes)

  /* 추가시 totalLikes +1, -1 되는것 만들어야함 */
  // const likeClick = () => {
  //   if (like) {
  //     setLike(false);
  //     console.log('빠졌나??')
  //   } else {
  //     setLike(true)
  //     setCheckLike(totalLikes + 1)
  //     console.log('추가됬나??')
  //     console.log(checkLike)
  //   }
  // }


  /* 댓글작성 클릭시, post 전달되게 새로 짜야함 */
  // const handleReply = () => {
  //   if (!reply) {
  //     axios.post(
  //       // `http://localhost:3000/info/${infoId}/reply`,
  //       {content}
  //       {
  //         headers: { 'Content-Type': 'application/json' },
  //         withCredentials: true,
  //       },
  //     )
  //       .then((res) => {
  //         if (res.data) {
  //           dispatch(
  //             updateState({
  //               ...res.data,
  //             })
  //           )
  //         }
  //       })
  //   }
  // }

  /* 댓글 추가시, useEffect 로 바로 밑에 보여지게끔 해야함 */

  return (
    <div>
      <strong>무료글 상세보기</strong>
      <p>무료컨텐츠 상세 페이지 입니다</p>
      <div className='container'>
        <div className='title'>
          {title}
        </div>
        <div className='info'>
          <dl>
            <dt>작성자</dt>
            <dd>{writer}</dd>
          </dl>
          <dl>
            <dt>작성일자</dt>
            <dd>{createdAt}</dd>
          </dl>
          <dl>
            <dt>조회수</dt>
            <dd>{totalViews}</dd>
          </dl>
          <dl>
            <dt>추천수</dt>
            <dd>{totalLikes}</dd>
          </dl>
        </div>
        <div className='body'>
          {content}
          <div className='like'>
            {/* {like ? (
              <div onClick={likeClick} checkLike={checkLike}>♥</div>
            ) : (
              <div onClick={likeClick}>♡</div>
            )} */}
            {/* <button>추천하기</button>
            <div>{totalLikes}</div> */}
            {/* <div>추천개수:{totalLikes}</div> */}
          </div>
        </div>
        {/* <div className='reply'>
          <div className='content_reply_write'>
            <textarea placeholder='작성할 댓글 입력'></textarea>
            <button>댓글달기</button>
          </div>
          <div className='content_reply'>
            <div>
              {reviews}
            </div>
          </div>
        </div> */}
        <Comment />
      </div>
    </div>
  )
}

function ContentFree() {

  return (
    <div>
      <ul className="posts">
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    </div>
  )
}

export default ContentFree;