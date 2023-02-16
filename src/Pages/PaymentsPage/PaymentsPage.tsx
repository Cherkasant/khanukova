import React from "react";
import styles from "./PaymentsPage.module.css";
import Title from "../../Components/Title";

const PaymentsPage = () => {
  return (
    <div className={styles.container}>
      <Title name={"Payments"} className={styles.title} />
      <div className={styles.header}>
        <div className={styles.headerColumn}>{"Project name"}</div>
        <div className={styles.headerColumn}>{"Milestone-sprint"}</div>
        <div className={styles.headerColumn}>{"Status"}</div>
        <div className={styles.headerColumn}>{"Payment Deadline"}</div>
      </div>
    </div>
  );
};

export default PaymentsPage;
