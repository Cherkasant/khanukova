import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "../SignIn";
import RegistrationRolePage from "../RegistrationRolePage";
import RegistrationInfoPage from "../RegistrationInfoPage";
import CardsList from "../../Components/CardsList";

export enum PathNames {
  Home = "/",
  SignIn = "/sign-in",
  SignUpPageRole = "/sign-up/1",
  SignUpPageInfo = "/sign-up/2",
}

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

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={PathNames.Home}
          element={<CardsList cardsList={MOCK_CARDS_LIST} />}
        />
        <Route path={PathNames.SignIn} element={<SignIn />} />
        <Route
          path={PathNames.SignUpPageRole}
          element={<RegistrationRolePage />}
        />
        <Route
          path={PathNames.SignUpPageInfo}
          element={<RegistrationInfoPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
