import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import './modal.scss';

export default class ModalInfo extends Component {
  state = {
    visible: false,
    id: 1,
  };

  getTime = (time) => {
    const date = new Date(+time);
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

    return <span>{`${year}-${month}-${day} ${hours}:${minutes}`}</span>;
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
      links,
    } = this.props.data[id];

    const names = organizer.map((el) => (
      <div key={Math.random() * 100}>
        <a href={el.url}>{el.name}</a>
      </div>
    ));

    const types = typeof type === 'object' ? type.join(' , ') : <span>{type}</span>;

    const deadlineSpan =
      deadline === '' ? null : (
        <span>
          <span className="modal_bold">Deadline: </span>
          {this.getTime(deadline)}
        </span>
      );

    const usefullLinks =
      links === []
        ? null
        : links.map((el) => (
            <>
              <div key={Math.random() * 100}>
                <a href={el.url}>{el.name}</a>
              </div>
            </>
          ));

    return (
      <>
        <Button type="primary" onClick={this.showModal}>
          Open Modal
        </Button>
        <Modal
          width={650}
          title={`${name}`}
          visible={visible}
          style={{ top: 20 }}
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
          <div className="modal_flex">
            <div>
              <span className="modal_bold">Organizer:</span> {names}
            </div>
            <div className="modal_flex-ml">
              <span className="modal_bold">Usefull links:</span> {usefullLinks}
            </div>
          </div>
          <br />
          <div className="modal_flex-sb">
            <span>
              <span className="modal_bold">Date: </span>
              {this.getTime(dateTime)}
            </span>
            {deadlineSpan}
          </div>
        </Modal>
      </>
    );
  }
}
