import '../../css/Content.css';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
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
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFileArrowDown,
  faGear,
  faCircleMinus,
} from '@fortawesome/free-solid-svg-icons';
import Setting from '../../component/content/Setting';
import Modal from '../../modals/Modal-1';
import FileChange from '../../component/content/FileChange';

const SettingBox = styled.span`
  position: relative;
  &.logined {
    display: none;
  }
`;

const RemoveBox = styled.div``;

function RemoveInfoConfirm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accToken } = useSelector(selectUserInfo);
  const { id: infoId } = useSelector(selectSelectedPost);

  const getConfig = {
    headers: {
      Authorization: `Bearer ${accToken}`,
    },
    withCredentials: true,
  };

  const handleInfoDelete = () => {
    axios
      .delete(
        `${process.env.REACT_APP_SERVER_DEV_URL}/info/${infoId}`,
        getConfig,
      )
      .then((res) => alert(res.data.message))
      .catch((err) => alert(err.response.message));

    dispatch(updatePostState({ removeInfo: false }));
    navigate(-1); //다시 렌더링되는지 확인
  };

  return (
    <RemoveBox>
      <p>삭제하시겠습니까?</p>
      <div>
        <button onClick={handleInfoDelete}>확인</button>
        <button
          onClick={() => dispatch(updatePostState({ removeInfo: false }))}
        >
          취소
        </button>
      </div>
    </RemoveBox>
  );
}

function ContentFree() {
  const dispatch = useDispatch();
  const {
    id: infoId,
    title,
    nickname,
    content,
    totalLikes,
    reviews,
    totalViews,
    like,
    createdAt,
    updatedAt,
    fileURL,
    isOpen,
    removeInfo,
    infoEditMode,
    titleChangeValue,
    contentChangeValue,
    fileChangeValue,
    modifyTextStep,
    modyfiedFileName,
  } = useSelector(selectSelectedPost);
  const { isLogin, accToken } = useSelector(selectUserInfo);

  const getConfig = {
    headers: {
      Authorization: `Bearer ${accToken}`,
    },
    withCredentials: true,
  };

  const likeClick = () => {
    //이미 추천한 게시글이면,
    if (like) {
      dispatch(cancelLike());
    } else {
      dispatch(addLike());
    }
    dispatch(updatePostState({ like: !like }));
  };

  //텍스트 수정 처리
  useEffect(() => {
    if (!modifyTextStep) return;
    axios
      .put(
        `${process.env.REACT_APP_SERVER_DEV_URL}/info/${infoId}`,
        {
          title: titleChangeValue,
          content: contentChangeValue,
          file: modyfiedFileName,
        },
        getConfig,
      )
      .then((res) => {
        dispatch(
          updatePostState({
            title: titleChangeValue,
            content: contentChangeValue,
            fileURL: modyfiedFileName,
          }),
        );
      })
      .catch((err) => {
        if (err.response?.message) alert(err.response.message);
      });
    dispatch(
      updatePostState({
        infoEditMode: false,
        titleChangeValue: null,
        contentChangeValue: null,
        fileChangeValue: null,
        modifyTextStep: false,
        modyfiedFileName: null,
        modifyFileStep: false, //혹시나 해서 추가
      }),
    );
  }, [modifyTextStep]);

  //텍스트, 파일 수정 단계를 분리시켜주는 코드
  const handleModifyReady = () => {
    if (!titleChangeValue && !contentChangeValue && !fileChangeValue)
      return dispatch(updatePostState({ infoEditMode: false }));

    if (fileChangeValue)
      return dispatch(
        updatePostState({
          modifyFileStep: true,
        }),
      );

    dispatch(
      updatePostState({
        modifyTextStep: true,
      }),
    );
  };

  return (
    <div>
      {removeInfo && (
        <Modal
          handleBtnClick={() =>
            dispatch(updatePostState({ removeInfo: false }))
          }
          content={<RemoveInfoConfirm />}
          role="remove"
        />
      )}
      <strong>무료글 상세보기</strong>
      <p>무료컨텐츠 상세 페이지 입니다</p>
      <div className="container">
        {infoEditMode ? (
          <input
            onChange={(e) =>
              dispatch(updatePostState({ titleChangeValue: e.target.value }))
            }
            type="text"
          >
            {title}
          </input>
        ) : (
          <div className="title">{title}</div>
        )}
        <SettingBox className={`setting ${isLogin || 'logined'}`}>
          <FontAwesomeIcon
            icon={isOpen ? faCircleMinus : faGear}
            onClick={() => dispatch(updatePostState({ isOpen: !isOpen }))}
          />
          {isOpen && <Setting />}
        </SettingBox>
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
        </div>
        {infoEditMode ? (
          <textarea
            cols="30"
            rows="50"
            onChange={(e) =>
              dispatch(updatePostState({ contentChangeValue: e.target.value }))
            }
          >
            {content}
          </textarea>
        ) : (
          <div className="body">{content}</div>
        )}
        <div className="like download" style={{ height: '50px' }}>
          <span onClick={likeClick}>
            {like ? '♥' : '♡'} {totalLikes}
          </span>
          {/* 아래 첨부파일은 회원만 다운 가능 */}
          {infoEditMode ? (
            <FileChange />
          ) : (
            <a
              href={
                isLogin
                  ? `https://info-market-upload.s3.ap-northeast-2.amazonaws.com/${fileURL}`
                  : '#'
              }
            >
              <FontAwesomeIcon
                icon={faFileArrowDown}
                style={{ fontSize: '1.5rem' }}
                onClick={() => !isLogin && alert('회원만 가능한 서비스입니다.')}
              />
            </a>
          )}
          {infoEditMode && (
            <button onClick={handleModifyReady}>수정 완료</button>
          )}
          {infoEditMode && (
            <button
              onClick={() => dispatch(updatePostState({ infoEditMode: false }))}
            >
              취소
            </button>
          )}
        </div>
        <Comment />
      </div>
    </div>
  );
}

export default ContentFree;
