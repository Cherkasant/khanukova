import React, { FC } from "react";
import styles from "./Card.module.css";
import { CardType } from "../constants/@types";

type CardProps = {
  card: CardType;
};

const Card: FC<CardProps> = ({ card }) => {
  const { title, tasksProgress, date, budget, payment } = card;

  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      {/*<hr className={styles.hr} />*/}
      <div className={styles.projectContainer}>
        <div className={styles.task}>
          <div className={styles.taskName}>Задачи</div>
          <div className={styles.taskProgress}>{tasksProgress}</div>
        </div>
        <div className={styles.task}>
          <div className={styles.taskName}>Дедлайн</div>
          <div className={styles.taskProgress}>{date}</div>
        </div>
        <div className={styles.task}>
          <div className={styles.taskName}>Бюджет</div>
          <div className={styles.taskProgress}>{budget}</div>
        </div>
        <div className={styles.task}>
          <div className={styles.taskName}>Выплачено</div>
          <div className={styles.taskProgress}>{payment}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
