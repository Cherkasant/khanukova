import type { CheckboxProps } from 'antd/es/checkbox';

import React, { FC, PropsWithChildren } from 'react';

import { Checkbox } from 'antd';

import classNames from 'classnames';

import styles from './PuzzleCheckbox.module.css';

export enum IconColor {
  Blue = 'blue',
  Lime = 'lime',
  Green = 'green',
  Orange = 'orange',
  Pink = 'pink',
  Purple = 'purple',
  Yellow = 'yellow'
}

export type PuzzleCheckboxProps = PropsWithChildren<CheckboxProps> & {
  label?: string;
  icon?: boolean;
  color?: IconColor;
};

const PuzzleCheckbox: FC<PuzzleCheckboxProps> = ({ label, icon, color, ...rest }: PuzzleCheckboxProps) => {
  const IconClassName = color ? styles[color] : ' without-color';

  return (
    <div className={styles.container}>
      <Checkbox {...rest} />
      {icon ? <div className={classNames(styles.icon, IconClassName)}>{''}</div> : null}
      <label htmlFor={label} className={styles.label}>
        {label}
      </label>
    </div>
  );
};
export default PuzzleCheckbox;
