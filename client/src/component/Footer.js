import React from 'react';
import logo from '../images/logo.png';
import styled from 'styled-components';

const FooterContainer = styled.div`
  text-align: center;
  background: #343a40;
  color: white;
  align-items: center;
  padding: 20px 30px;
`;

const Footer = () => {
  const thisYear = () => {
    const year = new Date().getFullYear();
    return year;
  };

  return (
    <FooterContainer className="footer">
      <p>
        Copyright &copy; <span>{thisYear()}</span>
      </p>
      <ul className="footer-info">
        <li>TeamLeader&nbsp;:&nbsp;오상민</li>
        <li>Back-End&nbsp;:&nbsp;오상민</li>
        <li>Back-End&nbsp;:&nbsp;유지훈</li>
        <li>Front-End&nbsp;:&nbsp;최윤선</li>
        <li>Front-End&nbsp;:&nbsp;박제곤</li>
      </ul>
    </FooterContainer>
  );
};

export default Footer;
