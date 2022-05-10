import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo } from '../store/slices/userInfo';
import { inputPayment } from '../store/slices/point';
import Payment from './Payment';

const ChargeBoxContainer = styled.div`
  /* border: 3px solid black; */
  background-color: #f3f702;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  > p.header {
    width: 80%;
    font-weight: bold;
    padding-bottom: 5px;
    border-bottom: 1px solid black;
  }
  > input {
    font-size: 1rem;
    padding: 5px;
  }
  > button {
    font-size: 0.9rem;
    padding: 7px;
    background-color: #30302d;
    color: white;
    border-radius: 5px;
  }
`;

export default function ChargeBox() {
  const dispatch = useDispatch();
  const { phone, email } = useSelector(selectUserInfo);

  return (
    <ChargeBoxContainer className="charge-box">
      <p className="header">결제방식 {'>'} 카카오페이</p>
      <input
        placeholder="금액 입력"
        type="number"
        min="3000"
        step="1000"
        onChange={(e) =>
          dispatch(
            inputPayment({
              amount: e.target.value,
              buyer_tel: phone,
              buyer_email: email,
            }),
          )
        }
      />
      <p style={{ color: 'red' }}>3000원 이상부터 가능합니다.</p>
      <Payment />
    </ChargeBoxContainer>
  );
}
