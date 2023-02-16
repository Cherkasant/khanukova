export type TaskType = {
  item: string;
  dependence: string;
  status: string;
  label: string;
  duration: string;
  responsible: string;
  launchDate: string;
  deadline: string;
  priority: string;
  progress: string;
  color: string;
};

export type CardTaskType = Array<TaskType>;

export type TaskFormPayload = {
  data: TaskType;
  callback: () => void;
};
