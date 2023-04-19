import type { CheckboxChangeEvent } from 'antd/es/checkbox';

import React from 'react';

import { Checkbox } from 'antd';

import styles from './PuzzleCheckbox.module.css';

const onChange = (e: CheckboxChangeEvent) => {
  console.log(`checked = ${e.target.checked}`);
};

const PuzzleCheckbox = () => {
  return (
    <div className={styles.container}>
      <Checkbox onChange={onChange} style={{ color: 'red', backgroundColor: 'skyblue' }} />
    </div>
  );
};
export default PuzzleCheckbox;
