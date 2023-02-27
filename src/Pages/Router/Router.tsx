import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
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
import CheckNewPassword from "../CheckNewPassword";
import ProfilePage from "../ProfilePage";
import SignUpHead from "../SignUpHead";
import SignUpHeadInfo from "../SignUpHead/SignUpHeadInfo";
import ProfileDev from "../ProfileDev";
import PaymentsPage from "../PaymentsPage";
import SignUpPoInfo from "../SignUpHead/SignUpPoInfo";
import SignUpDev from "../SignUpDev";

export enum PathNames {
  Home = "/",
  Main = "/main",
  SignIn = "/sign-in",
  SignUp = "/sign-up",
  SignUpPageRole = "/sign-up/1",
  SignUpPageInfo = "/sign-up/2",
  SignUpHead = "/sign-up-head",
  SignUpDev = "/sign-up-dev",
    SignUpHeadInfo = "/sign-up-head/info",
  SignUpPoInfo = "/sign-up-po/info",
  PasswordRequestPage = "/password/request",
  PasswordReset = "/password/reset/:uid/:token",
  CheckNewPassword = "/check-password",
  ProjectScreen = "/project",
  ActivateUser = "/activate/:uid/:token",
  Profile = "/profile",
  ProfileDevTeam = "/profile/dev",
  Payments = "/payments",
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
        </Route>

                <Route path={PathNames.SignIn} element={<SignIn/>}/>
                <Route path={PathNames.SignUp} element={<SignUp/>}/>
                <Route path={PathNames.SignUpHead} element={<SignUpHead/>}/>
                <Route path={PathNames.SignUpDev} element={<SignUpDev/>}/>
                <Route path={PathNames.SignUpHeadInfo} element={<SignUpHeadInfo/>}/>
                <Route path={PathNames.SignUpPoInfo} element={<SignUpPoInfo/>}/>
                <Route
                    path={PathNames.SignUpPageRole}
                    element={<RegistrationRolePage/>}
                />

                <Route path={PathNames.ActivateUser} element={<ActivationPage/>}/>
                <Route
                    path={PathNames.SignUpPageInfo}
                    element={<RegistrationInfoPage/>}
                />
                <Route path={PathNames.PasswordReset} element={<PasswordReset/>}/>
                <Route
                    path={PathNames.CheckNewPassword}
                    element={<CheckNewPassword/>}
                />
                <Route
                    path={PathNames.PasswordRequestPage}
                    element={<PasswordRequestPage/>}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
