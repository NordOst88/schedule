import React from 'react';
import { Button, notification } from 'antd';

/**
 * Function which executes if on button click
 * @callback Callback
 * @param {any} callbacksArg - Any argument.
 */

/**
 * Function that call notification with specified parameters.
 * @param {Object} wrapper - Arguments wrapper.
 * @param {string} wrapper.message - Message of notification.
 * @param {string} wrapper.description - Description of notification.
 * @param {string} wrapper.type - Type of notification. Сould be 'error', 'warning', 'info' or 'success'.
 * @param {number} wrapper.duration - Duration of showing notification.
 * @param {any} wrapper.callbacksArg - An argument for callback.
 * @param {Callback} wrapper.callback - If callback and callbacksArg are defined then shows button 'try again'
 * with onClick calls callback.
 */
const popupMessage = ({ message, description, type, duration, callbacksArg, callback }) => {
  let key = null;
  let btn = null;

  if (callbacksArg && callback) {
    key = `open${Date.now()}`;
    const onClick = () => {
      notification.close(key);
      callback(callbacksArg);
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
