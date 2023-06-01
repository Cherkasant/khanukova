import { FC } from 'react';

import { CardsListExternalSourcesType } from '../../constants/@types';

import CardExternalSources from '../CardExternalSources';

import styles from './CardListExternalSources.module.css';

type CardsListExternalSourcesProps = {
  CardsListExternalSources: CardsListExternalSourcesType;
};

const CardListExternalSources: FC<CardsListExternalSourcesProps> = ({ CardsListExternalSources }) => {
  return CardListExternalSources?.length ? (
    <div className={styles.container}>
      {CardsListExternalSources.map((card, index) => {
        return <CardExternalSources key={index} card={card} />;
      })}
    </div>
  ) : null;
};

export default CardListExternalSources;
