import '../../css/Content.css'
import React from 'react';
import freeBoardData from '../../mockdata/freeBoardData';

// function Post({ post }) {
//   const {
//     id,
//     title,
//     writer,
//     content,
//     totalLikes,
//     reviews,
//     totalViews,
//     createdAt,
//     updatedAt,
//   } = post;

//   return (

//   )
// }

function ContentFree() {

  return (

    <div>
      <strong>무료글 상세보기</strong>
      <p>무료컨텐츠 상세 페이지 입니다</p>
      <div className='container'>
        <div className='title'>
          글제목
          info.title
        </div>
        <div className='info'>
          <dl>
            <dt>작성자</dt>
            <dd>info.userId</dd>
          </dl>
          <dl>
            <dt>작성일자</dt>
            <dd>info.createAt</dd>
          </dl>
          <dl>
            <dt>조회수</dt>
            <dd>info.totalViews</dd>
          </dl>
          {/* <dl>
              <dt>추천수</dt>
              <dd></dd>
            </dl> */}
        </div>
        <div className='body'>
          본문본문본문본문본문본문본문본문<br />
          본문본문본문본문본문본문본문본문<br />
          본문본문본문본문본문본문본문본문<br />
          본문본문본문본문본문본문본문본문<br />
          본문본문본문본문본문본문본문본문<br />
          <div className='like'>
            <button>추천하기</button>
            <div>추천수</div>
          </div>
        </div>
        <div className='reply'>
          <div className='content_reply_write'>
            <textarea placeholder='작성할 댓글 입력'></textarea>
            <button>댓글달기</button>
          </div>
          <div className='content_reply'>
            <div>
              댓글리스트<br />
              댓글리스트<br />
              댓글리스트<br />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContentFree;