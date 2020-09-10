import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import './modal.scss';

export default class ModalInfo extends Component {
  state = {
    visible: false,
    id: 0,
  };

  showModal = () => {
    const id = this.state.id + 1;
    this.setState({
      visible: true,
      id,
    });
  };

  handleOk = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { id } = this.state;
    const { name, description, descriptionUrl, organizer, place, type } = this.props.data[id];
    const names = organizer.map((el) => (
      <div key={Math.random() * 100}>
        {el.name}, Url: <a href={el.url}>{el.url}</a>
      </div>
    ));
    return (
      <>
        <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button>
        <Modal
          title={`${name}`}
          visible={this.state.visible}
          bodyStyle={{ fontSize: 18 }}
          footer={[
            <Button key="OK" type="primary" onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
          className="modal"
        >
          <p>
            <span className="modal_bold">Type:</span> {type}
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
        </Modal>
      </>
    );
  }
}
