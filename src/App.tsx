import React from "react";
import "./App.css";
import Button, { ButtonTypes } from "./Components/Button";
import { LinkedinIcon } from "./Assets/icons/LinkedinIcon";
import Role from "./Components/Role";
import { ProjectsIcon } from "./Assets/icons/ProjectsIcon";
import Card from "./Components/Card";
import CardsList from "./Components/CardsList";

function App() {
  const MOCK_CARDS_LIST = [
    {
      id: 1,
      title: "Яндекс",
      tasksProgress: "20%",
      date: "16.02.2222",
      budget: "1000000$",
      payment: "12500$",
    },
    {
      id: 2,
      title: "Рога",
      tasksProgress: "20%",
      date: "16.02.2222",
      budget: "1000000$",
      payment: "12500$",
    },
    {
      id: 3,
      title: "Копыта",
      tasksProgress: "20%",
      date: "16.02.2222",
      budget: "1000000$",
      payment: "12500$",
    },
    {
      id: 4,
      title: "Google",
      tasksProgress: "20%",
      date: "16.02.2222",
      budget: "1000000$",
      payment: "12500$",
    },
    {
      id: 5,
      title: "Apple",
      tasksProgress: "20%",
      date: "16.02.2222",
      budget: "1000000$",
      payment: "12500$",
    },
    {
      id: 6,
      title: "Рога и Копыта",
      tasksProgress: "20%",
      date: "16.02.2222",
      budget: "1000000$",
      payment: "12500$",
    },
    {
      id: 7,
      title: "Рога",
      tasksProgress: "20%",
      date: "16.02.2222",
      budget: "1000000$",
      payment: "12500$",
    },
    {
      id: 8,
      title: "Копыта",
      tasksProgress: "20%",
      date: "16.02.2222",
      budget: "1000000$",
      payment: "12500$",
    },
  ];

  return (
    <div className="App">
      <CardsList cardsList={MOCK_CARDS_LIST} />
    </div>
  );
}

export default App;
