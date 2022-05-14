import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Comment from '../../component/content/Comment';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserInfo } from '../../store/slices/userInfo';
import {
  updatePostState,
  selectSelectedPost,
  addLike,
  cancelLike,
} from '../../store/slices/selectedPost';
import {
  confirmPay,
  selectPoint,
  updatePointState,
} from '../../store/slices/point';
import ChargeBox, { PayWithPoints } from '../../component/ChargeBox';
import Modal from '../../modals/Modal-1';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import '../../css/Content.css';

const EntireContainer = styled.div`
  > div.modal div.content {
    &.payment {
      /* 모달창 배경색 */
      background-color: #f3f702;
    }
  }
`;

function ContentPaid() {
  const dispatch = useDispatch();
  const {
    id,
    title,
    nickname,
    content,
    totalLikes,
    reviews,
    totalViews,
    like,
    userId: writer,
    createdAt,
    updatedAt,
    fileURL,
    targetPoint,
    isPurchased,
  } = useSelector(selectSelectedPost);

  const { modalOpen } = useSelector(selectPoint);
  const { id: userInfoId, isLogin, grade, point } = useSelector(selectUserInfo);

  const [preStep, setPreStep] = useState(false);

  const likeClick = () => {
    //이미 추천한 게시글이면,
    if (like) {
      dispatch(cancelLike());
    } else {
      dispatch(addLike());
    }
    dispatch(updatePostState({ like: !like }));
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    if (!isLogin) return alert('자신의 게시물은 구매할 수 없습니다.');
    if (userInfoId === writer) return alert('');
    //포인트 부족 --> 충전)
    if (Number(targetPoint) > Number(point)) {
      dispatch(
        updatePointState({
          modalOpen: true,
        }),
      );
    } else {
      //포인트 충분 --> 결제
      setPreStep(true);
    }
  };

  return (
    <EntireContainer>
      <div className="content-container">
        {preStep && (
          <Modal
            handleBtnClick={() => setPreStep(false)}
            content={<PayWithPoints handleClick={() => setPreStep(false)} />}
          />
        )}
        {modalOpen && (
          <Modal
            role="payment"
            handleBtnClick={() =>
              dispatch(
                updatePointState({
                  modalOpen: false,
                }),
              )
            }
            content={<ChargeBox />}
          />
        )}
        <div className="container">
          <div className="title">{title}</div>
          <div className="info">
            <dl>
              <dt>작성자</dt>
              <dd>{nickname}</dd>
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
            <dl>
              <dt>포인트</dt>
              <dd>{targetPoint}</dd>
            </dl>
          </div>
          <div className="body">{content}</div>
          <div className="like-btn" onClick={likeClick}>
            {like ? '♥' : '♡'} {totalLikes}
          </div>
          <div className="like-download" style={{ height: '50px' }}>
            {/* 아래 첨부파일은 회원만 다운 가능 */}
            <a
              // ref={download}
              href={
                isPurchased || userInfoId === writer || grade === 'admin'
                  ? `https://info-market-upload.s3.ap-northeast-2.amazonaws.com/${fileURL}`
                  : '#'
              }
            >
              <FontAwesomeIcon
                icon={faFileArrowDown}
                style={{ fontSize: '1.5rem' }}
                onClick={() => !isLogin && alert('회원만 가능한 서비스입니다.')}
              />{' '}
              다운로드
            </a>
            {isPurchased && <span>구매한 이력이 있는 게시물입니다.</span>}
            <button className="paid-btn" onClick={handleConfirm}>
              결제하기
            </button>
          </div>
          <Comment />
        </div>
      </div>
    </EntireContainer>
  );
}

export default ContentPaid;
