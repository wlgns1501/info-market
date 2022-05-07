import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Search from '../Search';
import myPostData from '../../mockdata/myPostData';
import { useDispatch, useSelector } from 'react-redux';
import {
  prev,
  next,
  searchReset,
  updatePostList,
  selectUserPost,
} from '../../store/slices/userPost';
import { selectUserInfo } from '../../store/slices/userInfo';
import axios from 'axios';

const EntireContainer = styled.div`
  border: 3px solid green;
  width: 100%;
  height: 70%;
  > table {
    border: 3px solid red;
    width: 100%;
    height: 70%;
    border-collapse: collapse;
    border-spacing: 0;
    table-layout: fixed;
    text-align: center;
  }
  > div#paging {
    border: 1px dotted red;
    display: flex;
    justify-content: space-between;
    margin: 8px 5px 5px 0;
    > button {
      cursor: pointer;
    }
  }
`;

const PostContainer = styled.tr`
  border: 3px solid blue;
  > td {
    vertical-align: middle;
    padding: 5px;
    border: 1px solid #000;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    &.title {
      &:hover {
        text-decoration: underline;
        cursor: pointer;
      }
    }
    &.createdAt,
    &.updatedAt {
      white-space: normal;
      text-overflow: clip;
    }
  }
`;

function Post({ post }) {
  const { id, title, type, point, like, active, createdAt, updatedAt } = post;

  const handleClick = (e) => {
    e.preventDefault();
    //게시글 이동 창.
    window.open(`/main/postList/${id}`, '_blank');
  };

  return (
    <PostContainer>
      <td className="id">{id}</td>
      <td className="type">{type === 'free' ? '무료' : '유료'}</td>
      <td className="type">{active || '대기중'}</td>
      <td onClick={handleClick} className="title">
        {title}
      </td>
      <td className="like">{like}</td>
      <td className="point">{point}</td>
      <td className="createdAt">{createdAt}</td>
      <td className="updatedAt">{updatedAt}</td>
    </PostContainer>
  );
}

function MyPosts() {
  const dispatch = useDispatch();
  //전역 상태
  const { postList, currentPage } = useSelector(selectUserPost);

  //페이징 변수
  const LIMIT = 6;
  const offset = currentPage * LIMIT - LIMIT;

  //axios 헤더용
  const { accToken } = useSelector(selectUserInfo);
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
      Authorization: `Bearer ${accToken}`,
    },
    withCredentials: true,
  };

  //mock data 테스트용
  const { posts, total } = myPostData; //나중에 삭제

  //실제로 렌더링될 게시글 리스트
  const [resultPosts, setResultPosts] = useState([...postList]);

  //전체 페이지 표시
  //테스트
  const [totalCount, setTotalCount] = useState(total);
  //실제
  // const [totalCount, setTotalCount] = useState(0);
  const totalPage = Math.ceil(totalCount / LIMIT);

  //검색용 상태(지역 상태)
  const [searchOptions, setSearchOptions] = useState({
    selectValue: '전체',
    inputValue: '',
  });

  //이전 버튼 클릭
  const prevBtnClick = (e) => {
    e.preventDefault();
    if (currentPage === 1) return;
    dispatch(prev());
  };
  //다음 버튼 클릭
  const nextBtnClick = (e) => {
    e.preventDefault();
    if (currentPage === totalPage) return;
    dispatch(next());
  };

  //첫 렌더링, 이전/다음 버튼 클릭후, 검색후 작동
  useEffect(() => {
    const { selectValue, inputValue } = searchOptions;
    //이미 렌더링된 post가 있으면 프론트딴에서 해결
    if (postList.length > offset) {
      //무료, 유료, 제목 검색
      //이전/다음 버튼 이벤트
      return;
    } else {
      //처음 또는 다음 페이지 페이징 처음
      //mock data 테스트 버전
      dispatch(updatePostList(posts));

      //실제 버전(잠시 비활성화)
      // axios
      //   .get(
      //     `http://localhost:8080/users/info?offset=${offset}&limit=${LIMIT}&search_type=title&info_type=${selectValue}&input_value=${inputValue}`,
      //     config,
      //   )
      //   .then((res) => {
      //     const { total, rows } = res.data.info;
      //     dispatch(updatePostList(rows));
      //     if(total) setTotalCount(count);
      //   })
      //   .catch((err) => alert('서버 에러 발생! 다시 시도해주세요.'));
    }
    //전역 postList에 서버에서 온 데이터가 바로 업로드되련지는 잘 모르겠음...
  }, [currentPage]);

  //확인용(나중에 삭제하기)
  useEffect(() => {
    console.log(searchOptions);
  }, [searchOptions]);

  //검색 옵션 반영
  const handleSelect = (val) => {
    setSearchOptions({
      ...searchOptions,
      selectValue: val,
    });
  };
  const handleInputChange = (val) => {
    setSearchOptions({
      ...searchOptions,
      inputValue: val,
    });
  };

  //+내 게시글 불러올 때 최근순으로 정렬하거나 받아와야함.
  //검색 버튼 클릭 이벤트
  const searchClick = (e) => {
    e.preventDefault();
    const { selectValue, inputValue } = searchOptions;
    //새로 서버에 데이터를 받아올 필요가 없는 경우
    if (postList.length >= totalCount) {
      dispatch(
        searchReset({
          currentPage: 1,
        }),
      );

      let temp = postList.filter((post) =>
        selectValue === '전체'
          ? post.title.includes(inputValue)
          : post.type === selectValue && post.title.includes(inputValue),
      );
      setResultPosts([...temp]);
    } else {
      //전역 상태 currentPage, postList 초기화
      dispatch(
        searchReset({
          postList: [],
          currentPage: 1,
        }),
      );
    }
  };

  return (
    <EntireContainer>
      <Search
        single={true}
        searchOptions={searchOptions}
        handleSelect={handleSelect}
        handleInputChange={handleInputChange}
        searchClick={searchClick}
      />
      <table>
        <colgroup>
          <col id="id" width="5%" />
          <col id="type" min-width="5%" />
          <col id="active" min-width="7%" />
          <col id="title" width="30%" />
          <col id="like" min-width="7%" />
          <col id="point" min-width="7%" />
          <col id="createdAt" width="13%" />
          <col id="updatedAt" width="13%" />
        </colgroup>
        <thead>
          <tr key="">
            <th>번호</th>
            <th>종류</th>
            <th>상태</th>
            <th>제목</th>
            <th>추천수</th>
            <th>가격</th>
            <th>작성일자</th>
            <th>수정일자</th>
          </tr>
        </thead>
        <tbody>
          {posts.slice(offset, offset + LIMIT).map((post) => (
            <Post key={post.id} post={post} />
          ))}
          {/* {resultPosts.slice(Number(offset), Number(offset + LIMIT)).map((post) => (
            <Post key={post.id} post={post} />
          ))} */}
        </tbody>
      </table>
      <div id="paging">
        <button disabled={Number(currentPage) === 1} onClick={prevBtnClick}>
          이전
        </button>
        <span>
          {currentPage} / {totalPage}
        </span>
        <button
          onClick={nextBtnClick}
          disabled={Number(currentPage) === Number(totalPage)}
        >
          다음
        </button>
      </div>
    </EntireContainer>
  );
}

export default MyPosts;
