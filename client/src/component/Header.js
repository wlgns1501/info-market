import logo from '../images/logo.png';
import '../css/Header.css';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import UserMenu from './UserMenu';

function Header() {
  // const test = useSelector((state) => state);

  /* 반응형 상태에서 icon 누를시 메뉴 보이고, 일반적으론 안보이게하기 */
  const [isOpen, setIsOpen] = useState(false);

  const handleBar = () => {
    console.log('bar눌림');
    setIsOpen(!isOpen);
  };

  return (
    <div className="header-container">
      <nav className="header-navbar">
        <div className="header-logo">
          <FontAwesomeIcon
            icon={faBars}
            className="header-faBars"
            onClick={() => handleBar()}
          />
          <NavLink to="/">
            <img
              src={logo}
              alt="logo "
              className="header-logo"
              style={{ minWidth: '150px' }}
            />
          </NavLink>
        </div>
        <ul className="header-menu">
          <NavLink to="/main">
            <li>메인페이지</li>
          </NavLink>
          <NavLink to="/freeboard">
            <li>무료 정보 게시판</li>
          </NavLink>
          <NavLink to="/paidboard">
            <li>유료 정보 게시판</li>
          </NavLink>
        </ul>
        <ul className="header-info">
          <UserMenu />
        </ul>
      </nav>
      <hr />
    </div>
  );
}
export default Header;
