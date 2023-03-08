import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "../SignIn";
import PagesWrapper from "../../Components/PagesWrapper";
import PasswordRequestPage from "../PasswordRequestPage";
import Home from "../Home";
import ProjectScreen from "../ProjectScreen";
import PasswordReset from "../PasswordResetPage";
import ActivationPage from "../ActivationPage";
import CheckNewPassword from "../CheckNewPassword";
import ProfilePage from "../ProfilePage";
import SignUpHead from "../SignUpHead";
import SignUpHeadInfo from "../SignUpHead/SignUpHeadInfo";
import ProfileDev from "../ProfileDev";
import PaymentsPage from "../PaymentsPage";
import SignUpPoInfo from "../SignUpHead/SignUpPoInfo";
import CheckEmailPage from "../CheckEmailPage";
import NotificationsPage from "../NotificationsPage";

export enum PathNames {
  Home = "/",
  Main = "/main",
  SignIn = "/sign-in",
  SignUp = "/sign-up",
  SignUpHead = "/sign-up-head",
  SignUpHeadInfo = "/sign-up-head/info",
  SignUpPoInfo = "/sign-up-po/info",
  PasswordRequestPage = "/password/request",
  PasswordReset = "/password/reset/:uid/:token",
  CheckNewPassword = "/check-password",
  CheckYourEmail = "/check-email",
  ProjectScreen = "/project",
  ActivateUser = "/activate/:uid/:token",
  Profile = "/profile",
  ProfileDevTeam = "/profile/dev",
  Payments = "/payments",
  Notifications = "/notifications"
}

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PathNames.Home} element={<PagesWrapper />}>
          <Route path={PathNames.Main} element={<Home />} />
          <Route path={PathNames.Profile} element={<ProfilePage />} />
          <Route path={PathNames.ProjectScreen} element={<ProjectScreen />} />
          <Route path={PathNames.ProfileDevTeam} element={<ProfileDev />} />
          <Route path={PathNames.Payments} element={<PaymentsPage />} />
          <Route path={PathNames.Notifications} element={<NotificationsPage />} />
        </Route>

        <Route path={PathNames.SignIn} element={<SignIn />} />
        <Route path={PathNames.SignUp} element={<SignUpHead />} />
        <Route path={PathNames.CheckYourEmail} element={<CheckEmailPage />} />
        <Route path={PathNames.SignUpHeadInfo} element={<SignUpHeadInfo />} />
        <Route path={PathNames.SignUpPoInfo} element={<SignUpPoInfo />} />
        <Route path={PathNames.ActivateUser} element={<ActivationPage />} />
        <Route path={PathNames.PasswordReset} element={<PasswordReset />} />
        <Route
          path={PathNames.CheckNewPassword}
          element={<CheckNewPassword />}
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
