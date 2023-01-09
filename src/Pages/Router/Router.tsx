import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "../SignIn";
import RegistrationRolePage from "../RegistrationRolePage";
import RegistrationInfoPage from "../RegistrationInfoPage";
import PagesWrapper from "../../Components/PagesWrapper";
import PasswordRequestPage from "../PasswordRequestPage";
import SignUp from "../SignUp";
import Home from "../Home";
import ProjectScreen from "../ProjectScreen";
import PasswordReset from "../PasswordResetPage";
import ActivationPage from "../ActivationPage";

export enum PathNames {
  Home = "/",
  Main = "/main",
  SignIn = "/sign-in",
  SignUp = "/sign-up",
  SignUpPageRole = "/sign-up/1",
  SignUpPageInfo = "/sign-up/2",
  PasswordRequestPage = "/password/request",
  PasswordReset = "/password/reset",
  ProjectScreen = "/project",
  ActivateUser = "/activate/:uid/:token",
}

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PathNames.Home} element={<PagesWrapper />}>
          <Route path={PathNames.Main} element={<Home />} />
          <Route path={PathNames.ProjectScreen} element={<ProjectScreen />} />
        </Route>

        <Route path={PathNames.SignIn} element={<SignIn />} />
        <Route path={PathNames.SignUp} element={<SignUp />} />
        <Route
          path={PathNames.SignUpPageRole}
          element={<RegistrationRolePage />}
        />

        <Route path={PathNames.PasswordReset} element={<PasswordReset />} />
        <Route path={PathNames.ActivateUser} element={<ActivationPage />} />
        <Route
          path={PathNames.SignUpPageInfo}
          element={<RegistrationInfoPage />}
        />
        <Route
          path={PathNames.PasswordRequestPage}
          element={<PasswordRequestPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
