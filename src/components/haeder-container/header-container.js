import React from 'react';
import { Layout, Select } from 'antd';
import Heading from '../heading/heading';
import logo from '../../assets/images/logo-rsschool3.png';
import './header-container.scss';

const HeaderContainer = () => {
  const { Header } = Layout;
  const { Option } = Select;

  return (
    <Header
      style={{
        height: 55,
        background: 'transparent',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <a className="logo" href="https://rs.school/" target="_blank" rel="noreferrer">
        <img src={logo} alt="Rolling Scopes School Logo" />
      </a>
      <Heading>Schedule</Heading>
      <Select
        defaultValue="Student"
        style={{
          width: 120,
          fontSize: '2rem',
        }}
      >
        <Option value="Mentor">Mentor</Option>
        <Option value="Student">Student</Option>
      </Select>
    </Header>
  );
};

export default HeaderContainer;
