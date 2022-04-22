import logo from '../images/logo.png'
import '../css/Header.css'
import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function Header() {

  // const test = useSelector((state) => state);

  /* 반응형 상태에서 icon 누를시 메뉴 보이고, 일반적으론 안보이게하기 */
  const [isOpen, setIsOpen] = useState(false);

  const handleBar = () => {
    console.log('bar눌림')
    setIsOpen(!isOpen);
  }

  return (
    <div className='header-container'>
      <nav className='header-navbar'>
        <div className='header-logo'>
          <FontAwesomeIcon icon={faBars}
            className="header-faBars"
            onClick={() => handleBar()} />
          <NavLink to='/'>
            <img src={logo} alt='logo ' className='header-logo' />
          </NavLink>
        </div>
        <ul className='header-menu'>
          <li>메인페이지</li>
          <li>무료 정보 게시판</li>
          <li>유료 정보 게시판</li>
        </ul>
        <ul className='header-info'>
          <li>
            <FontAwesomeIcon icon={faCircleInfo} className="faCircleInfo" size='2x'>
              <li>로그아웃</li>
              <li>마이페이지</li>
            </FontAwesomeIcon>
          </li>
        </ul>
      </nav>
      <hr />
    </div>
  )
}
export default Header;