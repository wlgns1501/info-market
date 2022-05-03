import styled from 'styled-components';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

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
      font-size: 1rem;
      flex: 1;
    }
    /* > select:nth-child(1) {
      display: ${(props) => (props.single ? 'none' : '')};
    } */
    > span {
      border: 1px solid purple;
      display: flex;
      flex: 9;
      margin-left: 5px;
      margin-right: 10px;
      justify-content: center;
      align-items: center;
      > input {
        font-size: 1rem;
        flex: 1;
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

function SelectBox({ items, value, handleSelect }) {
  return (
    <select
      name="filter"
      value={value}
      onChange={(e) => handleSelect(e.target.value)}
    >
      {items.map((item, i) => (
        <option key={i} value={item}>
          {item}
        </option>
      ))}
    </select>
  );
}

export default function Search({
  single,
  searchOptions,
  handleSelect,
  handleInputChange,
  searchClick,
}) {
  return single ? (
    <InputContainer>
      <form>
        <SelectBox
          value={searchOptions.selectValue}
          className="selet-box second"
          items={['전체', '무료', '유료']}
          handleSelect={handleSelect}
        />
        <span>
          <input
            type="search"
            placeholder="검색어를 입력하세요."
            onChange={(e) => handleInputChange(e.target.value)}
            value={searchOptions.inputValue}
          />
          <FontAwesomeIcon id="delete-button" icon={faCircleXmark} />
        </span>
        <button id="search-icon" type="submit" onClick={(e) => searchClick(e)}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
    </InputContainer>
  ) : (
    <InputContainer>
      <form>
        <SelectBox
          className="selet-box first"
          items={['제목', '내용', '작성자']}
        />
        <SelectBox
          className="selet-box second"
          items={['전체', '무료', '유료']}
        />
        <span>
          <input type="search" placeholder="검색어를 입력하세요." />
          <FontAwesomeIcon id="delete-button" icon={faCircleXmark} />
        </span>
        <button id="search-icon" type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </button>
      </form>
    </InputContainer>
  );
}
