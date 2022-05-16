import React from 'react';
import Img1 from '../../images/img1.jpg';
import Img2 from '../../images/img2.png';
import Img3 from '../../images/img3.jpg';
import '../../css/Home.css';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import homeLast from '../../images/homeLast.jpeg';

function Home() {
  const navigate = useNavigate();

  const handleNonMember = () => {
    navigate(`/main`);
  };
  const handleLogin = () => {
    navigate(`/login`);
  };

  const EntireContainer = styled.div`
    * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
      font-family: 'Elice Bold';
      font-family: '순천B';
    }
  `;

  const IntroContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(-45deg, #fff, #c2c8c6, #5b8191, #7b7886);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
    @keyframes gradient {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
    display: flex;
    align-items: center;
    align-content: center;
    > div.floater {
      flex: 1 0 auto;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #3d261a;
      > div.title {
        flex: 1 0 auto;
        font-size: 3em;
        font-weight: bold;
        margin-bottom: 0.25em;
      }
      > div.desc {
        inline-size: 13em;
        flex: 1 0 auto;
        font-size: 2em;
        max-width: 60vw;
        margin-bottom: 1em;
      }
      > div.action {
        flex: 1 0 auto;
        > button {
          font-size: 1.4em;
          padding: 0.8em 1em;
          border-radius: 2em;
          border-style: hidden;
          background-color: rgba(255, 255, 255, 0.4);
          cursor: pointer;
        }
        > button:hover {
          font-weight: bold;
          background-color: rgba(255, 255, 255, 0.6);
        }
      }
    }
  `;

  const FeatureContainer = styled.div`
    width: 100vw;
    padding: 10rem 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    z-index: 1;
    background-color: #f3f5f7;
    border-bottom: solid lightgrey 1px;
    > img {
      min-width: 800px;
      width: 40%;
      height: 40%;
      border: solid lightgrey 1px;
      border-radius: 8px;
      box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
    }
    > div.section {
      max-width: 500px;
      max-height: 300px;
      margin-left: 7rem;
      margin-bottom: 3rem;
      word-break: keep-all;
      div.heading {
        color: #4e453c;
        margin: 2rem 0;
        font-size: 3rem;
        font-weight: 700;
        inline-size: 10em;
        line-height: 1.5em;
      }
      div.sub {
        margin: 0.3em 0;
        color: #7f5a34;
        font-size: 1.5em;
        inline-size: 20em;
        line-height: 1.5em;
      }
    }
  `;

  const FeatureContainer2 = styled(FeatureContainer)`
    background-color: white;
    div.section {
      margin-right: 7rem;
    }
  `;

  const OutroContainer = styled(IntroContainer)`
    height: 40vh;
    > div.floater {
      > div.title {
        font-size: 2em;
      }
      > div.action {
        > button {
          margin: 1em;
        }
      }
    }
  `;

  return (
    <EntireContainer>
      <IntroContainer>
        <div className="floater">
          <div className="title">Infomation</div>
          <div className="desc">
            당신이 필요한 정보는, 우리 Info-Market 에 있습니다.
          </div>
          <div className="action">
            <button onClick={handleNonMember}>비회원으로 이용하기</button>
          </div>
        </div>
      </IntroContainer>
      <FeatureContainer>
        <img src={Img2} />
        <div className="section">
          <div className="heading">나만 알기 아쉬운 정보가 있나요?</div>
          <div className="sub">정보는 재산입니다.</div>
          <div className="sub">당신의 정보를, 이곳에서 판매해보세요!</div>
        </div>
      </FeatureContainer>
      <FeatureContainer2>
        <div className="section">
          <div className="heading">무엇을 찾고 계신가요?</div>
          <div className="sub">우리 Info-Market 에서</div>
          <div className="sub">당신이 원하는 정보를 제공해 드릴게요</div>
        </div>
        <img src={Img3} />
      </FeatureContainer2>
      <FeatureContainer>
        <img src={homeLast} />
        <div className="section">
          <div className="heading">알고만 있는 정보, 아깝지 않으세요?</div>
          <div className="sub">유용한 정보를 판매하고,</div>
          <div className="sub">당신이 찾던 정보를 얻어가세요 !</div>
          <div className="sub">Info-Market 입니다</div>
        </div>
      </FeatureContainer>
      <OutroContainer>
        <div className="floater">
          <div className="action">
            <button onClick={handleNonMember}>비회원으로 이용하기</button>
            <button onClick={handleLogin}>로그인하기</button>
          </div>
        </div>
      </OutroContainer>
    </EntireContainer>
  );
}

export default Home;
// import React from 'react';
// import CusImg from '../../images/info.jpg';
// import SaleImg from '../../images/info2.jpg';
// import '../../css/Home.css';
// import { useNavigate } from 'react-router-dom';

// function Home() {
//   const navigate = useNavigate();

//   const handleNonMember = () => {
//     navigate(`/main`);
//   };
//   const handleLogin = () => {
//     navigate(`/login`);
//   };

//   return (
//     <div>
//       <div className="customer-section">
//         <img className="customer-img" src={CusImg} />
//         <div className="customer-info">
//           <h2>SEARCHING</h2>
//           <p>
//             사이트소개화면입니다
//             <br />
//             구매자 관점 설명 임시입니다
//             <br />
//             사이트소개화면입니다
//             <br />
//             구매자 관점 설명 임시입니다
//             <br />
//             사이트소개화면입니다
//             <br />
//             구매자 관점 설명 임시입니다
//             <br />
//           </p>
//         </div>
//       </div>
//       <div className="sales-section">
//         <img className="sales-img" src={SaleImg} />
//         <div className="sales-info">
//           <h2>SALES-INFO</h2>
//           <p>
//             사이트소개화면입니다
//             <br />
//             판매자 관점 설명 임시입니다
//             <br />
//             사이트소개화면입니다
//             <br />
//             판매자 관점 설명 임시입니다
//             <br />
//             사이트소개화면입니다
//             <br />
//             판매자 관점 설명 임시입니다
//             <br />
//           </p>
//         </div>
//       </div>
//       <div className="btn-wrap">
//         <button
//           className="nonmember-btn"
//           onClick={handleNonMember}
//           style={{ fontFamily: 'Elice Bold' }}
//         >
//           비회원으로 계속하기
//         </button>
//         <button className="nonmember-btn" onClick={handleLogin}>
//           로그인하기
//         </button>
//       </div>
//       <div style={{ height: '500px' }}>aaaaaaaaaaaaa</div>
//       <div style={{ height: '500px' }}>bbbbbbbbbbbb</div>
//       <div style={{ height: '300px' }}>cccccccccccccc</div>
//     </div>
//   );
// }

// export default Home;
