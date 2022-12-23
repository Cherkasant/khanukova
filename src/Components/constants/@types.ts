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
