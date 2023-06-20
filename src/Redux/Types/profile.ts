export type CompanyListData = {
  id: number;
  company_name: string | undefined;
  logo?: string | undefined;
  website: string | undefined;
  tagline: string | undefined;
  client_industry: string | undefined;
  software_stack: string | undefined;
  industry_choice: string | undefined;
  short_description: string | undefined;
  full_description: string | undefined;
  average_hourly_rate: string | undefined;
  currency_rate: string | undefined;
  minimum_project_budget: string | undefined;
  currency_budget: string | undefined;
  team_size: string | undefined;
  location: string | undefined;
  foundation_date: string | undefined;
  clients_focus: string | undefined;
  contact_marketing: string | undefined;
  contact_expert: string | undefined;
  links_case: string | undefined;
  client_describe: string | undefined;
  employees: Array<number>;
};

export type PersonalInfoData = {
  id: number;
  email: string;
  full_name: string;
  nickname: string;
  phone: string;
  position: string;
  role: string;
  is_active: boolean;
  account_photo: string;
};

export type EditCompanyListPayload = {
  data: CompanyListData;
  callback: () => void;
  id: number;
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
export type PatchPersonalData = {
  full_name: string | undefined;
  phone: string | undefined;
  position: string | undefined;
  account_photo?: string | undefined;
  role?: string | undefined;
};
export type EditPersonalType = {
  data: PatchPersonalData;
  callback: () => void;
};
