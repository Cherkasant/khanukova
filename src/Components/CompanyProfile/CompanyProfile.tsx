import { FC, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { CompanyList } from '../constants/@types';

import { PencilIcon } from '../../Assets/Profile/PencilIcon';

import profileSelectors from '../../Redux/Selectors/profileSelectors';

import { editHeadCompanyListReducer, getHeadCompanyListReducer } from '../../Redux/Reducers/profileReducer';

import PuzzleButton, { PuzzleButtonTypes } from '../PuzzleButton';

import styles from './CompanyProfile.module.css';

type CompanyProfileProps = {
  activeTab?: CompanyList;
  disabled?: boolean;
  CompanyList?: Array<{
    name: string;
    key: CompanyList;
    answers: string | undefined;
  }>;
};

const CompanyProfile: FC<CompanyProfileProps> = () => {
  const dispatch = useDispatch();
  const companyList = useSelector(profileSelectors.getCompanyList);
  const [edit, setEdit] = useState(false);
  const onEditClick = () => {
    setEdit(!edit);
  };
  const initialValues = {
    id: companyList?.id,
    company_name: companyList?.company_name,
    logo: companyList?.logo,
    website: companyList?.website,
    tagline: companyList?.tagline,
    client_industry: companyList?.client_industry,
    software_stack: companyList?.software_stack,
    industry_choice: companyList?.industry_choice,
    short_description: companyList?.short_description,
    full_description: companyList?.full_description,
    average_hourly_rate: companyList?.average_hourly_rate,
    currency_rate: companyList?.currency_rate,
    minimum_project_budget: companyList?.minimum_project_budget,
    currency_budget: companyList?.currency_budget,
    team_size: companyList?.team_size,
    location: companyList?.location,
    foundation_date: companyList?.foundation_date,
    clients_focus: companyList?.clients_focus,
    contact_marketing: companyList?.contact_marketing,
    contact_expert: companyList?.contact_expert,
    links_case: companyList?.links_case,
    client_describe: companyList?.client_describe,
    employees: companyList?.employees
  };
  const [values, setValues] = useState(initialValues);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const onSaveCompanyProfileClick = () => {
    if (companyList && values) {
      dispatch(
        editHeadCompanyListReducer({
          id: companyList?.id,
          data: {
            id: companyList?.id,
            company_name: values.company_name,
            website: values.website,
            tagline: values.tagline,
            client_industry: values.client_industry,
            software_stack: values.software_stack,
            industry_choice: values.industry_choice,
            short_description: values.short_description,
            full_description: values.full_description,
            average_hourly_rate: values.average_hourly_rate,
            currency_rate: values.currency_rate,
            minimum_project_budget: values.minimum_project_budget,
            currency_budget: values.currency_budget,
            team_size: values.team_size,
            location: values.location,
            foundation_date: values.foundation_date,
            clients_focus: values.clients_focus,
            contact_marketing: values.contact_marketing,
            contact_expert: values.contact_expert,
            links_case: values.links_case,
            client_describe: values.client_describe,
            employees: companyList?.employees
          },
          callback: () => {
            dispatch(getHeadCompanyListReducer());
          }
        })
      );
    }
  };
  return (
    <div className={styles.mainBlock}>
      <div className={styles.listContainer}>
        <div className={styles.list}>
          {'1. Company name '}
          <input
            className={styles.input}
            value={values.company_name}
            name={'company_name'}
            onChange={handleInputChange}
            disabled={edit}
          />
          <div className={styles.icon} onClick={onEditClick}>
            <PencilIcon />
          </div>
        </div>
        <div className={styles.list}>
          {'2. Logo company '}
          <input
            className={styles.input}
            value={values.logo}
            name={'logo'}
            onChange={handleInputChange}
            disabled={edit}
          />
          <div className={styles.icon} onClick={onEditClick}>
            <PencilIcon />
          </div>
        </div>
        <div className={styles.list}>
          {'3. Website domain name  '}
          <input
            className={styles.input}
            value={values.website}
            name={'website'}
            onChange={handleInputChange}
            disabled={edit}
          />
          <div className={styles.icon} onClick={onEditClick}>
            <PencilIcon />
          </div>
        </div>
        <div className={styles.list}>
          {'4. Tagline (service description in one sentence or mission/vision) '}
          <input
            className={styles.input}
            value={values.tagline}
            name={'tagline'}
            onChange={handleInputChange}
            disabled={edit}
          />
          <div className={styles.icon} onClick={onEditClick}>
            <PencilIcon />
          </div>
        </div>
        <div className={styles.list}>
          {'5. Industries that your clients are coming from'}
          <input
            className={styles.input}
            value={values.client_industry}
            name={'client_industry'}
            onChange={handleInputChange}
            disabled={edit}
          />
          <div className={styles.icon} onClick={onEditClick}>
            <PencilIcon />
          </div>
        </div>
        <div className={styles.list}>
          {'6. Preferable Software Stack '}
          <input
            className={styles.input}
            value={values.software_stack}
            name={'software_stack'}
            onChange={handleInputChange}
            disabled={edit}
          />
          <div className={styles.icon} onClick={onEditClick}>
            <PencilIcon />
          </div>
        </div>
        <div className={styles.list}>
          {'7. Industries'}
          <input
            className={styles.input}
            value={values.industry_choice}
            name={'industry_choice'}
            onChange={handleInputChange}
            disabled={edit}
          />
          <div className={styles.icon} onClick={onEditClick}>
            <PencilIcon />
          </div>
        </div>
        <div className={styles.list}>
          {'8. Company Short Description '}
          <input
            className={styles.input}
            value={values.short_description}
            name={'short_description'}
            onChange={handleInputChange}
            disabled={edit}
          />
          <div className={styles.icon} onClick={onEditClick}>
            <PencilIcon />
          </div>
        </div>

        <div className={styles.list}>
          {'9. Full company Description'}
          <input
            className={styles.input}
            value={values.full_description}
            name={'full_description'}
            onChange={handleInputChange}
            disabled={edit}
          />
          <div className={styles.icon} onClick={onEditClick}>
            <PencilIcon />
          </div>
        </div>

        <div className={styles.list}>
          {'10. Average hourly rate'}
          <input
            className={styles.input}
            value={values.average_hourly_rate}
            name={'average_hourly_rate'}
            onChange={handleInputChange}
            disabled={edit}
          />
          <div className={styles.icon} onClick={onEditClick}>
            <PencilIcon />
          </div>
        </div>

        <div className={styles.list}>
          {'11. Minimum project budget'}
          <input
            className={styles.input}
            value={values.minimum_project_budget}
            name={'minimum_project_budget'}
            onChange={handleInputChange}
            disabled={edit}
          />
          <div className={styles.icon} onClick={onEditClick}>
            <PencilIcon />
          </div>
        </div>

        <div className={styles.list}>
          {'12. Team Size'}
          <input
            className={styles.input}
            value={values.team_size}
            name={'team_size'}
            onChange={handleInputChange}
            disabled={edit}
          />
          <div className={styles.icon} onClick={onEditClick}>
            <PencilIcon />
          </div>
        </div>

        <div className={styles.list}>
          {'13. Location'}
          <input
            className={styles.input}
            value={values.location}
            name={'location'}
            onChange={handleInputChange}
            disabled={edit}
          />
          <div className={styles.icon} onClick={onEditClick}>
            <PencilIcon />
          </div>
        </div>
        <div className={styles.list}>
          {'14. Foundation date'}
          <input
            className={styles.input}
            value={values.foundation_date}
            name={'foundation_date'}
            onChange={handleInputChange}
            disabled={edit}
          />
          <div className={styles.icon} onClick={onEditClick}>
            <PencilIcon />
          </div>
        </div>
        <div className={styles.list}>
          {"15. Client's Focus (Ideal Client Profile based on your portfolio) "}
          <input
            className={styles.input}
            value={values.clients_focus}
            name={'clients_focus'}
            onChange={handleInputChange}
            disabled={edit}
          />
          <div className={styles.icon} onClick={onEditClick}>
            <PencilIcon />
          </div>
        </div>
        <div className={styles.list}>
          {'16. Marketing manager contact details'}
          <input
            className={styles.input}
            value={values.contact_marketing}
            name={'contact_marketing'}
            onChange={handleInputChange}
            disabled={edit}
          />
          <div className={styles.icon} onClick={onEditClick}>
            <PencilIcon />
          </div>
        </div>
        <div className={styles.list}>
          {'17. Tech or Project Expert contact details (who will be in touch with a client)'}
          <input
            className={styles.input}
            value={values.contact_expert}
            name={'contact_expert'}
            onChange={handleInputChange}
            disabled={edit}
          />
          <div className={styles.icon} onClick={onEditClick}>
            <PencilIcon />
          </div>
        </div>
        <div className={styles.list}>
          {"18. Links to client's success cases"}
          <input
            className={styles.input}
            value={values.links_case}
            name={'links_case'}
            onChange={handleInputChange}
            disabled={edit}
          />
          <div className={styles.icon} onClick={onEditClick}>
            <PencilIcon />
          </div>
        </div>
        <div className={styles.list}>
          {'19. Describe ideal client portrait'}
          <input
            className={styles.input}
            value={values.client_describe}
            name={'company_name'}
            onChange={handleInputChange}
            disabled={edit}
          />
          <div className={styles.icon} onClick={onEditClick}>
            <PencilIcon />
          </div>
        </div>
      </div>
      <div className={styles.btnContainer}>
        <PuzzleButton
          btnTitle={'Save'}
          btnType={PuzzleButtonTypes.TextButton}
          onClick={onSaveCompanyProfileClick}
          btnClassName={styles.buttonSave}
        />
      </div>
    </div>
  );
};

export default CompanyProfile;
