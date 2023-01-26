import React, { useState } from "react";
import styles from "./Home.module.css";
import Input from "../../Components/Input";
import Title from "../../Components/Title";
import { SearchIcon } from "../../Assets/icons/SearchIcon";
import CardsList from "../../Components/CardsList";
import { PathNames } from "../Router/Router";
import { useNavigate } from "react-router";

const MOCK_CARDS_LIST = [
  {
    id: 1,
    projectName: "Yandex",
    tasks: "20%",
    deadline: "16.02.2222",
    budget: "1000000$",
    paid: "12500$",
  },
  {
    id: 2,
    projectName: "Google",
    tasks: "20%",
    deadline: "16.02.2222",
    budget: "1000000$",
    paid: "12500$",
  },
  {
    id: 3,
    projectName: "Apple",
    tasks: "20%",
    deadline: "16.02.2222",
    budget: "1000000$",
    paid: "12500$",
  },
  {
    id: 4,
    projectName: "Google",
    tasks: "20%",
    deadline: "16.02.2222",
    budget: "1000000$",
    paid: "12500$",
  },
  {
    id: 5,
    projectName: "Apple",
    tasks: "20%",
    deadline: "16.02.2222",
    budget: "1000000$",
    paid: "12500$",
  },
  {
    id: 6,
    projectName: "Yandex",
    tasks: "20%",
    deadline: "16.02.2222",
    budget: "1000000$",
    paid: "12500$",
  },
];
const Home = () => {
  const navigate = useNavigate();
  const [inputSearch, setInputSearch] = useState("");

  const onChange = (value: string) => {
    setInputSearch(value);
  };
  return (
    <div className={styles.container}>
      <div className={styles.widgets}>
        <Title name={"Projects"} className={styles.title} />
        <div className={styles.searchContainer}>
          <Input
            value={inputSearch}
            onChange={onChange}
            placeholder={"Project name"}
            className={styles.searchInput}
          />
          <div className={styles.icon}>
            <SearchIcon />
          </div>
        </div>
      </div>
      <div
        className={styles.btnAdd}
        onClick={() => navigate(PathNames.ProjectScreen)}
      >
        {"+Add new"}
      </div>

      <CardsList cardsList={MOCK_CARDS_LIST} />
    </div>
  );
};

export default Home;
