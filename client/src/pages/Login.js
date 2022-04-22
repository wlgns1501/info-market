import React from 'react';
import axios from 'axios';
import Header from '../component/Header';
import Footer from '../component/Footer';
import '../css/Login.css'
import logo from '../images/logo.png'
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'

function Login() {

  const navigate = useNavigate()

  const handleRegister = () => {
    navigate(`/tos`)
  }
  // 관리자용 체크박스 알아보기, 체크박스 만들고, 특정키 입력시 보이게끔
  // 체크박스 누르면, 어드민쪽 테이블 진입

  return (
    <div>
      <Header />
      <NavLink to='/'>
        <img src={logo} alt='logo ' className='login-logo' />
      </NavLink>
      <div className='login-container'>
        <div className='login-input'>
          <input type='checkbox'></input>
          <input
            type='email'
            className='login-id'
            placeholder='email을 입력하세요'
          />
          <input
            type='password'
            className='login-password'
            placeholder='password을 입력하세요'
          />
          <div>
            <button className='button' type='submit'>로그인</button>
          </div>
          <div>
            <div>
              <button className='button'>카카오</button>
              <button className='button'>네이버</button>
            </div>
            <div>
              <button className='button'>아이디 찾기</button>
              <button className='button'>비밀번호 찾기</button>
              <button className='button' onClick={handleRegister}>회원가입</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Login