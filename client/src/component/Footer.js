import React from 'react';
import logo from '../images/logo.png';
import '../css/Footer.css';

const footer = () => {
  const thisYear = () => {
    const year = new Date().getFullYear();
    return year;
  };

  return (
    <div className="footer" style={{ height: '85px' }}>
      <p>
        Copyright &copy; <span>{thisYear()}</span>
      </p>
      <ul className="footer-info">
        {/* <li>TeamLeader&nbsp;:&nbsp;오상민</li>
        <li>Back-End&nbsp;:&nbsp;오상민</li>
        <li>Back-End&nbsp;:&nbsp;유지훈</li>
        <li>Front-End&nbsp;:&nbsp;최윤선</li>
        <li>Front-End&nbsp;:&nbsp;박제곤</li> */}
      </ul>
    </div>
  );
};

export default footer;
