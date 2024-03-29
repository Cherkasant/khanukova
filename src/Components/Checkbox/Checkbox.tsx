import React, { FC } from 'react';

import classNames from 'classnames';

import styles from './Checkbox.module.css';

export enum IconColor {
  Blue = 'blue',
  Green = 'green',
  Red = 'red',
  Purple = 'purple',
  Yellow = 'yellow'
}

type CheckboxProps = {
  isChecked: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  icon?: boolean;
  color?: IconColor;
};

const Checkbox: FC<CheckboxProps> = (props) => {
  const { isChecked, handleChange, label, color, icon } = props;

  const IconClassName = color ? styles[color] : ' without-color';
  return (
    <div className={styles.container}>
      <input type="checkbox" id={label} checked={isChecked} onChange={handleChange} className={styles.input} />
      {icon ? <div className={classNames(styles.icon, IconClassName)}>{''}</div> : null}
      <label htmlFor={label} className={styles.label}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
