import React from 'react';
import { Menu, Dropdown, Checkbox } from 'antd';
import { TableOutlined, DownOutlined } from '@ant-design/icons';

const ColumnSelector = ({ visibleColumns, columnSelectHandler, columns, fontSize }) => {
  const checkSetter = (column) => visibleColumns.some((item) => item.key === column.key);
  const menu = (cols) => (
    <Menu>
      {cols.map((column) => (
        <Menu.Item key={column.key}>
          <Checkbox
            style={{ fontSize }}
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
      <span style={{ fontSize }}>
        <TableOutlined /> Select Column <DownOutlined />
      </span>
    </Dropdown>
  );
};

export default ColumnSelector;
