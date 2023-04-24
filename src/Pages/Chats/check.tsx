import React from 'react';
import { useState } from 'react';
import { Collapse } from 'antd';
import classNames from 'classnames';
import { useSelector } from 'react-redux';

import Input from '../../Components/Input';
import InputChat from '../../Components/Chats/InputChat';

import styles from './Chats.module.css';

export const Check = () => {
  const [d, setD] = useState('');
  return (
    <div className={classNames(styles.e)}>
      <Collapse />
      <Input />
      <InputChat />
    </div>
  );
};
