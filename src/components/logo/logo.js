import React from 'react';
import './logo.scss';
import logo from '../../assets/Images/logo-rsschool.png';

const Logo = () => {
  return (
    <>
      <div className="logo">
        <a href="https://app.rs.school/" className="logo__link">
          <img src={logo} className="logo__link__img" alt="Rs-school" />
        </a>
      </div>
    </>
  );
};

export default Logo;
