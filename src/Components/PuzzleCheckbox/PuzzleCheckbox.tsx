import type { CheckboxProps } from 'antd/es/checkbox';

import React, { FC, PropsWithChildren } from 'react';

import { Checkbox } from 'antd';

import styles from './PuzzleCheckbox.module.css';

export type PuzzleCheckboxProps = PropsWithChildren<CheckboxProps>;

const PuzzleCheckbox: FC<PuzzleCheckboxProps> = ({ ...rest }: PuzzleCheckboxProps) => {
  return (
    <div className={styles.container}>
      <Checkbox {...rest} />
    </div>
  );
};
export default PuzzleCheckbox;
