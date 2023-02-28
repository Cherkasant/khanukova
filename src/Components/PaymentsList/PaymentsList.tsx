import React, { FC } from "react";
import styles from "./PaymentsList.module.css";
import PaymentCard from "../PaymentCard";

type PaymentsListProps = {
  PaymentsArray: Array<{
    name: string;
    milestone: string;
    deadline: string;
    id: number;
  }>;
};

const PaymentsList: FC<PaymentsListProps> = ({ PaymentsArray }) => {
  return (
    <div className={styles.container}>
      {PaymentsArray.map((card) => {
        return <PaymentCard card={card} key={card.id} />;
      })}
    </div>
  );
};

export default PaymentsList;
