import React, { useState, useEffect } from 'react';
import HeartImg from '../../images/heart.png';
import EmptyHeartImg from '../../images/empty-heart.png';

const HeartButton = ({ like, onClick }) => {
  return (
    <div src={like ? HeartImg : EmptyHeartImg} onClick={onClick} />
  );
};

export default HeartButton;