import React, { useRef, useEffect } from 'react';

import { Modal, Space, Typography } from 'antd';

import getEventColor from '../../utils/getEventColor';

import Type from '../task-type';
import Links from '../links';
import Organizer from '../organizer/organizer';

import getFormattedDate from '../../utils/getFormattedDate';
import { MODAL_INFO_TEXT } from '../../constants/constants';

import './modal-info.scss';

const {
  noInfo,
  estimatedWeek,
  taskType,
  taskStart,
  taskDeadline,
  estimatedStudyTime,
  taskPlace,
  taskDescription,
  taskLinks,
  taskOrganizer,
  taskComment,
  taskName,
} = MODAL_INFO_TEXT;

// todo: delete after resolve
// export default class ModalInfo extends PureComponent {
//   container = React.createRef();

//   componentDidMount() {
//     // // console.log('targetRef2', document.querySelector('.myodal'));
//     // console.log('targetRef2', document.querySelector('.myodal'));
//     // // console.log('targetRef2', document.querySelector('body'));
//     // console.log('componentDidMount', this.container.current);

//     console.log('render', this.container);
//   }

//   render() {
//     console.log('render', this.container);

//     const {
//       name = noInfo,
//       week = noInfo,
//       type = [],
//       dateTime,
//       deadline,
//       estimatedTime = noInfo,
//       place = noInfo,
//       description = noInfo,
//       descriptionUrl = null,
//       links = {},
//       organizer = [],
//       comment = noInfo,
//       displayModal,
//       setDisplayModal,
//       eventColors,
//       currentTimezone,
//     } = this.props;
//     const { Link } = Typography;
//     const getTypeTaskTags = () => <Type {...{ type, eventColors }} />;
//     const getLinks = () => <Links {...{ links }} />;
//     const getOrganizer = () => <Organizer {...{ organizer }} />;
//     const getTopic = () => (
//       <Link href={descriptionUrl} target="_blank">
//         {name}
//       </Link>
//     );
//     const startDate = getFormattedDate(dateTime, currentTimezone) || noInfo;
//     const deadlineDate = getFormattedDate(deadline, currentTimezone) || noInfo;

//     return (
//       <Modal
//         ref={this.container}
//         className="myodal"
//         width={650}
//         visible={displayModal}
//         title={<Line title={taskName} text={getTopic()} />}
//         centered
//         footer={null}
//         onCancel={() => {
//           setDisplayModal(false);
//         }}
//       >
//         <Space direction="vertical">
//           <Line title={estimatedWeek} text={week} />
//           <Line title={taskType} text={getTypeTaskTags()} />
//           <Line title={taskStart} text={startDate} />
//           <Line title={taskDeadline} text={deadlineDate} />
//           <Line title={estimatedStudyTime} text={estimatedTime} />
//           <Line title={taskPlace} text={place} />
//           <Line title={taskDescription} text={description} />
//           <Line title={taskLinks} text={getLinks()} />
//           <Line title={taskOrganizer} text={getOrganizer()} />
//           <Line title={taskComment} text={comment} />
//         </Space>
//       </Modal>
//     );
//   }
// }

const ModalInfo = ({
  name = noInfo,
  week = noInfo,
  type = [],
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
  currentTimezone,
}) => {
  const { Link } = Typography;
  const getTypeTaskTags = () => <Type {...{ type, eventColors }} />;
  const getLinks = () => <Links {...{ links }} />;
  const getOrganizer = () => <Organizer {...{ organizer }} />;
  const getTopic = () => (
    <Link href={descriptionUrl} target="_blank">
      {name}
    </Link>
  );
  const startDate = getFormattedDate(dateTime, currentTimezone) || noInfo;
  const deadlineDate = getFormattedDate(deadline, currentTimezone) || noInfo;

  const modalContainerRef = useRef(null);

  // todo: ??? need refactor

  useEffect(() => {
    const css = `.ant-modal-header { background-color: ${getEventColor(eventColors, type)}5e; }`;
    const style = document.createElement('style');
    style.innerHTML = css;
    modalContainerRef.current.appendChild(style);
  }, []);

  return (
    <div ref={modalContainerRef}>
      <Modal
        width={650}
        visible={displayModal}
        title={<Line title={taskName} text={getTopic()} />}
        centered
        footer={null}
        onCancel={() => {
          setDisplayModal(false);
        }}
      >
        <Space direction="vertical">
          <Line title={estimatedWeek} text={week} />
          <Line title={taskType} text={getTypeTaskTags()} />
          <Line title={taskStart} text={startDate} />
          <Line title={taskDeadline} text={deadlineDate} />
          <Line title={estimatedStudyTime} text={estimatedTime} />
          <Line title={taskPlace} text={place} />
          <Line title={taskDescription} text={description} />
          <Line title={taskLinks} text={getLinks()} />
          <Line title={taskOrganizer} text={getOrganizer()} />
          <Line title={taskComment} text={comment} />
        </Space>
      </Modal>
    </div>
  );
};

export default ModalInfo;

const Line = ({ title, text }) => {
  const { Text } = Typography;
  return (
    <>
      <Text strong>{title}</Text>
      <Text>{text}</Text>
    </>
  );
};
