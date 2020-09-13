import React from 'react';

import { Modal, Space } from 'antd';

import Week from './week/week';
import Topic from './topic/topic';
import Type from './type/type';
import Time from './time/time';
import EstimatedTime from './estimated-time/estimated-time';
import Place from './place/place';
import Description from './description/description';
import Links from './links/links';
import Organizer from './organizer/organizer';
import Comment from './comment/comment';

import { MODAL_INFO_TEXT } from '../../constants/constants';

import './modal-info.scss';

const { noInfo } = MODAL_INFO_TEXT;

const ModalInfo = ({
  name = noInfo,
  week = noInfo,
  type = [noInfo],
  dateTime,
  deadline,
  estimatedTime = noInfo,
  place = noInfo,
  description = noInfo,
  descriptionUrl = null,
  links = {},
  organizer = [],
  comment = noInfo,
  displayModal,
  setDisplayModal,
  eventColors,
}) => (
  <Modal
    width={650}
    visible={displayModal}
    title={<Topic descriptionUrl={descriptionUrl} name={name} />}
    style={{ top: 20 }}
    footer={null}
    onCancel={() => {
      setDisplayModal(false);
    }}
  >
    <Space direction="vertical">
      <Week week={week} />
      <Type eventColors={eventColors} type={type} />
      <Time dateTime={dateTime} deadline={deadline} />
      <EstimatedTime estimatedTime={estimatedTime} />
      <Place place={place} />
      <Description description={description} />
      <Links links={links} />
      <Organizer organizer={organizer} />
      <Comment comment={comment} />
    </Space>
  </Modal>
);

export default ModalInfo;
