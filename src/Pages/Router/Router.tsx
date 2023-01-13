import React from "react";
import { BrowserRouter } from "react-router-dom";
import FilterProjectScreen from "../../Components/FilteresPanel/FilterProjectScreen";

export enum PathNames {
  Home = "/",
  Main = "/main",
  SignIn = "/sign-in",
  SignUp = "/sign-up",
  SignUpPageRole = "/sign-up/1",
  SignUpPageInfo = "/sign-up/2",
  PasswordRequestPage = "/password/request",
  PasswordReset = "/password/reset/:uid/:token",
  CheckNewPassword = "/check-password",
  ProjectScreen = "/project",
  ActivateUser = "/activate/:uid/:token",
}

const Router = () => {
  return (
    <BrowserRouter>
      {/*<Routes>*/}
      {/*  <Route path={PathNames.Home} element={<PagesWrapper />}>*/}
      {/*    <Route path={PathNames.Main} element={<Home />} />*/}
      {/*    <Route path={PathNames.ProjectScreen} element={<ProjectScreen />} />*/}
      {/*  </Route>*/}

      {/*  <Route path={PathNames.SignIn} element={<SignIn />} />*/}
      {/*  <Route path={PathNames.SignUp} element={<SignUp />} />*/}
      {/*  <Route*/}
      {/*    path={PathNames.SignUpPageRole}*/}
      {/*    element={<RegistrationRolePage />}*/}
      {/*  />*/}

      {/*  <Route path={PathNames.ActivateUser} element={<ActivationPage />} />*/}
      {/*  <Route*/}
      {/*    path={PathNames.SignUpPageInfo}*/}
      {/*    element={<RegistrationInfoPage />}*/}
      {/*  />*/}
      {/*  <Route path={PathNames.PasswordReset} element={<PasswordReset />} />*/}
      {/*  <Route*/}
      {/*    path={PathNames.CheckNewPassword}*/}
      {/*    element={<CheckNewPassword />}*/}
      {/*  />*/}
      {/*  <Route*/}
      {/*    path={PathNames.PasswordRequestPage}*/}
      {/*    element={<PasswordRequestPage />}*/}
      {/*  />*/}
      {/*</Routes>*/}
      <FilterProjectScreen />
    </BrowserRouter>
  );
};

export default Router;
