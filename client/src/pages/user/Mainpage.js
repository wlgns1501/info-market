import React, { useState, useEffect } from 'react';
import Search from '../../component/Search';
import styled from 'styled-components';
import freeBoardData from '../../mockdata/freeBoardData';
import Footer from '../../component/Footer';
import search from '../../images/search.jpg';

const EntireContainer = styled.div`
  margin: auto auto;
  width: 120vh;
  height: 80vh;
  border: 5px solid red;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  > div.top {
    width: 100%;
    border: 2px solid orange;
    height: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    /* background-color: palegreen; */
    > div.bar {
      width: 80%;
    }
  }
`;

const UlContainer = styled.ul`
  list-style: none;
  padding: 0;
  border: 2px solid blue;
  margin: 0;
  width: 45%;
  margin-top: -30px;
  &.first {
    margin-right: 5%;
    border: 3px solid yellow;
  }
  > li {
    border: 1px solid black;
    display: flex;
    > p {
      &.title {
        width: 90%;
        overflow: hidden;
      }
      &.writer {
        text-align: center;
        width: 10%;
        border-left: 2px solid gray;
        margin-left: 10px;
      }
    }
  }
`;

function Post({ post }) {
  const { id, title, writer } = post;
  return (
    <li>
      <p className="title">{title}</p>
      <p className="writer">{writer}</p>
    </li>
  );
}

function List({ posts, className }) {
  return (
    <UlContainer className={className}>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </UlContainer>
  );
}

function Mainpage() {
  const { posts } = freeBoardData;
  return (
    <>
      <EntireContainer>
        <div className="top">
          <Search />
        </div>
        <List className="first" posts={posts} />
        <List posts={posts} />
        <Footer />
      </EntireContainer>
    </>
  );
}

export default Mainpage;
