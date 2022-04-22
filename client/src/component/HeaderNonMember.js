import logo from '../images/logo.png'
import { NavLink } from 'react-router-dom'
import '../css/Header.css'


function HeaderNonMember() {

  return (
    <div className='header-container'>
      <nav className='header-navbar'>
        <div className='header-logo'>
          <NavLink to='/'>
            <img src={logo} alt='logo ' className='header-logo' />
          </NavLink>
        </div>
        <ul className='header-links'>
          <li>로그인</li>
          <li>회원가입</li>
        </ul>
      </nav>
    </div>
  )
}

export default HeaderNonMember;