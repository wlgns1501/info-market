import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

const EntireContainer = styled.div`
  border: 5px solid yellow;
  height: 100%;

  > ul#user-Info-container {
    margin-top: 0;
    border: 5px solid orange;
    height: 25%;
    display: flex;
    list-style: none;
    padding-left: 0;
    > li {
      border: 1px dotted black;

      &.profile {
        flex: 3;
        display: flex;
        justify-content: center;
        align-items: center;
        display: flex;
        justify-content: space-evenly;
        > p {
          border: 1px solid purple;
          margin: 0 5px 0 5px;
          > figure {
            margin: 0;
            border: 1px solid black;
            width: 80px;
            height: 80px;
            border-radius: 50%;
          }
        }
      }
      &.my-points {
        flex: 2;
        display: flex;
        justify-content: center;
        align-items: center;

        > div.point-container {
          width: 100%;
          height: 100%;
          border: 1px solid red;
          display: flex;
          flex-direction: column;
          > p.title {
            margin: 0;
            padding: 2%;
            border: 1px solid black;
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          > div.detail {
            border: 1px solid black;
            flex: 6;
            /* padding: 2%; */
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            > p {
              border: 1px solid blue;
              margin: 0;
              text-align: center;
            }
            > div#charged {
              border: 1px solid blue;
              margin: 10% auto;
              > p {
                border: 1px solid orange;
                margin: 0;
                text-align: center;
              }
            }
            > div#earnings {
              border: 1px solid blue;
              > p {
                border: 1px solid orange;
                margin: 0;
                text-align: center;
              }
            }
          }
        }
      }

      &.charging-withdrawal {
        flex: 2;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        > button {
          margin: 10px 0;
          padding: 2%;
          font-size: 1rem;
        }
      }
    }
  }
`;

function UserInfo() {
  return (
    <EntireContainer>
      <ul id="user-Info-container">
        <li className="profile">
          <p className="user-photo">
            <figure></figure>
          </p>
          <p style={{ whiteSpace: 'nowrap' }}>김코딩</p>
          <p style={{ whiteSpace: 'nowrap' }}>브론즈</p>
        </li>
        <li className="my-points">
          <div className="point-container">
            <p className="title" style={{ whiteSpace: 'nowrap' }}>
              보유 포인트
            </p>
            <div className="detail">
              <p>2300 P</p>
              <div id="charged">
                <p style={{ whiteSpace: 'nowrap' }}>충전 포인트</p>
                <p>2300 P</p>
              </div>
              <div id="earnings">
                <p style={{ whiteSpace: 'nowrap' }}>누적 수익 포인트</p>
                <p>0 P</p>
              </div>
            </div>
          </div>
        </li>
        <li className="charging-withdrawal">
          <button style={{ whiteSpace: 'nowrap' }}>포인트 충전</button>
          <button style={{ whiteSpace: 'nowrap' }}>포인트 출금</button>
        </li>
      </ul>
      <Outlet />
    </EntireContainer>
  );
}

export default UserInfo;
