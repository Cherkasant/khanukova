export type CompanyListData =  {
   company_name: string,
   logo: string,
   website: string,
   tagline: string,
   client_industry: string,
   software_stack: string,
   industry_choice: string,
   short_description: string,
   full_description: string,
   average_hourly_rate: string,
   currency_rate: string,
   minimum_project_budget: string,
   currency_budget: string,
   team_size: string,
   location: string,
   foundation_date: string,
   clients_focus: string,
   contact_marketing: string,
   contact_expert: string,
   links_case: string,
   client_describe: string,
   employees: undefined,
}

export type EditCompanyListPayload = {
   callback: () => void;
   id: string;
}

