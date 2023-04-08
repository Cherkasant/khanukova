import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import PagesWrapper from '../../Components/PagesWrapper';
import { getUserName } from '../../Redux/Reducers/authReducer';
import authSelectors from '../../Redux/Selectors/authSelectors';
import ActivationPage from '../ActivationPage';
import CheckEmailPage from '../CheckEmailPage';
import CheckNewPassword from '../CheckNewPassword';
import Home from '../Home';
import NotificationsPage from '../NotificationsPage';
import PasswordRequestPage from '../PasswordRequestPage';
import PasswordReset from '../PasswordResetPage';
import PaymentsPage from '../PaymentsPage';
import ProfileDev from '../ProfileDev';
import ProfilePage from '../ProfilePage';
import ProjectScreen from '../ProjectScreen';
import SignIn from '../SignIn';
import SignUpHead from '../SignUpHead';
import SignUpHeadInfo from '../SignUpHead/SignUpHeadInfo';
import SignUpPoInfo from '../SignUpHead/SignUpPoInfo';
import SingleProject from '../SingleProject/SingleProject';


export enum PathNames {
  Home = '/',
  Main = '/main',
  SignIn = '/sign-in',
  SignUp = '/sign-up',
  SignUpHead = '/sign-up-head',
  SignUpHeadInfo = '/sign-up-head/info',
  SignUpPoInfo = '/sign-up-po/info',
  PasswordRequestPage = '/password/request',
  PasswordReset = '/password/reset/:uid/:token',
  CheckNewPassword = '/check-password',
  CheckYourEmail = '/check-email',
  ProjectScreen = '/project/',
  SingleProject = '/project/:id',
  ActivateUser = '/activate/:uid/:token',
  Profile = '/profile',
  ProfileDevTeam = '/profile/dev',
  Payments = '/payments',
  Notifications = '/notifications'
}

const Router = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(authSelectors.getLoggedIn);
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUserName());
    }
  }, [isLoggedIn]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path={PathNames.Home} element={<PagesWrapper />}>
          <Route path={PathNames.Main} element={<Home />} />
          <Route path={PathNames.Profile} element={<ProfilePage />} />
          <Route path={PathNames.ProjectScreen} element={<ProjectScreen />} />
          <Route path={PathNames.SingleProject} element={<SingleProject />} />
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
        <Route path={PathNames.CheckNewPassword} element={<CheckNewPassword />} />
        <Route path={PathNames.PasswordRequestPage} element={<PasswordRequestPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;