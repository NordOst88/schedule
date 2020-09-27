import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { EditTwoTone } from '@ant-design/icons';
import { onSetTableEditMode } from '../../actions/actions';

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
