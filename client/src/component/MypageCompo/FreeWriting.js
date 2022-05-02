import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoins } from '@fortawesome/free-solid-svg-icons';

const WritingContainer = styled.div`
  border: 3px solid skyblue;
  height: 80%;
  width: 100%;
  > form {
    border: 3px solid yellow;
    height: 100%;
    width: 99%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    > textarea {
      font-size: 1rem;
      width: 95%;
      &#title {
        margin-top: 2%;
        margin-bottom: 2%;
        height: 2rem;
      }
      &#content {
        flex-grow: 1;
      }
    }
    > div.filebox {
      margin: 1% auto 1% 0;
      /* margin: 0; */
      display: flex;
      justify-content: center;
      align-items: center;
      > input#selectFile {
        border: 1px dotted red;
        margin-left: 10%;
      }
      /* > input#hidden-input {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
      }
      > label {
        display: inline-block;
        padding: 0.4em 0.75em;
        line-height: normal;
        vertical-align: middle;
        background-color: #337ab7;
        cursor: pointer;
        border-radius: 0.25em;
        color: #fff;
      }
      > input.disable-input {
        display: inline-block;
        padding: 0.5em 0.75em;
        font-size: 1rem;
        background-color: #f5f5f5;
        border: 1px solid lightgray;
        border-radius: 0.25em;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        width: 50%;
      } */
    }
    > div.submit {
      margin-left: auto;
      margin-right: 2%;
      > button {
        font-size: 1rem;
        padding: 0.5em 0.75em;
        appearance: none;
        background-color: #f5f5f5;
        border: 1px solid gray;
        margin-bottom: 20%;
      }
    }
  }
`;

function Writing() {
  return (
    <form
      enctype="multipart/form-data"
      // action="write_ok.php?board_id=<?echo $board_id;?>"
      method="post"
    >
      {/* <div id="in_title"> */}
      <textarea
        name="title"
        id="title"
        rows="1"
        cols="55"
        placeholder="제목"
        maxlength="100"
        required
      ></textarea>
      {/* </div> */}

      {/* <div class="wi_line"></div> */}
      {/* <div id="in_content"> */}
      <textarea
        name="content"
        id="content"
        // rows="10"
        // cols="55"
        placeholder="내용"
        required
      ></textarea>
      {/* </div> */}

      <div className="filebox">
        {/* <input className="disable-input" value="파일선택" disabled="disabled" />

        <label for="hidden-input">업로드</label>
        <input type="file" id="hidden-input" /> */}
        <input id="selectFile" type="file" />
      </div>

      <div className="submit">
        <button type="submit">글 작성</button>
      </div>
    </form>
  );
}

function FreeWriting() {
  return (
    <WritingContainer>
      <Writing />
    </WritingContainer>
  );
}

export default FreeWriting;
