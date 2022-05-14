import React from 'react';
import CusImg from '../../images/info.jpg';
import SaleImg from '../../images/info2.jpg';
import '../../css/Home.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  const handleNonMember = () => {
    navigate(`/main`);
  };
  const handleLogin = () => {
    navigate(`/login`);
  };

  return (
    <div>
      <div className="customer-section">
        <img className="customer-img" src={CusImg} />
        <div className="customer-info">
          <h2>SEARCHING</h2>
          <p>
            사이트소개화면입니다
            <br />
            구매자 관점 설명 임시입니다
            <br />
            사이트소개화면입니다
            <br />
            구매자 관점 설명 임시입니다
            <br />
            사이트소개화면입니다
            <br />
            구매자 관점 설명 임시입니다
            <br />
          </p>
        </div>
      </div>
      <div className="sales-section">
        <img className="sales-img" src={SaleImg} />
        <div className="sales-info">
          <h2>SALES-INFO</h2>
          <p>
            사이트소개화면입니다
            <br />
            판매자 관점 설명 임시입니다
            <br />
            사이트소개화면입니다
            <br />
            판매자 관점 설명 임시입니다
            <br />
            사이트소개화면입니다
            <br />
            판매자 관점 설명 임시입니다
            <br />
          </p>
        </div>
      </div>
      <div className="btn-wrap">
        <button className="nonmember-btn" onClick={handleNonMember}>
          비회원으로 계속하기
        </button>
        <button className="nonmember-btn" onClick={handleLogin}>
          로그인하기
        </button>
      </div>
      <div style={{ height: '500px' }}>aaaaaaaaaaaaa</div>
      <div style={{ height: '500px' }}>bbbbbbbbbbbb</div>
      <div style={{ height: '300px' }}>cccccccccccccc</div>
    </div>
  );
}

export default Home;
