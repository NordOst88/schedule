import React from 'react';

import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import './dropdown.scss';

const DropdownContainer = ({ text, onBtnClick, items = [], styles }) => {
  const handleMenuClick = ({ key }) => {
    setTimeout(() => {
      onBtnClick(key);
    }, 200);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {items.map((item) => (
        <Menu.Item key={item} style={{ ...styles }}>
          {item}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="topCenter">
      <Button
        style={{
          padding: '4px 10px',
          display: 'flex',
          alignItems: 'center',
          ...styles,
        }}
      >
        {text}{' '}
        <DownOutlined
          style={{ position: 'absolute', fontSize: 14, opacity: '.4', right: 0, top: 10 }}
        />
      </Button>
    </Dropdown>
  );
};

export default DropdownContainer;
