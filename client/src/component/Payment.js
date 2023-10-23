import React, { useEffect } from 'react';
import axios from 'axios';
// import { render } from 'react-dom';

const Payment = (effect, deps, isPoint) => {
  useEffect(() => {
    const jquery = document.createElement('script');
    jquery.src = 'https://code.jquery.com/jquery-1.12.4.min.js';
    const iamport = document.createElement('script');
    iamport.src = 'https://cdn.iamport.kr/js/iamport.payment-1.1.7.js';
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);
  console.log(isPoint);

  const onClickPayment = async () => {
    const response = await axios.get('http://localhost:8080/point/getToken', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data);

    const { imp_cid, imp_code } = response.data;

    const { IMP } = window;
    IMP.init(imp_code); // 가맹점 식별코드 // 결제 데이터 정의
    const data = {
      pg: imp_cid, // PG사 (필수항목)
      pay_method: 'card', // 결제수단 (필수항목)
      merchant_uid: `mid_${new Date().getTime()}`, // 결제금액 (필수항목)
      name: '결제 테스트', // 주문명 (필수항목)
      amount: '1', // 금액 (필수항목)
      custom_data: { name: '부가정보', desc: '세부 부가정보' },
      buyer_name: '임기원', // 구매자 이름
      buyer_tel: '01099558701', // 구매자 전화번호 (필수항목)
      buyer_email: 'l4279625@gmail.com', // 구매자 이메일
      buyer_addr: '구천면로 365-13',
      buyer_postalcode: '05258',
    };
    IMP.request_pay(data, callback);
  };

  const callback = (response) => {
    const {
      success,
      error_msg,
      imp_uid,
      merchant_uid,
      pay_method,
      paid_amount,
      status,
    } = response;
    console.log(response);
    if (success) {
      alert('결제 성공');
      axios
        .post('http://localhost:8080/point/approve', {
          imp_uid,
          merchant_uid,
          pay_method,
          paid_amount,
          status,
        })
        .then((res) => {
          console.log(res);
        });
    } else {
      alert(`결제 실패 : ${error_msg}`);
    }
  };

  return (
    <>
      <button onClick={onClickPayment}>결제하기</button>
    </>
  );
};

export default Payment;
