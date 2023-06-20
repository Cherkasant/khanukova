export type MilestoneModalType = {
  milestone_name: string | undefined;
  description: string;
  attachment: string | null;
  responsible_data: AllResponsibleType | [];
  priority: string;
  start_date: string;
  deadline: string;
  duration: string | undefined;
  labels: string;
  color_labels: string;
  dependence: Array<string>;
  progress: number;
  status: string;
  payment_status: string;
  project: number | undefined;
};

export type TaskModalType = {
  task_name: string;
  description: string;
  attachment: string | null;
  responsible: Array<string>;
  priority: string;
  start_date: string;
  deadline: string;
  duration: number;
  labels: string;
  color_labels: string;
  dependence: Array<string>;
  progress: number;
  status: string;
  payment_status: string;
  project: number | undefined;
  milestone: number | undefined;
};

export type SubTaskModalType = {
  sub_task_name: string;
  description: string;
  attachment: string | null;
  responsible: Array<string>;
  priority: string;
  start_date: string;
  deadline: string;
  duration: number;
  labels: string;
  color_labels: string;
  dependence: Array<string>;
  progress: number;
  status: string;
  payment_status: string;
  project: number | undefined;
  task: number;
};

export type TaskTypeWithID = {
  id: number;
  milestone_name: string;
  description: string;
  attachment: string | null;
  responsible: Array<string> | [];
  priority: string;
  start_date: string;
  deadline: string;
  duration: number;
  labels: string;
  color_labels: string;
  dependence: Array<string> | [];
  progress: number;
  status: string;
  payment_status: string;
  project: string;
};
// "milestone_name": "string",
//     "description": "string",
//     "attachment": "string",
//     "responsible": [
//   "string"
// ],
//     "priority": "string",
//     "start_date": "string",
//     "deadline": "string",
//     "labels": "string",
//     "color_labels": "string",
//     "dependence": [
//   "string"
// ],
//     "status": "string",
//     "payment_status": "string",
//     "project": "string"

export type CardTaskType = Array<TaskTypeWithID>;

export type MilestoneType = {
  id: number;
  milestone_name: string;
  description: string;
  attachment: string | null;
  responsible_data: AllResponsibleType | [];
  priority: string;
  start_date: string;
  deadline: string;
  duration: number;
  labels: string;
  color_labels: string;
  dependence: Array<string> | [];
  progress: number;
  status: string;
  payment_status: string;
  project: string;
  creator: number;
  task_data?: [];
};

export type MilestoneTableType = {
  milestone_name: string;
  description: string;
  attachment: string | null;
  responsible_data: AllResponsibleType | [];
  priority: string;
  start_date: string;
  deadline: string;
  duration: number;
  labels: string;
  color_labels: string;
  dependence: Array<string> | [];
  progress: number;
  status: string;
  payment_status: string;
  subRows: Array<MilestoneTableType> | [];
};

export type TaskTypeTable = {
  id: number;
  task_name: string;
  description: string;
  attachment: string | null;
  responsible: Array<string> | [];
  priority: string;
  start_date: string;
  deadline: string;
  duration: number;
  labels: string;
  color_labels: string;
  dependence: Array<string> | [];
  progress: number;
  status: string;
  payment_status: string;
  project: string;
  milestone: number;
  creator: number;
  subtask_data: [];
};
export type SubTaskTypeTable = {
  id: number;
  sub_task_name: string;
  description: string;
  attachment: string | null;
  responsible: Array<string> | [];
  priority: string;
  start_date: string;
  deadline: string;
  duration: number;
  labels: string;
  color_labels: string;
  dependence: Array<string> | [];
  progress: number;
  status: string;
  payment_status: string;
  project: string;
  task: number;
  creator: number;
};

export type MilestoneCardType = Array<MilestoneTableType>;
export type ProjectType = {
  id: number;
  project_name: string;
  company_head: null | string;
  company_po: number;
  user: Array<number> | [];
  creator: number;
  milestone_data: Array<MilestoneType> | [];
};
export type ArrayOfProjectType = Array<ProjectType>;

export type ProjectData = {
  project_name: string;
};
export type BasePayload<T> = {
  data: T;
  callback: () => void;
};
export type ProjectDataPayload = BasePayload<ProjectData>;
export type MilestoneDataPayload = BasePayload<MilestoneModalType>;
export type TaskDataPayload = BasePayload<TaskModalType>;
export type SubTaskDataPayload = BasePayload<SubTaskModalType>;

export type PatchMilestoneType = {
  id: number | undefined;
  data: MilestoneModalType;
  callback: () => void;
};
export type DeleteMilestoneType = {
  id: number;
  callback: () => void;
};
export type PatchTaskType = {
  id: number | undefined;
  data: TaskModalType;
  callback: () => void;
};
export type PatchSubTaskType = {
  id: number | undefined;
  data: SubTaskModalType;
  callback: () => void;
};
export type PatchProjectType = {
  id: number | undefined;
  data: PatchProjectData;
  callback: () => void;
};
export type PatchProjectData = {
  project_name: string;
  user_add?: Array<string>;
  user_remove?: Array<string>;
};

export type ResponsibleType = {
  id: number;
  nickname: string;
  account_photo: string;
};

export type AllResponsibleType = Array<ResponsibleType>;
export type DependeciesMilestone = {
  id: number;
  milestoneId: number;
};
export type MilestoneDependence = {
  id: number;
  milestone_name: string;
};
export type ArrayMilestoneDependencies = Array<MilestoneDependence>;

export type addResponsibleType = {
  id: number | undefined;
  data: responsibleType;
  callback: () => void;
};
export type responsibleType = {
  responsible_add: Array<number>;
};
export type removeResponsibleType = {
  id: number | undefined;
  responsible_remove: Array<number>;
  callback: () => void;
};
