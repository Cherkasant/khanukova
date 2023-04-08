import React, { ChangeEvent, FC } from 'react';
import classnames from 'classnames';

import styles from './Input.module.css';

type InputProps = {
  value?: string
  onChange?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  error?: string
  className?: string
  type?: string
  required?: boolean
  title?: string
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void
}

const Input: FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  disabled,
  error,
  className,
  type,
  required,
  title,
  onKeyDown
}) => {
  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <div className={styles.container}>
      {title && <div className={styles.title}>{title}</div>}
      <input
        required={required}
        type={type}
        value={value}
        onKeyDown={onKeyDown}
        onChange={onChangeInput}
        placeholder={placeholder}
        disabled={disabled}
        className={classnames(className, styles.input, {
          [styles.disabled]: !!disabled
        })}
        title={title}
      />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default Input;
