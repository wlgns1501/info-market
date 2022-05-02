import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';
import { faMoneyCheckDollar } from '@fortawesome/free-solid-svg-icons';
import chargedPointData from '../../mockdata/chargedPointData';

const EntireContainer = styled.div`
  border: 3px solid green;
  height: 58%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  > div#paging {
    text-align: center;
    border: 1px dotted gray;
    font-size: 1rem;

    > span {
      display: block;
      /* margin: 0 6px; */
    }
  }
`;

const UlContainer = styled.ul`
  margin: 0;
  /* margin-top: 2%; */
  border: 3px solid skyblue;
  height: 90%;
  min-width: 85%;
  list-style: none;
  padding: 2%;
  overflow: auto;
  > li.item {
    border: 1px solid red;
    margin-bottom: 3%;
    > p {
      border: 1px solid black;
      margin: 0;
      padding: 1%;
      &.detail {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #eef27e;
      }
      > span {
        border: 1px solid black;
        background-color: white;
        padding: 2%;
        margin-right: 3%;
        white-space: nowrap;
      }
      > #coins {
        margin-left: 3%;
      }
    }
  }
`;

function Item({ data }) {
  const { amount, createdAt } = data;
  return (
    <li className="item">
      <p className="createdAt">{createdAt}</p>
      <p className="detail">
        <FontAwesomeIcon id="coins" icon={faMoneyCheckDollar} size="2x" />
        <span>+ {amount} P</span>
      </p>
    </li>
  );
}

function ChargedPointList() {
  const [current, setCurrent] = useState(1);
  const LIMIT = 5;
  const offset = current * LIMIT - LIMIT;
  const { pointList, totalCount } = chargedPointData;
  const totalPage = Math.ceil(totalCount / LIMIT);

  const prevBtnClick = (e) => {
    e.preventDefault();
    setCurrent(current - 1);
  };
  const nextBtnClick = (e) => {
    e.preventDefault();
    setCurrent(current + 1);
  };
  return (
    <EntireContainer>
      <UlContainer>
        {pointList.slice(offset, offset + LIMIT).map((data) => (
          <Item key={data.id} data={data} />
        ))}
      </UlContainer>
      <div id="paging">
        <button id="prev" onClick={prevBtnClick} disabled={current === 1}>
          이전
        </button>
        <span>
          {current}/{totalPage}
        </span>
        <button
          id="next"
          onClick={nextBtnClick}
          disabled={current === totalPage}
        >
          다음
        </button>
      </div>
    </EntireContainer>
  );
}

export default ChargedPointList;
