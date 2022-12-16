import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "../SignIn";
import RegistrationRolePage from "../RegistrationRolePage";
import RegistrationInfoPage from "../RegistrationInfoPage";

export enum PathNames {
  Home = "/",
  SignIn = "/sign-in",
  SignUpPageRole = "/sign-up/1",
  SignUpPageInfo = "/sign-up/2",
}

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
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
