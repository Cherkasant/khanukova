export type ResoursesType = {
  position: string;
  time: number;
  rate: number;
};

export type ResoursesTypePayload = {
  data?: ResoursesType;
  id: string;
  idResourses?: string;
};

export type ResoursesDataType = {
  date_created: string;
  date_deleted: string;
  id: number;
  is_active: boolean;
  position: string;
  project: number;
  rate: string;
  time: number;
};
