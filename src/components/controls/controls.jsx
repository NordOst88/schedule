import React from 'react';
import { connect } from 'react-redux';
import { Menu, Button } from 'antd';
import { AppstoreTwoTone } from '@ant-design/icons';
import OptionPicker from '../option-picker/option-picker';
import { VIEW_MODES } from '../../constants/constants';
import { onViewModeChange } from '../../actions/actions';

import './controls.scss';

const Controls = ({ currentView, onSelect }) => (
  <Menu mode="horizontal">
    <Menu.Item
      icon={<AppstoreTwoTone style={{ fontSize: '2.5rem', verticalAlign: 'text-bottom' }} />}
    >
      <OptionPicker onChange={onSelect} defaultValue={currentView} options={VIEW_MODES} />
    </Menu.Item>
    <Menu.Item>
      <Button type="primary">Something else</Button>
    </Menu.Item>
    <Menu.Item>
      <Button>Something else</Button>
    </Menu.Item>
  </Menu>
);

const mapStateToProps = ({ currentView }) => ({
  currentView,
});

export default connect(mapStateToProps, { onSelect: onViewModeChange })(Controls);
