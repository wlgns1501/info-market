import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';

const EntireContainer = styled.div`
  border: 3px solid green;
  height: 58%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  > button#paging {
    font-size: 1rem;
    padding: 1% 2%;
  }
`;

const UlContainer = styled.ul`
  margin: 0;
  /* margin-top: 2%; */
  border: 3px solid skyblue;
  height: 80%;
  width: 65%;
  list-style: none;
  padding: 2%;
  overflow: auto;
  > li.item {
    border: 1px solid red;
    margin-bottom: 3%;
    /* padding: 2%; */

    > p {
      border: 1px solid black;
      margin: 0;
      padding: 1%;
      &.detail {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: yellow;
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

function Item() {
  return (
    <li className="item">
      <p className="createdAt">2022.04.20.20:09</p>
      <p className="detail">
        <FontAwesomeIcon id="coins" icon={faCoins} />
        <span>+ 5000 P</span>
      </p>
    </li>
  );
}

function ChargedPointList() {
  return (
    <EntireContainer>
      <UlContainer>
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </UlContainer>
      <button id="paging">1/1</button>
    </EntireContainer>
  );
}

export default ChargedPointList;
