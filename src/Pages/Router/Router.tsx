import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import SignIn from '../SignIn';
import PagesWrapper from '../../Components/PagesWrapper';
import PasswordRequestPage from '../PasswordRequestPage';
import Home from '../Home';
import ProjectScreen from '../ProjectScreen';
import PasswordReset from '../PasswordResetPage';
import ActivationPage from '../ActivationPage';
import CheckNewPassword from '../CheckNewPassword';
import ProfilePage from '../ProfilePage';
import SignUpHead from '../SignUpHead';
import SignUpHeadInfo from '../SignUpHead/SignUpHeadInfo';
import ProfileDev from '../ProfileDev';
import PaymentsPage from '../PaymentsPage';
import SignUpPoInfo from '../SignUpHead/SignUpPoInfo';
import CheckEmailPage from '../CheckEmailPage';
import NotificationsPage from '../NotificationsPage';

import { getUserName } from '../../Redux/Reducers/authReducer';
import authSelectors from '../../Redux/Selectors/authSelectors';
import SingleProject from '../SingleProject/SingleProject';
import Chats from '../Chats';
import { getPersonalInfoReducer } from '../../Redux/Reducers/profileReducer';
import {
  getAllNotifications,
  setNotificationFromSocket,
  startListening
} from '../../Redux/Reducers/notificationReducer';
import { accessToken, socket } from '../../Redux/Sagas/notificationSaga';

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
  Notifications = '/notifications',
  Chats = '/chats'
}

const Router = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(authSelectors.getLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUserName());
      dispatch(getPersonalInfoReducer());
      dispatch(getAllNotifications());
      dispatch(startListening());
      socket.addEventListener('error', (e) => {
        console.log(e);
      });
      socket.addEventListener('open', () => {
        socket.send(JSON.stringify({ JWT: accessToken }));
      });
      socket.addEventListener('message', (e) => {
        dispatch(setNotificationFromSocket(JSON.parse(e.data)));
      });
    } else {
      socket.addEventListener('close', () => {
        console.log('WEBSOCKET CLOSED');
      });
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
          <Route path={PathNames.Chats} element={<Chats />} />
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
