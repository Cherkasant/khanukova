import React, { FC, useState } from "react";
import styles from "./CardsLisrs.module.css";
import { CardsListType } from "../constants/@types";
import Card from "../Card";

type CardsListProps = {
  cardsList: CardsListType | null;
};

const CardsList: FC<CardsListProps> = ({ cardsList }) => {
  // const filterOptions = [
  //   "Название проекта",
  //   "Задачи",
  //   "Дедлайн",
  //   "Бюджет",
  //   "Выплачено",
  // ];
  // const [value, setValue] = useState("");
  //
  // const options = filterOptions.map((text, index) => {
  //   return (
  //     <option key={index} value={index}>
  //       {text}
  //     </option>
  //   );
  // });

  return cardsList?.length ? (
    <div className={styles.container}>
      {/*<div className={styles.filter}>*/}
      {/*  <p className={styles.filterName}> Фильтровать:</p>*/}
      {/*  <select*/}
      {/*    value={value}*/}
      {/*    onChange={(event) => setValue(event.target.value)}*/}
      {/*  >*/}
      {/*    {options}*/}
      {/*  </select>*/}
      {/*</div>*/}
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
