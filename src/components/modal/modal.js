import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import './modal.scss';

export default class ModalInfo extends Component {
  state = {
    visible: false,
    id: 1,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { id, visible } = this.state;
    const {
      name,
      description,
      descriptionUrl,
      organizer,
      place,
      type,
      dateTime,
      deadline,
    } = this.props.data[id];
    const names = organizer.map((el) => (
      <div key={Math.random() * 100}>
        {el.name}, <br />
        <strong>Url:</strong> <a href={el.url}>{el.url}</a>
      </div>
    ));
    const types = typeof type === 'object' ? type.join(' , ') : <span>{type}</span>;
    const deadlineSpan =
      deadline === '' ? null : (
        <span>
          <span className="modal_bold">Deadline: </span>
          {deadline}
        </span>
      );
    return (
      <>
        <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button>
        <Modal
          title={`${name}`}
          visible={visible}
          bodyStyle={{ fontSize: 18 }}
          footer={[
            <Button key="OK" type="primary" onClick={this.handleOk}>
              Ok
            </Button>,
          ]}
          onCancel={this.handleOk}
        >
          <p>
            <span className="modal_bold">Type:</span> {types}
          </p>
          <p>
            <span className="modal_bold">Place:</span> {place}
          </p>
          <p>
            <span className="modal_bold">Description:</span> {description}
          </p>
          <p>
            <span className="modal_bold">TaskUrl: </span>{' '}
            <a href={descriptionUrl}>{descriptionUrl}</a>
          </p>
          <div>
            <span className="modal_bold">Organizer:</span> {names}
          </div>
          <br />
          <div className="modal_date">
            <span>
              <span className="modal_bold">Date: </span>
              {dateTime}
            </span>
            {deadlineSpan}
          </div>
        </Modal>
      </>
    );
  }
}
