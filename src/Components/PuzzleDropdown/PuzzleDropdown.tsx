import { FC, PropsWithChildren } from 'react';
import classNames from 'classnames';

import Dropdown, { Group, Option, ReactDropdownProps } from 'react-dropdown';

import { ClosedIcon } from '../../Assets/SignUpHead/ClosedIcon';

import { OpenIcon } from '../../Assets/SignUpHead/OpenIcon';

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
        arrowClosed={<ClosedIcon />}
        arrowOpen={<OpenIcon />}
        menuClassName={classNames(styles.dropdownMenu, menuClassName)}
      />
      <div className={styles.error}>{error}</div>
    </div>
  );
};

export default PuzzleDropdown;
