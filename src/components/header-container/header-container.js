import React from 'react';
import { connect } from 'react-redux';
import { Layout, Select } from 'antd';
import Heading from '../heading/heading';
import { USER_ROLES } from '../../constants/constants';
import { onSetUser } from '../../actions/actions';
import logo from '../../assets/images/logo-rsschool3.png';
import './header-container.scss';

const HeaderContainer = ({ role, onSelect }) => {
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
        onChange={onSelect}
        showSearch="true"
        defaultValue={role}
        style={{
          width: 120,
          fontSize: '2rem',
        }}
      >
        {USER_ROLES.map((user) => (
          <Option
            style={{
              fontSize: '2rem',
            }}
            value={user}
            key={user}
          >
            {user}
          </Option>
        ))}
      </Select>
    </Header>
  );
};

const mapStateToProps = ({ role }) => {
  return {
    role,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSelect: (user) => dispatch(onSetUser(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
