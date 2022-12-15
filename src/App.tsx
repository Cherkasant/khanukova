import React from "react";
import "./App.css";
import Button, { ButtonTypes } from "./Components/Button";
import { LinkedinIcon } from "./Assets/icons/LinkedinIcon";
import Role from "./Components/Role";
import { ProjectsIcon } from "./Assets/icons/ProjectsIcon";
import Card from "./Components/Card";

function App() {
  const MOCK_CARD = {
    id: 1,
    title: "Рога и Копыта",
    tasksProgress: "20%",
    date: "16.02.2222",
    budget: "1000000$",
    payment: "12500$",
  };

  return (
    <div className="App">
      <Role name={"Test"} />
      <Button title={"Login"} type={ButtonTypes.TextButton} />
      <Button title={<LinkedinIcon />} type={ButtonTypes.IconButton} />
      <Button title={"Login"} type={ButtonTypes.TextButton} disabled={true} />
      <ProjectsIcon />
      <Card card={MOCK_CARD} />
    </div>
  );
}

export default App;
