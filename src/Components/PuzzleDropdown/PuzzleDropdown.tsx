import React, { FC, PropsWithChildren } from 'react';

import Dropdown, { Group, Option, ReactDropdownProps } from 'react-dropdown';

import styles from './PuzzleDropdown.module.css';

export type PuzzleDropdownProps = PropsWithChildren<ReactDropdownProps> & {
  options: (Group | Option | string)[];
};

const PuzzleDropdown: FC<PuzzleDropdownProps> = ({ options, ...rest }: PuzzleDropdownProps) => {
  return (
    <div className={styles.container}>
      <Dropdown
        options={options}
        {...rest}
        className={styles.dropdownContainer}
        controlClassName={styles.dropdownControl}
        placeholderClassName={styles.dropdownPlaceholder}
        arrowClassName={styles.dropdownArrow}
        arrowClosed={<span className={styles.arrowClosed} />}
        arrowOpen={<span className={styles.arrowOpen} />}
        menuClassName={styles.dropdownMenu}
      />
    </div>
  );
};

export default PuzzleDropdown;
