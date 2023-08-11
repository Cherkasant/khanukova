import { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';

import Dropdown, { Group, Option, ReactDropdownProps } from 'react-dropdown';

import styles from './PuzzleDropdown.module.css';

export type PuzzleDropdownProps = PropsWithChildren<ReactDropdownProps> & {
  options: (Group | Option | string)[];
  error?: string;
};

const PuzzleDropdown: FC<PuzzleDropdownProps> = ({ options, error, ...rest }: PuzzleDropdownProps) => {
  const { placeholderClassName, controlClassName, className, menuClassName } = rest;
  return (
    <div className={styles.container}>
      <Dropdown
        options={options}
        {...rest}
        className={styles.dropdownContainer}
        controlClassName={classNames(styles.dropdownControl, controlClassName, { [styles.inputError]: error })}
        placeholderClassName={classNames(styles.dropdownPlaceholder, placeholderClassName)}
        arrowClassName={styles.dropdownArrow}
        arrowClosed={<span className={classNames(styles.arrowClosed, className)} />}
        arrowOpen={<span className={classNames(styles.arrowOpen, className)} />}
        menuClassName={classNames(styles.dropdownMenu, menuClassName)}
      />
      <div className={styles.error}>{error}</div>
    </div>
  );
};

export default PuzzleDropdown;
