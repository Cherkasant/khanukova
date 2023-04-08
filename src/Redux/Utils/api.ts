import { create } from 'apisauce';

import {
  ActivateUserData,
  RegisterHeadData,
  RegisterPoData,
  RegisterUserData,
  ResetPasswordData,
  SignInUserData
} from '../Types/auth';
import { CompanyListData } from '../Types/profile';
import { ProjectData, TaskType } from '../Types/tasks';

const API = create({ baseURL: ' https://apipuzzle-be.herokuapp.com' });

const registerUser = (data: RegisterUserData) => {
  return API.post('/auth/users/', data);
};

const registerHeadInfo = (data: RegisterHeadData) => {
  return API.post('/user-profile/head-company/', data);
};
const registerPoInfo = (data: RegisterPoData) => {
  return API.post('/user-profile/po-company/', data);
};

const activateUser = (data: ActivateUserData) => {
  return API.post('/auth/users/activation/', data);
};

const signInUser = (data: SignInUserData) => {
  return API.post('/auth/jwt/create/', data);
};

const sendResetEmail = (email: string) => {
  return API.post('auth/users/reset_password/', { email });
};

const resetPasswordConfirm = (data: ResetPasswordData) => {
  return API.post('/auth/users/reset_password_confirm/', data);
};

const postMilestone = (token: string, milestone: TaskType) => {
  return API.post('/project/milestone/', milestone, { headers: { Authorization: `JWT ${token}` } });
};

const getMilestone = (token: string, page?: number) => {
  return API.get('/project/milestone/', { page }, { headers: { Authorization: `JWT ${token}` } });
};

const postProjectTitle = (title: string) => {
  return API.post('/project', title, {
    headers: {
      Authorization: 'Token 1e4b18fae204857eca1a4f110fc87b1c772b6c35'
    }
  });
};

const verifyToken = (token: string) => {
  return API.post('/auth/jwt/verify/', { token });
};
const getNewAccessToken = (refresh: string) => {
  return API.post('/auth/jwt/refresh/', { refresh });
};

const getHeadCompanyList = (token: string) => {
  return API.get(
    '/user-profile/head-company/',
    {},
    {
      headers: { Authorization: `JWT ${token}` }
    }
  );
};

const editHeadCompanyList = (token: string, id: string, data: CompanyListData) => {
  return API.patch(`/user-profile/head-company/${id}/`, data, {
    headers: { Authorization: `JWT ${token}` }
  });
};

const getECaseList = (token: string) => {
  return API.get(
    '/user-profile/po-company/',
    {},
    {
      headers: { Authorization: `JWT ${token}` }
    }
  );
};
const getUserName = (token: string) => {
  return API.get(
    '/auth/users/me/',
    {},
    {
      headers: { Authorization: `JWT ${token}` }
    }
  );
};

const getAllProjects = (token: string, page?: number) => {
  return API.get('/project/', { page }, { headers: { Authorization: `JWT ${token}` } });
};
const postProject = (token: string, data: ProjectData) => {
  return API.post('/project/', data, { headers: { Authorization: `JWT ${token}` } });
};

const getSingleProject = (token: string, id: string) => {
  return API.get(`/project/${id}/`, {}, { headers: { Authorization: `JWT ${token}` } });
};

const getAllMilestones = (token: string, idProject: number) => {
  return API.get('/project/milestone/', { project: idProject }, { headers: { Authorization: `JWT ${token}` } });
};
const getAllTasks = (token: string, idMilestone: number) => {
  return API.get('/project/task/', { milestone: idMilestone }, { headers: { Authorization: `JWT ${token}` } });
};
const getGeneratePassword = (token: string) => {
  return API.get('/code/', {}, { headers: { Authorization: `JWT ${token}` } });
};

export default {
  registerUser,
  sendResetEmail,
  activateUser,
  signInUser,
  resetPasswordConfirm,
  postMilestone,
  getMilestone,
  getNewAccessToken,
  verifyToken,
  postProjectTitle,
  registerHeadInfo,
  registerPoInfo,
  getHeadCompanyList,
  editHeadCompanyList,
  getECaseList,
  getUserName,
  getAllProjects,
  postProject,
  getSingleProject,
  getAllMilestones,
  getAllTasks,
  getGeneratePassword
};
