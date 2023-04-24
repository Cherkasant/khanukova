import { EditProjectIcon } from '../../Assets/ProjectPage/EditProjectIcon';
import { CardType } from '../constants/@types';
import styles from './Card.module.css';
import { FC } from 'react';

type CardProps = {
  card: CardType;
};

const Card: FC<CardProps> = ({ card }) => {
  const { projectName, tasks, deadline, budget, paid } = card;
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.title}>{projectName}</div>
        <div className={styles.iconEdit}>
          <EditProjectIcon />
        </div>
      </div>
      <div className={styles.projectContainer}>
        <div className={styles.task}>
          <div className={styles.taskName}>Tasks</div>
          <div className={styles.taskProgress}>{tasks}</div>
        </div>
        <div className={styles.task}>
          <div className={styles.taskName}>Deadline</div>
          <div className={styles.taskProgress}>{deadline}</div>
        </div>
        <div className={styles.task}>
          <div className={styles.taskName}>Budget</div>
          <div className={styles.taskProgress}>{budget}</div>
        </div>
        <div className={styles.task}>
          <div className={styles.taskName}>Paid</div>
          <div className={styles.taskProgress}>{paid}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
