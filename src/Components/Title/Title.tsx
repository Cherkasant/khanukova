import { FC } from 'react';

import classnames from 'classnames';

import styles from './Title.module.css';

type TitleProps = {
  name: string
  className?: string
}

const Title: FC<TitleProps> = ({ name, className }) => {
  return <div className={classnames(className, styles.container)}>{name}</div>;
};

export default Title;
