import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { render } from 'react-dom';
import Payment from './Payment';
const PointCharge = (effect, deps) => {
  // useEffect(() => {
  //   const jquery = document.createElement('script');
  //   jquery.src = 'https://code.jquery.com/jquery-1.12.4.min.js';
  //   const iamport = document.createElement('script');
  //   iamport.src = 'https://cdn.iamport.kr/js/iamport.payment-1.1.7.js';
  //   document.head.appendChild(jquery);
  //   document.head.appendChild(iamport);
  //   return () => {
  //     document.head.removeChild(jquery);
  //     document.head.removeChild(iamport);
  //   };
  // }, []);
  const [isPoint, setPoint] = useState(0);

  const onChangePoint = (e) => {
    setPoint(e.target.value);
    // console.log(e.target.value);
  };
  // console.log(isPoint);
  return (
    <>
      <div>
        point :{' '}
        <input
          onChange={(e) => onChangePoint(e)}
          placeholder="충전할 포인트를 입력하세요."
        ></input>
      </div>
      <div>
        <Payment isPoint={isPoint} />
      </div>
    </>
  );
};

export default PointCharge;
