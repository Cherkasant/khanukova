import React, { FC } from "react";
import styles from "./PaymentsList.module.css";

type PaymentsListProps = {
  PaymentsArray: Array<{ name: string; milestone: string; deadline: string }>;
};

const PaymentsList: FC<PaymentsListProps> = ({ PaymentsArray }) => {
  return (
    <div className={styles.container}>
      {PaymentsArray.map((list) => {
        return (
          <div className={styles.list}>
            <div className={styles.column}>{list?.name}</div>
            <div className={styles.column}>{list?.milestone}</div>
            <div className={styles.column}></div>
            <div className={styles.column}>{list?.deadline}</div>
          </div>
        );
      })}
    </div>
  );
};

export default PaymentsList;
