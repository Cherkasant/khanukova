export type CommentType = {
  id: number;
  comment: string;
  creator: number;
  milestone: number | null;
  task: number | null;
  subtask: number | null;
  is_active: boolean;
  date_created: string | null;
  date_deleted: string | null;
};

export type ArrayOfComments = Array<CommentType>;

export type PostMilestoneCommentType = {
  comment: string;
  milestone: number;
  task?: number;
  subtask?: number;
};

export type DeleteMilestoneCommentType = {
  id: number;
  idMilestone: number;
  callback: () => void;
};
export type PatchMilestoneCommentType = {
  id: number;
  idMilestone: number;
  data?: PostMilestoneCommentType;
  callback: () => void;
};
export type SingleMilestoneComment = {
  id: number;
  idMilestone: number;
};
export type DeleteTaskCommentType = {
  id: number;
  idTask: number;
  callback: () => void;
};

export type PatchTaskCommentType = {
  id: number;
  idTask: number;
  data?: PostMilestoneCommentType;
  callback: () => void;
};
export type DeleteSubTaskCommentType = {
  id: number;
  idSubTask: number;
  callback: () => void;
};
export type PatchSubTaskCommentType = {
  id: number;
  idSubTask: number;
  data?: PostMilestoneCommentType;
  callback: () => void;
};
