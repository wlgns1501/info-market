import React from 'react'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components';
/* 폰트어썸, 더보기, 글작성 디자인 */
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { selectPurchaseDetails } from '../../../store/slices/purchaseDetails';

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
function FreeBoard() {

  const [isFreeList, setIsFreeList] = useState({
    id: "",
    title: "",
    content: "",
    targetPoint: "",
    created_at: "",
    nickname: "",
    totalViews: "",
    totalLike: "",
  });

  const { paidPostList } = useSelector(selectPurchaseDetails);

  /* 임시용 */
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

  return (
    // <div>
    //   <div>
    //     {/* {
    //       isFreeList ? isFreeList.map((content) => {
    //         return (
    //           <div className='content-list' id={content.id} key={content.id}>
    //             <div className='content-title'>{content.title}</div>
    //             <div className='content-body'>{content.content}</div>
    //             <div className=''>{content.targetPoint}</div>
    //             <div className=''>{content.created_at}</div>
    //             <div className=''>{content.nickname}</div>
    //             <div className=''>{content.totalViews}</div>
    //             <div className=''>{content.totalViews}</div>
    //           </div>
    //           )
    //         }) : null
    //       } */}
    //     <div className='content-list'>
    //       <ul className='content-title'>
    //         <li>제목</li>
    //         <li className=''>조회수</li>
    //         <li className=''>추천수</li>
    //       </ul>
    //       <ul className='content-body'>
    //         <li>내용</li>
    //       </ul>
    //       <ul>
    //         <li className=''>작성자</li>
    //         <li className=''>포인트금액</li>
    //         <li className=''>작성일자</li>
    //       </ul>
    //     </div>
    //   </div>
    // </div>
    <EntireContainer>
      <ul className="posts">
        {paidPostList.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </ul>
    </EntireContainer>
  )
}

export default FreeBoard

// const EntireContainer = styled.div`
//   border: 3px solid black;
//   height: 60%;
//   > ul.posts {
//     border: 3px solid pink;
//     margin: 0;
//     list-style: none;
//     padding-left: 0;
//     height: 100%;
//     overflow: auto;
//     padding: 1%;
//     > li.post {
//       border: 3px solid greenyellow;
//       padding: 1%;
//       margin-bottom: 4%;
//       display: flex;
//       flex-direction: column;
//       /* flex-wrap: auto; */
//       > span.purchased-at {
//         /* flex: 1; */
//         margin-bottom: 1%;
//       }
//       > p {
//         border: 1px solid red;
//         margin: 0;
//         width: 100%;
//         padding: 1%;
//         text-overflow: ellipsis;
//         &.title {
//           /* flex: 1; */
//           &:hover {
//             text-decoration: underline;
//             cursor: pointer;
//           }
//         }
//         &.content {
//           /* flex: 4; */
//           /* height: 5vh; */
//           word-break: normal;
//           /* white-space: normal; */
//           display: -webkit-box;
//           -webkit-line-clamp: 2;
//           -webkit-box-orient: vertical;
//           overflow: hidden;
//         }
//       }
//       > div.btn-price {
//         /* flex: 1; */
//         display: flex;
//         justify-content: space-between;
//         margin-top: 1%;
//         > span {
//           &.btn {
//           }
//           &.price {
//             margin-right: 3%;
//           }
//         }
//       }
//     }
//   }
// `;

// function Post({ post }) {
//   const { id, title, type, content, fileURL, point, like, writer, createdAt } = post;
//   const day = createdAt.split(' ')[0];
//   // const [ischeck, setCheck] = useState([]);

//   const handleClick = (e) => {
//     e.preventDefault();
//     //게시글 이동 창.
//     window.open(`/main/postList/${id}`, '_blank');
//   };

//   // const checkFree = () => {
//   //   if(ischeck === 'free'){

//   //   }
//   // }

//   return (
//     <li className="post">
//       <span className="purchased-at">{day}</span>
//       <p className="title" onClick={handleClick}>
//         {title}
//       </p>
//       <p className="content">{content}</p>
//       <div className="btn-price">
//         <span className="writer">{writer}</span>
//         <span className="price">{point} P</span>
//       </div>
//     </li>
//   );
// }

// function FreeBoard() {

//   const [isPaidList, setPaidList] = useState();
//   const [info, setInfo] = useState([]);

//   const getFreeContent = (data) => {
//     if (data.id) {
//       setInfo(
//         info.map()
//       )
//     }
//   }

//   /* 목록 더보기 이벤트 */
//   const handleClick = () => {

//   }
//   const { paidPostList } = useSelector(selectPurchaseDetails);

//   return (
//     <EntireContainer>
//       <ul className="posts">
//         {paidPostList.map((post) => (
//           <Post key={post.id} post={post} />
//         ))}
//       </ul>
//     </EntireContainer>
//     // <div>
//     //   <ul>
//     //     <li>
//     //       <div>제목</div>
//     //       <Link to="/freeboard/writefree">
//     //         <li>글작성</li>
//     //       </Link>
//     //     </li>
//     //   </ul>
//     // </div>
//   )