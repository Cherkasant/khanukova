import { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';

import Dropdown, { Group, Option, ReactDropdownProps } from 'react-dropdown';

import styles from './PuzzleDropdown.module.css';

export type PuzzleDropdownProps = PropsWithChildren<ReactDropdownProps> & {
  options: (Group | Option | string)[];
  error?: string;
};

const PuzzleDropdown: FC<PuzzleDropdownProps> = ({ options, error, ...rest }: PuzzleDropdownProps) => {
  return (
    <div className={styles.container}>
      <Dropdown
        options={options}
        {...rest}
        className={styles.dropdownContainer}
        controlClassName={classNames(styles.dropdownControl, { [styles.inputError]: error })}
        placeholderClassName={styles.dropdownPlaceholder}
        arrowClassName={styles.dropdownArrow}
        arrowClosed={<span className={styles.arrowClosed} />}
        arrowOpen={<span className={styles.arrowOpen} />}
        menuClassName={styles.dropdownMenu}
      />
      <div className={styles.error}>{error}</div>
    </div>
  );
};

export default PuzzleDropdown;
