import React from 'react';
import { connect } from 'react-redux';
import { Menu, Select, Button } from 'antd';
import { AppstoreTwoTone } from '@ant-design/icons';
import { VIEW_MODES } from '../../constants/constants';
import { onViewModeChange } from '../../actions/actions';

import './controls.scss';

const Controls = ({ currentView, onSelect }) => {
  const { Option } = Select;

  return (
    <Menu mode="horizontal">
      <Menu.Item
        icon={<AppstoreTwoTone style={{ fontSize: '2.5rem', verticalAlign: 'text-bottom' }} />}
      >
        <Select
          onChange={onSelect}
          showSearch="true"
          defaultValue={currentView}
          style={{
            width: 120,
            fontSize: '2rem',
          }}
        >
          {VIEW_MODES.map((mode) => (
            <Option value={mode} key={mode}>
              {mode}
            </Option>
          ))}
        </Select>
      </Menu.Item>
      <Menu.Item>
        <Button type="primary">Something else</Button>
      </Menu.Item>
      <Menu.Item>
        <Button>Something else</Button>
      </Menu.Item>
    </Menu>
  );
};

const mapStateToProps = ({ currentView }) => ({
  currentView,
});

export default connect(mapStateToProps, { onSelect: onViewModeChange })(Controls);
