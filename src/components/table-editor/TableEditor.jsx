import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { EditTwoTone } from '@ant-design/icons';
import { onSetTableEditMode } from '../../actions/actions';

/**
 * Function that calls onSetEvents action.
 * @callback onChangeCallback
 * @param {boolean} tableEditMode - Edit table mode (true|false).
 */

/**
 * Component that showing 'Edit table' button, which switch edit table mode.
 * @component
 * @param {Object} wrapper - Arguments wrapper.
 * @param {boolean} wrapper.tableEditMode - Edit table mode (true|false).
 * @param {onChangeCallback} wrapper.onChange - Calls onSetTableEditMode action.
 * @param {Object} wrapper.style - CSSProperties.
 */
const TableEditor = ({ tableEditMode, onChange, style }) => (
  <Button
    type="dashed"
    onClick={() => onChange(!tableEditMode)}
    icon={tableEditMode && <EditTwoTone />}
    style={style}
  >
    Edit table
  </Button>
);

const mapStateToProps = ({ tableEditMode }) => ({
  tableEditMode,
});

export default connect(mapStateToProps, { onChange: onSetTableEditMode })(TableEditor);
