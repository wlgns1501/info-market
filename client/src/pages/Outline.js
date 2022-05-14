import { Outlet } from 'react-router-dom';
import Header from '../component/Header';
import Footer from '../component/Footer';
import styled from 'styled-components';

const EntireContainer = styled.div`
  * {
    box-sizing: border-box;
    word-break: keep-all;
    font-family: 'Helvetica', 'Arial', sans-serif;
    color: red;
  }
`;

const BodyContainer = styled.div`
  * {
    margin: 0;
    background-color: wheat;
  }
`;

function Outline() {
  return (
    <EntireContainer>
      <Header />
      <BodyContainer id="content-wrap">
        <Outlet />
      </BodyContainer>
      <Footer />
    </EntireContainer>
  );
}

export default Outline;
