import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useEffect } from 'react';
import {
  updatePostState,
  selectSelectedPost,
} from '../../store/slices/selectedPost';
import { selectUserInfo } from '../../store/slices/userInfo';
import axios from 'axios';

const PopUpBox = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  background-color: #fff;
  position: absolute;
  top: calc(100% + 5px);
  right: -20px;
  z-index: 10000;
  border: 1px solid #ebebeb;
  box-shadow: var(--box-shadow);
  border-radius: 5px 0 5px 5px;
  overflow: hidden;
  > li {
    padding: 15px 19px;
    font-family: var(--noto-sans);
    white-space: nowrap;
    &:hover {
      background-color: #f4f4f4;
      cursor: pointer;
    }
  }
`;

function Setting() {
  const dispatch = useDispatch();

  const { grade, isLogin, id: userId, accToken } = useSelector(selectUserInfo);
  const { id: infoId, userId: writer } = useSelector(selectSelectedPost);

  return (
    <PopUpBox className="popup">
      {grade === 'admin' || writer === userId ? (
        <>
          <li
            onClick={() =>
              dispatch(updatePostState({ infoEditMode: true, isOpen: false }))
            }
          >
            수정
          </li>
          <li
            onClick={() =>
              dispatch(
                updatePostState({
                  isOpen: false,
                  removeInfo: true,
                }),
              )
            }
          >
            삭제
          </li>
        </>
      ) : (
        <li>신고하기</li>
      )}
    </PopUpBox>
  );
}

export default Setting;
