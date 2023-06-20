import { create } from 'apisauce';

import {
  ActivateUserData,
  RegisterHeadData,
  RegisterPoData,
  RegisterUserData,
  ResetPasswordData,
  SignInUserData
} from '../Types/auth';
import { CompanyListData, PatchPersonalData } from '../Types/profile';
import { ResoursesType } from '../Types/Resourses';
import {
  addResponsibleType,
  MilestoneModalType,
  ProjectData,
  removeResponsibleType,
  SubTaskModalType,
  TaskModalType
} from '../Types/tasks';
import { PostMilestoneCommentType } from '../Types/comments';

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

const postMilestone = (token: string, milestone: MilestoneModalType) => {
  return API.post('/project-planning/milestone/', milestone, { headers: { Authorization: `JWT ${token}` } });
};

const getMilestone = (token: string, page?: number) => {
  return API.get('/project-planning/milestone/', { page }, { headers: { Authorization: `JWT ${token}` } });
};

const postProjectTitle = (title: string) => {
  return API.post('/project-planning', title, {
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
  return API.get('/project-planning/project/', { page }, { headers: { Authorization: `JWT ${token}` } });
};
const postProject = (token: string, data: ProjectData) => {
  return API.post('/project-planning/project/', data, { headers: { Authorization: `JWT ${token}` } });
};

const getSingleProject = (token: string, id: string) => {
  return API.get(`/project-planning/project/${id}/`, {}, { headers: { Authorization: `JWT ${token}` } });
};

const getAllMilestones = (token: string, idProject: number) => {
  return API.get(
    '/project-planning/milestone/',
    { project: idProject },
    { headers: { Authorization: `JWT ${token}` } }
  );
};

const getAllTasks = (token: string, idMilestone: number) => {
  return API.get('/project-planning/task/', { milestone: idMilestone }, { headers: { Authorization: `JWT ${token}` } });
};
const postTask = (token: string, task: TaskModalType) => {
  return API.post('/project-planning/task/', task, { headers: { Authorization: `JWT ${token}` } });
};
const getGeneratePassword = (token: string) => {
  return API.get('/code/', {}, { headers: { Authorization: `JWT ${token}` } });
};

const postResourses = (token: string, data: ResoursesType, id: string) => {
  return API.post(`/project-planning/resource/?project=${id}`, data, {
    headers: { Authorization: `JWT ${token}` }
  });
};

const getResourses = (token: string, id: string) => {
  return API.get(
    `/project-planning/resource/?project=${id}`,
    {},
    {
      headers: { Authorization: `JWT ${token}` }
    }
  );
};

const editResourses = (token: string, data: ResoursesType, id: string, idResourses: string) => {
  return API.patch(`/project-planning/resource/${idResourses}/?project=${id}`, data, {
    headers: { Authorization: `JWT ${token}` }
  });
};

const deleteResourses = (token: string, id: string, idResourses: string) => {
  return API.delete(
    `/project-planning/resource/${idResourses}/?project=${id}`,
    {},
    {
      headers: { Authorization: `JWT ${token}` }
    }
  );
};
const postSubTask = (token: string, subTask: SubTaskModalType) => {
  return API.post('/project-planning/sub-task/', subTask, { headers: { Authorization: `JWT ${token}` } });
};
const deleteMilestone = (token: string, id: number) => {
  return API.delete(`/project-planning/milestone/${id}/`, {}, { headers: { Authorization: `JWT ${token}` } });
};
const getSingleMilestone = (token: string, id: number) => {
  return API.get(`/project-planning/milestone/${id}/`, {}, { headers: { Authorization: `JWT ${token}` } });
};
const patchSingleMilestone = (token: string, milestone: MilestoneModalType, id: number) => {
  return API.patch(`/project-planning/milestone/${id}/`, milestone, { headers: { Authorization: `JWT ${token}` } });
};
const getSingleTask = (token: string, id: number) => {
  return API.get(`/project-planning/task/${id}/`, {}, { headers: { Authorization: `JWT ${token}` } });
};
const patchSingleTask = (token: string, task: TaskModalType, id: number) => {
  return API.patch(`/project-planning/task/${id}/`, task, { headers: { Authorization: `JWT ${token}` } });
};
const deleteTask = (token: string, id: number) => {
  return API.delete(`/project-planning/task/${id}/`, {}, { headers: { Authorization: `JWT ${token}` } });
};
const getSingleSubTask = (token: string, id: number) => {
  return API.get(`/project-planning/sub-task/${id}/`, {}, { headers: { Authorization: `JWT ${token}` } });
};
const patchSingleSubTask = (token: string, subtask: SubTaskModalType, id: number) => {
  return API.patch(`/project-planning/sub-task/${id}/`, subtask, { headers: { Authorization: `JWT ${token}` } });
};
const deleteSubTask = (token: string, id: number) => {
  return API.delete(`/project-planning/sub-task/${id}/`, {}, { headers: { Authorization: `JWT ${token}` } });
};
const patchProject = (token: string, project_name: string, id: number) => {
  return API.patch(`/project-planning/project/${id}/`, project_name, { headers: { Authorization: `JWT ${token}` } });
};

const getProjectComments = (token: string, id: number) => {
  return API.get(`/project-planning/comments/${id}/`, {}, { headers: { Authorization: `JWT ${token}` } });
};

const patchComment = (token: string, comment: PostMilestoneCommentType, id: number, idMilestone: number) => {
  return API.patch(`/project-planning/comments/${id}/?milestone_id=${idMilestone}`, comment, {
    headers: { Authorization: `JWT ${token}` }
  });
};

const deleteComment = (token: string, id: number, idMilestone: number) => {
  return API.delete(
    `/project-planning/comments/${id}/?milestone_id=${idMilestone}`,
    {},
    { headers: { Authorization: `JWT ${token}` } }
  );
};

const getAllMilestoneComments = (token: string, id: number) => {
  return API.get(`/project-planning/comments/?milestone_id=${id}`, {}, { headers: { Authorization: `JWT ${token}` } });
};

const getSingleMilestoneComment = (token: string, milestoneId: number, id: number) => {
  return API.get(
    `/project-planning/comments/${id}/?milestone_id=${milestoneId}`,
    {},
    { headers: { Authorization: `JWT ${token}` } }
  );
};

const postMilestoneComment = (token: string, comment: PostMilestoneCommentType) => {
  return API.post('/project-planning/comments/', comment, { headers: { Authorization: `JWT ${token}` } });
};
const getAllTaskComments = (token: string, id: number) => {
  return API.get(`/project-planning/comments/?task_id=${id}`, {}, { headers: { Authorization: `JWT ${token}` } });
};
const deleteTaskComment = (token: string, id: number, idTask: number) => {
  return API.delete(
    `/project-planning/comments/${id}/?task_id=${idTask}`,
    {},
    { headers: { Authorization: `JWT ${token}` } }
  );
};
const patchTaskComment = (token: string, comment: PostMilestoneCommentType, id: number, idTask: number) => {
  return API.patch(`/project-planning/comments/${id}/?task_id=${idTask}`, comment, {
    headers: { Authorization: `JWT ${token}` }
  });
};
const getAllSubTaskComments = (token: string, id: number) => {
  return API.get(`/project-planning/comments/?subtask_id=${id}`, {}, { headers: { Authorization: `JWT ${token}` } });
};
const deleteSubTaskComment = (token: string, id: number, idSubTask: number) => {
  return API.delete(
    `/project-planning/comments/${id}/?subtask_id=${idSubTask}`,
    {},
    { headers: { Authorization: `JWT ${token}` } }
  );
};
const patchSubTaskComment = (token: string, comment: PostMilestoneCommentType, id: number, idSubTask: number) => {
  return API.patch(`/project-planning/comments/${id}/?milestone_id=${idSubTask}`, comment, {
    headers: { Authorization: `JWT ${token}` }
  });
};

const getAllDevTeamEmployees = (token: string) => {
  return API.get(
    '/user-profile/employees/',
    {},
    {
      headers: { Authorization: `JWT ${token}` }
    }
  );
};

const getAllResponsible = (token: string, id: number) => {
  return API.get(`/project-planning/responsible/?project=${id}`, {}, { headers: { Authorization: `JWT ${token}` } });
};
const getAllDependencies = (token: string, id: number, idMilestone: number) => {
  return API.get(
    `/project-planning/dependencies/?project=${id}&milestone=${idMilestone}`,
    {},
    { headers: { Authorization: `JWT ${token}` } }
  );
};

const addResponsible = (token: string, id: number, data: addResponsibleType) => {
  return API.patch(`/project-planning/milestone/${id}/`, data, {
    headers: { Authorization: `JWT ${token}` }
  });
};
const removeResponsible = (token: string, id: number, data: removeResponsibleType) => {
  return API.patch(`/project-planning/milestone/${id}/`, data, {
    headers: { Authorization: `JWT ${token}` }
  });
};

const patchUserInfo = (token: string, data: PatchPersonalData) => {
  return API.patch('/auth/users/me/', data, {
    headers: { Authorization: `JWT ${token}` }
  });
};
const getHomeScreenProjects = (token: string) => {
  return API.get('/project-planning/home-screen/', {}, { headers: { Authorization: `JWT ${token}` } });
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
  getGeneratePassword,
  postResourses,
  getResourses,
  editResourses,
  deleteResourses,
  postTask,
  postSubTask,
  deleteMilestone,
  getSingleMilestone,
  patchSingleMilestone,
  getSingleTask,
  patchSingleTask,
  deleteTask,
  getSingleSubTask,
  patchSingleSubTask,
  deleteSubTask,
  patchProject,
  getProjectComments,
  patchComment,
  deleteComment,
  getAllMilestoneComments,
  postMilestoneComment,
  getAllTaskComments,
  getAllDevTeamEmployees,
  getSingleMilestoneComment,
  deleteTaskComment,
  patchTaskComment,
  getAllSubTaskComments,
  deleteSubTaskComment,
  patchSubTaskComment,
  getAllResponsible,
  getAllDependencies,
  addResponsible,
  removeResponsible,
  patchUserInfo,
  getHomeScreenProjects
};
