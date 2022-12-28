import React, { FC } from "react";
import styles from "./CardsLisrs.module.css";
import { CardsListType } from "../constants/@types";
import Card from "../Card";

type CardsListProps = {
  cardsList: CardsListType | null;
};

const CardsList: FC<CardsListProps> = ({ cardsList }) => {
  return cardsList?.length ? (
    <div className={styles.container}>
      <div className={styles.cardsContainer}>
        {cardsList.map((card, index) => {
          return <Card key={index} card={card} />;
        })}
      </div>
    </div>
  ) : (
    <div className={styles.noCards}>No cards yet...</div>
  );
};

export default CardsList;
