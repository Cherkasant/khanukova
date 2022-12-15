import React, { FC, ChangeEvent } from "react";
import styles from "./Input.module.css";
import classnames from "classnames";

type InputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  className?: string;
};

const Input: FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  disabled,
  error,
  className,
}) => {
  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };
  return (
    <div className={styles.container}>
      <input
        value={value}
        onChange={onChangeInput}
        placeholder={placeholder}
        disabled={disabled}
        className={classnames(styles.input, {
          [styles.disabled]: !!disabled,
        })}
      />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default Input;
