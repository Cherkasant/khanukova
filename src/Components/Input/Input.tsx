import React, { ChangeEvent, FC } from 'react';
import classnames from 'classnames';

import styles from './Input.module.css';

type InputProps = {
  value?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
  type?: string;
  required?: boolean;
  title?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  minLength?: number;
  maxLength?: number;
};

const Input: FC<InputProps> = ({
  value,
  onChange,
  onFocus,
  placeholder,
  disabled,
  error,
  className,
  type,
  required,
  title,
  onKeyDown,
  minLength,
  maxLength
}) => {
  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };
  return (
    <div className={styles.container}>
      {title && <div className={styles.title}>{title}</div>}
      <input
        type={type}
        value={value}
        onKeyDown={onKeyDown}
        onChange={onChangeInput}
        onFocus={onFocus}
        placeholder={placeholder}
        disabled={disabled}
        className={classnames(className, styles.input, {
          [styles.disabled]: !!disabled,
          [styles.inputError]: error
        })}
        title={title}
        minLength={minLength}
        maxLength={maxLength}
      />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default Input;
