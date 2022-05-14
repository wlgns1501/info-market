import { Outlet } from 'react-router-dom';
import Header from '../component/Header';
import Footer from '../component/Footer';
import styled from 'styled-components';
import GlobalFonts from '../fonts/fonts';

const EntireContainer = styled.div`
  * {
    box-sizing: border-box;
    word-break: keep-all;
    /* font-family: 'Helvetica', 'Arial', sans-serif; */
    font-family: 'Elice Bold';
  }
`;

const BodyContainer = styled.div`
  * {
    margin: 0;
    font-family: 'Elice Regular';
  }
`;

function Outline() {
  return (
    <>
      <GlobalFonts />
      <EntireContainer>
        <Header />
        <BodyContainer id="content-wrap">
          <Outlet />
        </BodyContainer>
        <Footer />
      </EntireContainer>
    </>
  );
}

export default Outline;
