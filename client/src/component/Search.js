import styled from 'styled-components';
import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import QueryString from 'qs';

const boxShadow = '0 4px 6px rgb(32 33 36 / 28%)';
// const activeBorderRadius = '1rem 1rem 0 0';
// const inactiveBorderRadius = '1rem 1rem 1rem 1rem';

export const InputContainer = styled.div`
  border: 5px solid green;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2%;
  > form {
    flex: 1 1 auto;
    border: 2px solid orange;
    border-radius: 30px;
    padding: 1.5%;
    display: flex;
    align-items: center;
    &:focus-within {
      box-shadow: ${boxShadow};
    }
    > select {
      font-size: 1.2rem;
      /* padding: 7px 5px; */
      flex: 1;
      border-radius: 5px;
      height: 30px;
    }
    > span {
      border: 1px solid purple;
      display: flex;
      flex: 9;
      margin-left: 5px;
      margin-right: 10px;
      justify-content: center;
      align-items: center;
      > input {
        font-size: 1.3rem;
        flex: 1;
        padding: 5px;
        border: 0;
      }
      > #delete-button {
        font-size: 1.3rem;
        cursor: pointer;
      }
    }
    > button#search-icon {
      padding: 0;
      border: 0;
      outline: 0;
      background: transparent;
      font-size: 1.3rem;
      cursor: pointer;
    }
  }

  /* width: 50%;
  margin: 0 auto;
  border-radius: 50px;
  margin-top: 8rem;
  background-color: #f7f7f7;
  display: flex;
  padding: 1rem;
  border: 1px solid rgb(223, 225, 229);
  z-index: 3;

  > input {
    flex: 1 0 0;
    background-color: transparent;
    border: none;
    margin: 0;
    padding: 0;
    padding-left: 12px;
    outline: none;
    font-size: 16px;
  }
  > div.delete-button {
    cursor: pointer;
  } */
`;

function SelectBox({ items, className, selectVal, handleSelect }) {
  return (
    <select name="filter" value={selectVal} onChange={handleSelect}>
      {items.map(([name, value], i) => (
        <option key={i} value={value}>
          {name}
        </option>
      ))}
    </select>
  );
}

export default function Search({ single }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [localIpVal, setLocalIpVal] = useState('');
  const [localSelec1, setLocalSelec1] = useState('title');
  const [localSelec2, setLocalSelec2] = useState('All');
  const buttonEl = useRef(null);

  useEffect(() => {
    const { search_type, info_type, input_value } = QueryString.parse(
      location.search,
      {
        ignoreQueryPrefix: true,
      },
    );

    if (search_type) setLocalSelec1(search_type);
    if (info_type) setLocalSelec2(info_type);
    if (input_value) setLocalIpVal(input_value);
  }, []);

  const handleKeyPress = (e) => {
    // e.preventDefault();
    if (e.key === 'Enter') buttonEl.current.click();
  };

  const handleSelect1 = (e) => {
    setLocalSelec1(e.target.value);
  };

  const handleSelect2 = (e) => {
    setLocalSelec2(e.target.value);
  };

  const searchClick = (e) => {
    e.preventDefault();
    if (!localIpVal) return alert('검색어가 없습니다.');

    navigate(
      `/main/search?search_type=${localSelec1}&info_type=${localSelec2}&input_value=${localIpVal}`,
    );
  };

  return single ? (
    <InputContainer className="bar">
      {/* <form>
        <SelectBox
          value={searchOptions.selectValue}
          className="selet-box second"
          items={[
            ['전체', 'All'],
            ['무료', 'Free'],
            ['유료', 'Paid'],
          ]}
          handleSelect={handleSelect}
        />
        <span>
          <input
            type="search"
            placeholder="검색어를 입력하세요."
            onChange={(e) => handleInputChange(e.target.value)}
            value={searchOptions.inputValue}
            onKeyPress={handleKeyPress}
          />
        </span>
        <button
          id="search-icon"
          type="submit"
          ref={buttonEl}
          onClick={(e) => searchClick(e)}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form> */}
    </InputContainer>
  ) : (
    <InputContainer className="bar">
      <form>
        <SelectBox
          handleSelect={handleSelect1}
          selectVal={localSelec1}
          className="selet-box first"
          items={[
            ['제목', 'title'],
            ['내용', 'content'],
            ['작성자', 'nickname'],
          ]}
          role="first"
        />
        <SelectBox
          handleSelect={handleSelect2}
          selectVal={localSelec2}
          className="selet-box second"
          items={[
            ['전체', 'All'],
            ['무료', 'Free'],
            ['유료', 'Paid'],
          ]}
          role="second"
        />
        <span>
          <input
            type="search"
            placeholder="검색어를 입력하세요."
            value={localIpVal}
            onChange={(e) => setLocalIpVal(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </span>
        <button
          id="search-icon"
          type="submit"
          ref={buttonEl}
          onClick={searchClick}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
    </InputContainer>
  );
}
