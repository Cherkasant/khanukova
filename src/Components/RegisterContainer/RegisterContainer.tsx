import React, { FC, ReactElement } from "react";

import styles from "./RegisterContainer.module.css";
import Title from "../Title";

type FormContainerProps = {
  title: string;
  children: ReactElement;
};

const RegisterContainer: FC<FormContainerProps> = ({ title, children }) => {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <Title name={title} className={styles.title} />
      </div>
      {children}
    </div>
  );
};

export default RegisterContainer;
