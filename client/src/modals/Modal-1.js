import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const EntireContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  > div.content {
    width: 50vw;
    padding: 2em;
    border-radius: 1em;
    background: white;
    position: relative;
    > span {
      font-size: 1.5rem;
      position: absolute;
      top: 5%;
      right: 3%;
      cursor: pointer;
    }
  }
`;

export default function Modal({ content, handleBtnClick }) {
  return (
    <EntireContainer>
      <div className="content">
        <span className="x-btn" onClick={handleBtnClick}>
          &times;
        </span>
        {content}
      </div>
    </EntireContainer>
  );
}
