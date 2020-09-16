import React from 'react';

import { Menu, Dropdown, Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';

import './dropdown.scss';

const DropdownContainer = ({ text, onBtnClick, items = [] }) => {
  const handleMenuClick = ({ key }) => {
    setTimeout(() => {
      onBtnClick(key);
    }, 200);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      {items.map((item) => (
        <Menu.Item key={item}>{item}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} placement="topCenter">
      <Button>
        {text} <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default DropdownContainer;
