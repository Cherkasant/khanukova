import React, { FC, ReactElement } from 'react';

import styles from './FormContainer.module.css';

type FormContainerProps = {
  children: ReactElement;
};

const FormContainer: FC<FormContainerProps> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default FormContainer;
