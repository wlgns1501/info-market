import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
function Post() {
  const { postId } = useParams();
  useEffect(() => {
    console.log(postId);
  }, []);
  return <div>{postId}번 Post 입니다.</div>;
}

export default Post;
