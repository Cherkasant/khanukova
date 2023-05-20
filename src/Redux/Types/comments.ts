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
};
