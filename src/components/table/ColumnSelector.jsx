import React from 'react';
import { Menu, Dropdown, Checkbox } from 'antd';
import { TableOutlined, DownOutlined } from '@ant-design/icons';

/**
 * Function that calls onSetEvents action.
 * @callback columnSelectHandler
 * @param {Object} column - Selected column.
 * @param {boolean} target.checked - Checked status of the selected column.
 */

/**
 * Component that showing dropdown menu with checkboxes as options.
 * @component
 * @param {Object} wrapper - Arguments wrapper.
 * @param {Array} wrapper.visibleColumns - List of visible columns.
 * @param {columnSelectHandler} wrapper.columnSelectHandler - Send selected column and checked status to parent component.
 * @param {Array} wrapper.columns - List of original columns.
 * @param {string} wrapper.fontSize - fontSize CSSProperty.
 */
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
