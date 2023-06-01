import React, { FC } from 'react';

import { CardExternalSourcesType } from '../../constants/@types';

import styles from './CardExternalSources.module.css';

type CardProps = {
  card: CardExternalSourcesType;
};

const CardExternalSources: FC<CardProps> = ({ card }) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>{card?.icon}</div>
      <div className={styles.name}>{card?.name}</div>
    </div>
  );
};

export default CardExternalSources;
