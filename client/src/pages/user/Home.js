import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  increment,
  decrement,
  incrementByAmount,
  selectCount,
} from '../../store/slices/counter.js';
import Modal from '../../modals/Modal-1';
// import Payment from '../../component/Payment.js';
import PointCharge from '../../component/PointCharge.js';

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const count = useSelector(selectCount);
  const dispatch = useDispatch();

  const modalToggle = () => {
    setIsOpen(!isOpen);
  };
  // const handleButtonClick = useCallback((e) => {
  //   e.stopPropagation();
  //   setIsOpen((nextIsOpen) => !nextIsOpen);
  // }, []);

  // useEffect(() => {
  //   if (!isOpen) return;

  //   const handleClickOutside = () => setIsOpen(false);
  //   window.addEventListener('click', handleClickOutside);

  //   return () => {
  //     window.removeEventListener('click', handleClickOutside);
  //   };
  // }, [isOpen]);

  return (
    <div>
      Home 입니다.
      {/* <button onClick={modalToggle}>모달 열기</button> */}
      <div>
        <button onClick={() => dispatch(increment())}>increment</button>
        <div>count is {count}</div>
        <button onClick={() => dispatch(decrement())}>decrement</button>
        <button onClick={() => dispatch(incrementByAmount(5))}>
          5 increment
        </button>
      </div>
      <button onClick={modalToggle}>결제하기</button>
      {isOpen ? (
        <Modal handleBtnClick={modalToggle} content={<PointCharge />} />
      ) : (
        ''
      )}
    </div>
  );
}

export default Home;
