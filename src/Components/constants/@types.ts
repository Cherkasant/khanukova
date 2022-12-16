//todo уточнить со стороны бэкенда
export type CardType = {
    id: number;
    title: string;
    tasksProgress: string;
    date: string;
    budget: string;
    payment: string;
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
