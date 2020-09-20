import React from 'react';
import { connect } from 'react-redux';
import { Layout, Typography, Image } from 'antd';
import Heading from '../heading/heading';
import OptionPicker from '../option-picker/option-picker';
import { USER_ROLES, HEADER_TEXT } from '../../constants/constants';
import { onSetUser } from '../../actions/actions';
import logo from '../../assets/images/logo-rsschool3.png';
import './header-container.scss';

const HeaderContainer = ({ role, onSelect }) => {
  const { Header } = Layout;
  const { Link } = Typography;
  const { title, linkUrl, imageAlt } = HEADER_TEXT;

  return (
    <Header
      className="header-container"
      style={{
        background: 'transparent',
      }}
    >
      <Link className="logo" href={linkUrl} target="_blank" rel="noreferrer">
        <Image src={logo} alt={imageAlt} width={85} preview={false} className="logo__img" />
      </Link>
      <Heading>{title}</Heading>
      <OptionPicker onChange={onSelect} defaultValue={role} options={USER_ROLES} />
    </Header>
  );
};

const mapStateToProps = ({ role }) => ({
  role,
});

export default connect(mapStateToProps, { onSelect: onSetUser })(HeaderContainer);
