import React from 'react';
import { Button, notification } from 'antd';

const popupMessage = ({ message, description, type, duration, object, callback }) => {
  let key = null;
  let btn = null;

  if (object && callback) {
    key = `open${Date.now()}`;
    const onClick = () => {
      notification.close(key);
      callback(object);
    };
    btn = (
      <Button onClick={onClick} type="primary" size="small">
        Try again
      </Button>
    );
  }

  notification[type]({
    message,
    description,
    duration,
    btn,
    key,
    style: { maxWidth: 300 },
  });
};

export default popupMessage;
