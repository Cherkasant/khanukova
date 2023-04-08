export type TaskType = {
  milestone_name: string;
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
  project: number;
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

export type TaskFormPayload = {
  data: TaskType;
  callback: () => void;
};

export type MilestoneType = {
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
  milestone: number;
  creator: number;
  task_data: [];
};

export type MilestoneCardType = Array<MilestoneType>;
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
