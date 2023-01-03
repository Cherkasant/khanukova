//todo уточнить со стороны бэкенда
export type CardType = {
  id: number;
  projectName: string;
  tasks: string;
  deadline: string;
  budget: string;
  paid: string;
};

export enum Roles {
  ProductOwner = "Product Owner",
  CEO = "CEO",
  CTO = "CTO",
  ProjectManager = "Project Manager",
  Designer = "Designer",
  QA = "QA",
  Programmer = "Programmer",
  default = "default",
}

export type CardsListType = Array<CardType>;

export enum PasswordTypes {
  Password = "password",
  Text = "text",
}

export enum Tabs {
  Planning = "Planning",
  Gantt = "Gantt",
  Resourses = "Resourses",
  Events = "Events ",
  ClientsRequests = "Clients Requests",
  Documents = "Documents",
  ExternalSources = "External Sources",
  default = "default",
}
