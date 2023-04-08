export type ECaseListData = {
  id: 1;
  company_name: string;
  company_size: string;
  industry_choice: string;
  development_team: string;
  use_outsourcing: string;
  description_project: string;
  business_requirements: string;
  technological_stack: string;
  link_competitor: string;
  start_project: string;
  used_outsourcing: string;
  owner: number;
  is_active: boolean;
};

export const EcaseData = [
  { name: '1. Company name', answer: 'Capix' },
  { name: '2. Company size ', answer: 'Mid-size company (up 200  people)' },
  { name: '3. Industries ', answer: 'Martech (Marketing Tech), Logistics' },
  { name: '4. Already have a teach experience?', answer: 'no' },
  { name: '5. Willing to use outsiursing/ outstaffing', answer: 'no' },
  { name: '6. Project description ready?', answer: 'no' },
  { name: '7. Business requirements for the product', answer: 'no' },
  { name: '8. Technological stack:', answer: 'no' },
  { name: "9. Link to your competitor's project:", answer: 'no' },
  { name: '10. Start project ', answer: 'In a month' },
  { name: '11. Used outsiursing/outstaffing before', answer: 'no' }
];
