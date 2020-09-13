import React from 'react';
import { connect } from 'react-redux';
import { Menu, Button } from 'antd';
// import { AppstoreTwoTone } from '@ant-design/icons';
import OptionPicker from '../option-picker/option-picker';
import { VIEW_MODES } from '../../constants/constants';
import TIMEZONE from '../../constants/timezone';
import { onViewModeChange, onTimezoneChange } from '../../actions/actions';

import './controls.scss';

const Controls = ({ currentView, currentTimezone, onViewSelect, onTimezoneSelect }) => (
  <Menu mode="horizontal">
    <Menu.Item>
      <OptionPicker onChange={onViewSelect} defaultValue={currentView} options={VIEW_MODES} />
    </Menu.Item>
    <Menu.Item>
      <OptionPicker onChange={onTimezoneSelect} defaultValue={currentTimezone} options={TIMEZONE} />
    </Menu.Item>
    <Menu.Item>
      <Button type="primary">Something else</Button>
    </Menu.Item>
    <Menu.Item>
      <Button>Something else</Button>
    </Menu.Item>
  </Menu>
);

const mapStateToProps = ({ currentView, currentTimezone }) => ({
  currentView,
  currentTimezone,
});

export default connect(mapStateToProps, {
  onViewSelect: onViewModeChange,
  onTimezoneSelect: onTimezoneChange,
})(Controls);
