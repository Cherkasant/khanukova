import { FC, PropsWithChildren, ReactElement } from 'react';
import classNames from 'classnames';
import { Button } from 'antd';

import { ButtonProps } from 'antd/es/button/button';

import styles from './PuzzleButton.module.css';

export enum PuzzleButtonTypes {
  TextButton = 'text',
  IconButton = 'icon'
}

export type PuzzleButtonProps = Omit<PropsWithChildren<ButtonProps>, 'onClick'> & {
  btnTitle?: string | ReactElement;
  btnType?: PuzzleButtonTypes;
  onClick?: () => void;
  btnClassName?: string;
  btnDisabled?: boolean;
};

const PuzzleButton: FC<PuzzleButtonProps> = ({
  btnType,
  btnTitle,
  btnClassName,
  onClick,
  btnDisabled,
  ...rest
}: PuzzleButtonProps) => {
  const buttonClassName = btnType && styles[btnType];

  return (
    <Button
      className={classNames(styles.button, buttonClassName, btnClassName, {
        [styles.disabled]: !!btnDisabled
      })}
      onClick={onClick}
      {...rest}>
      {btnTitle}
    </Button>
  );
};

export default PuzzleButton;
