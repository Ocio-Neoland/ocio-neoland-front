import './Header.css';

import React, { useContext, useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { CityContext } from '../../Context/CityContext';
import { UserContext } from '../../Context/UserContext';
import { cities, types } from '../../data/data';
import BtnDarkMode from '../Btn-darkMode/Btn-darkMode';
import SearchBar from '../SearchBar/SearchBar';

const Header = () => {
  const { logout } = useContext(UserContext);
  const { city, setCity } = useContext(CityContext);
  const menuBtn = useRef('null');
  const hiddenMenu = useRef('null');
  const menuCity = useRef('null');
  const [menu, setMenu] = useState(false);
  const [chooseCity, setChooseCity] = useState(false);
  const [profile, setProfile] = useState(false);
  const { user, avatar } = useContext(UserContext);
  const navigate = useNavigate();

  const handleClickMenu = () => {
    if (menu === false) {
      setMenu(true);
      setProfile(false);
      setChooseCity(false);
    } else {
      setMenu(false);
      setProfile(false);
      setChooseCity(false);
    }
  };

  const handleClickAvatar = () => {
    if (profile === false) {
      setProfile(true);
      setMenu(false);
      setChooseCity(false);
    } else {
      setProfile(false);
      setChooseCity(false);
      setMenu(false);
    }
  };

  const handleClickCity = () => {
    if (chooseCity === false) {
      setChooseCity(true);
      setProfile(false);
      setMenu(false);
    } else {
      setProfile(false);
      setMenu(false);
      setChooseCity(false);
    }
  };

  const handleClickOutside = (event) => {
    if (
      event.target.localName === 'h2' ||
      event.target.localName === 'button' ||
      event.target.localName === 'a'
    ) {
      console.log(event);
    } else {
      setChooseCity(false);
      setMenu(false);
      setProfile(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mouseup', handleClickOutside);
    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
    };
  }, []);

  return (
    <header>
      <div className="ocio-nav-container">
        <NavLink to={'/'}>
          <img
            src="https://res.cloudinary.com/dqkcdzt1m/image/upload/v1680105261/Dise%C3%B1o_sin_t%C3%ADtulo_2_h0rscw.png"
            alt="imagen"
          />
        </NavLink>
        <nav>
          <ul>
            <li>
              <button
                className="ocio-sections-btn"
                ref={menuCity}
                onClick={handleClickCity}
              >
                {`${city}`}
              </button>
            </li>

            <li>
              <button
                className="ocio-sections-btn"
                ref={menuBtn}
                onClick={handleClickMenu}
              >
                Menu
              </button>
              {menu !== false && (
                <ul className="ocio-menu-sections hide-menu" ref={hiddenMenu}>
                  {types.map((type) => (
                    <NavLink
                      className="ocio-a-container"
                      onClick={handleClickMenu}
                      to={`/${type.name}`}
                      key={type.name}
                    >
                      <img className="icon-menu" src={type.img} alt={type.name} />
                      <h2>{type.name}</h2>
                    </NavLink>
                  ))}
                </ul>
              )}
            </li>
            <li>
              <SearchBar />
            </li>

            {!user ? (
              <li>
                <NavLink to={'/login'}>
                  <img
                    className="log"
                    src="https://res.cloudinary.com/dsvvktihq/image/upload/v1678960169/utils/20079_iurohv.png"
                    alt="logo login"
                  />
                </NavLink>
              </li>
            ) : (
              <li>
                <button className=" btn-avatar" onClick={handleClickAvatar}>
                  <img className="ocio-avatar-profile" src={avatar} alt={user} />
                </button>
              </li>
            )}
            <BtnDarkMode />
          </ul>
        </nav>
      </div>
      {chooseCity !== false && (
        <ul className="ocio-menu-sections3 hide-menu" ref={menuCity}>
          {cities.map((type) => (
            <button
              className="ocio-a-container3"
              onClick={(ev) => {
                console.log(ev), setCity(type), setChooseCity(false), navigate('/');
              }}
              key={type}
            >
              {type}
            </button>
          ))}
        </ul>
      )}

      {profile !== false && (
        <ul className="ocio-menu-sections2 hide-menu">
          <li>
            <NavLink
              className="ocio-a-container2"
              to="/profile"
              onClick={() => setProfile(false)}
            >
              Perfil
            </NavLink>
          </li>
          <li>
            <button
              type="button"
              className="ocio-a-container2"
              onClick={() => {
                logout(), setProfile(false);
              }}
            >
              <img
                className="logout"
                src="https://res.cloudinary.com/dpxyn2bps/image/upload/v1679902736/User-Interface-Logout-icon_aotorg.png"
                alt="btnlogout"
              />
            </button>
          </li>
        </ul>
      )}
    </header>
  );
};

export default Header;
