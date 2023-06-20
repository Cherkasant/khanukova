//todo уточнить со стороны бэкенда
export type CardType = {
  id: number;
  project_name: string;
  progress: string;
  deadline: string;
  payments: string;
};

export type CardNotificationsType = {
  isRequest: boolean;
  id: number;
  avatar?: string;
  userName?: string;
  status?: string;
  location?: string;
  date?: string;
  position?: string;
  email?: string;
  projectName?: string;
};

export type CardsListNotificationsType = Array<CardNotificationsType>;

export type CardExternalSourcesType = {
  id: number;
  icon: any;
  name: string;
};

export type CardsListExternalSourcesType = Array<CardExternalSourcesType>;

export enum Role {
  PO = 'PO',
  Head = 'HEAD',
  DevTeam = 'DEVTEAM'
}

export enum Roles {
  ProductOwner = 'Product Owner',
  CEO = 'CEO',
  CTO = 'CTO',
  ProjectManager = 'Project Manager',
  Designer = 'Designer',
  QA = 'QA',
  Programmer = 'Programmer',
  default = 'default'
}

export type CardsListType = Array<CardType>;

export enum PasswordTypes {
  Password = 'password',
  Text = 'text'
}

export enum TabsProfile {
  PersonalInfo = 'personalInfo',
  CompanyProfile = 'companyProfile',
  DevTeam = 'devTeam'
}

export enum Tabs {
  Planning = 'Planning',
  Gantt = 'Gantt',
  Resourses = 'Resourses',
  Events = 'Events ',
  ClientsRequests = 'Clients Requests',
  Documents = 'Documents',
  ExternalSources = 'External Sources',
  default = 'default'
}

export enum TabsNotifications {
  All = 'all',
  Actions = 'actions',
  Deadlines = 'deadlines',
  Events = 'events',
  Payments = 'payments'
}

export enum CompanyList {
  CompanyName = '1. Company name ',
  LogoCompany = '2. Logo company ',
  WebsiteDomain = '3. Website domain name  ',
  Tagline = '4. Tagline (service description in one sentence or mission/vision) ',
  ClientIndustry = '5. Industries that your clients are coming from',
  SoftwareStack = '6. Preferable Software Stack ',
  Industries = '7. Industries',
  CompanyDescription = '8. Company Short Description ',
  FullCompanyDescription = '9. Full company Description',
  AverageHourlyRate = '10. Average hourly rate',
  MinimumBudget = '11. Minimum project budget',
  TeamSize = '12. Team Size',
  Location = '13. Location',
  FoundationDate = '14. Foundation date',
  ClientsFocus = "15. Client's Focus (Ideal Client Profile based on your portfolio) ",
  ContactDetails = '16. Marketing manager contact details',
  ProjectExpertContactDetails = '17. Tech or Project Expert contact details (who will be in touch with a client)',
  LinkToClient = "18. Links to client's success cases",
  ClientPortrait = '19. Describe ideal client portrait'
}
