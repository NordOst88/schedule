import React from 'react';
import { Menu, Dropdown, Checkbox } from 'antd';
import { TableOutlined, DownOutlined } from '@ant-design/icons';
import columns from './columns';

const ColumnSelector = ({ visibleColumns, columnSelectHandler }) => {
  const checkSetter = (column) => visibleColumns.includes(column);

  const menu = (cols) => (
    <Menu>
      {cols.map((column) => (
        <Menu.Item key={column.key}>
          <Checkbox
            checked={checkSetter(column)}
            onChange={({ target }) => columnSelectHandler(column, target.checked)}
          >
            {column.title}
          </Checkbox>
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu(columns)} arrow>
      <span>
        <TableOutlined /> Select Column <DownOutlined />
      </span>
    </Dropdown>
  );
};

export default ColumnSelector;
