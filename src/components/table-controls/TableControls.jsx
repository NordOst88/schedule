import React from 'react';
import { connect } from 'react-redux';
import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const TableControls = ({ currentView, currentTimezone }) => {
  console.log(currentView, currentTimezone);
  return (
    <Space>
      <Button type="dashed" icon={<PlusOutlined />}>
        Add event
      </Button>
    </Space>
  );
};

const mapStateToProps = ({ currentView, currentTimezone }) => ({
  currentView,
  currentTimezone,
});

export default connect(mapStateToProps)(TableControls);
