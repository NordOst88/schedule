import React, { useState } from 'react';
import { Switch, Space, Divider } from 'antd';
import 'antd/dist/antd.css';
import './user-switcher.scss';
import { CrownOutlined, UserOutlined } from '@ant-design/icons';

const UserSwitcher = () => {
  const [isMentor, setRole] = useState(true);
  const toggleSwitch = () => {
    document.querySelector('.switch').classList.toggle('hidden');
    document.querySelector('.divider').classList.toggle('hidden');
  };

  return (
    <Space className="switch_container">
      <div
        role="button"
        tabIndex="0"
        onKeyDown={() => toggleSwitch()}
        onClick={() => toggleSwitch()}
        className="switch_container-text"
      >
        <span> {isMentor ? 'Mentor' : 'Student'} </span>
      </div>
      <Divider className="divider" type="vertical" style={{ backgroundColor: '#000000' }} />
      <Switch
        className="switch"
        onClick={() => {
          setRole(!isMentor);
        }}
        defaultChecked
        checkedChildren={<CrownOutlined />}
        unCheckedChildren={<UserOutlined />}
      />
    </Space>
  );
};

export default UserSwitcher;
