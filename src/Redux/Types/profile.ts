export type CompanyListData = {
  company_name: string;
  logo: string;
  website: string;
  tagline: string;
  client_industry: string;
  software_stack: string;
  industry_choice: string;
  short_description: string;
  full_description: string;
  average_hourly_rate: string;
  currency_rate: string;
  minimum_project_budget: string;
  currency_budget: string;
  team_size: string;
  location: string;
  foundation_date: string;
  clients_focus: string;
  contact_marketing: string;
  contact_expert: string;
  links_case: string;
  client_describe: string;
  employees: undefined;
};

export type PersonalInfoData = {
  id: number;
  email: string;
  full_name: string;
  nickname: string;
  phone: string;
  role: string;
  is_active: boolean;
  account_photo: string;
};

export type EditCompanyListPayload = {
  callback: () => void;
  id: string;
};
export type Empoyees = {
  full_name: string;
  id: number;
  account_photo: string;
  nickname: string;
  position: string;
  email: string;
  project: Array<ProjectType>;
};
export type ProjectType = {
  project_name: string;
};
export type ArrayOfEmployees = Array<Empoyees>;
