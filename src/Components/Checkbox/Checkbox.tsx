import React, { FC } from "react";
import styles from "./Checkbox.module.css";

type CheckboxProps = {
  isChecked: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  color?: string;
};

const Checkbox: FC<CheckboxProps> = ({
  isChecked,
  handleChange,
  label,
  color,
}) => {
  return (
    <div className={styles.container}>
      <input
        type="checkbox"
        id={label}
        checked={isChecked}
        onChange={handleChange}
        className={styles.input}
      />
      <div className={styles.color}></div>
      <label htmlFor={label} className={styles.label}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
