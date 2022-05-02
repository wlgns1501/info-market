import React, { useState, useEffect } from 'react';
import Search from '../../component/Search';
import styled from 'styled-components';

const EntireContainer = styled.div`
  border: 3px solid red;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  > section {
    border: 3px solid blue;
    min-width: 70%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    > #search {
      border: 3px solid green;
    }

    > div#posts-container {
      border: 5px solid yellow;
      min-height: 80%;
      display: flex;
      flex-direction: column;

      > div#sales-top-10 {
        border: 5px solid pink;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        > p {
          border: 1px solid black;
        }
        > ul {
          border: 1px solid black;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          flex-wrap: auto;
          /* justify-content: space-between; */
          > li {
            border: 1px solid lightcoral;
          }
        }
        > span {
          border: 1px solid black;
          display: flex;
          justify-content: flex-end;
          > button {
          }
        }
      }
      > div#free-newest-10 {
        border: 5px solid pink;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        > p {
          border: 1px solid black;
        }
        > ul {
          border: 1px solid black;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          flex-wrap: auto;
          /* justify-content: space-between; */
          > li {
            border: 1px solid lightcoral;
          }
        }
        > span {
          border: 1px solid black;
          display: flex;
          justify-content: flex-end;
          > button {
          }
        }
      }
    }
  }
`;

function Mainpage() {
  return (
    <EntireContainer>
      <section>
        <Search id="search" />
        {/* <Search
          id="search"
          searchOptions={searchOptions}
          dispatch={dispatch}
          updateSearch={updateSearch}
        /> */}
        <div id="posts-container">
          <div id="sales-top-10">
            <p>유료 정보글 TOP 10</p>
            <ul>
              <li>111111111111111111111</li>
              <li>222222222222222222222</li>
              <li>333333333333333333333</li>
              <li>444444444444444444444</li>
              <li>555555555555555555555</li>
              <li>666666666666666666666</li>
              <li>777777777777777777777</li>
              <li>888888888888888888888</li>
              <li>999999999999999999999</li>
              <li>101010101010101010101</li>
            </ul>
            <span>
              <button>더 보기</button>
            </span>
          </div>
          <div id="free-newest-10">
            <p>무료 정보글 최신 10</p>
            <ul>
              <li>111111111111111111111</li>
              <li>222222222222222222222</li>
              <li>333333333333333333333</li>
              <li>444444444444444444444</li>
              <li>555555555555555555555</li>
              <li>666666666666666666666</li>
              <li>777777777777777777777</li>
              <li>888888888888888888888</li>
              <li>999999999999999999999</li>
              <li>101010101010101010101</li>
            </ul>
            <span>
              <button>더 보기</button>
            </span>
          </div>
        </div>
      </section>
    </EntireContainer>
  );
}

export default Mainpage;
