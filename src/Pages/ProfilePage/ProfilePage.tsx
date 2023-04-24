import { DatePickerProps } from 'antd';

import classNames from 'classnames';

import { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { GenerateIcon } from '../../Assets/DevTeam/GenerateIcon';
import { PencilIcon } from '../../Assets/Profile/PencilIcon';
import { DeleteProjectIcon } from '../../Assets/ProfilePage/DeleteProjectIcon';
import { PauseProjectIcon } from '../../Assets/ProfilePage/PauseProjectIcon';
import CompanyProfile from '../../Components/CompanyProfile';
import DevTeamTable from '../../Components/DevTeamTable';
import Input from '../../Components/Input';
import ModalGeneratePassword from '../../Components/ModalGeneratePassword';
import PuzzleButton, { PuzzleButtonTypes } from '../../Components/PuzzleButton';
import TabsListProfile from '../../Components/TabsListProfile';
import Title from '../../Components/Title';
import { CompanyList, Role, TabsProfile } from '../../Components/constants/@types';
import {
  getGeneratePassword,
  getHeadCompanyListReducer,
  getPersonalInfoReducer
} from '../../Redux/Reducers/profileReducer';
import profileSelectors from '../../Redux/Selectors/profileSelectors';

import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const dispatch = useDispatch();

  const personalInfoList = useSelector(profileSelectors.getPersonalInfo);
  const companyList = useSelector(profileSelectors.getCompanyList);
  const password = useSelector(profileSelectors.getGeneratePassword);

  useEffect(() => {
    dispatch(getHeadCompanyListReducer());
  }, []);

  useEffect(() => {
    dispatch(getPersonalInfoReducer());
  }, []);

  const [name, setName] = useState('');
  const [nickName, setNickName] = useState('');
  const [positions, setPositions] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [telegram, setTelegram] = useState('');
  const [company, setCompany] = useState('');

  useEffect(() => {
    if (personalInfoList && companyList) {
      setName(personalInfoList?.full_name);
      setNickName(personalInfoList?.nickname);
      setPositions(personalInfoList?.role);
      setEmail(personalInfoList?.email);
      setPhone(personalInfoList?.phone);
      setCompany(companyList?.company_name);
    }
  });
  const levelOptions = [
    { value: 'Junior', label: 'Junior' },
    { value: 'Middle', label: 'Middle' },
    { value: 'Senior', label: 'Senior' },
    { value: 'Lead', label: 'Lead' }
  ];

  const [selectedLevelOptions, setSelectedLevelOptions] = useState<any>(null);
  const [rate, setRate] = useState('');

  const [projects, setProjects] = useState('');
  const [stack, setStack] = useState('');
  const [experience, setExperience] = useState('');

  const [info, setInfo] = useState('');

  const [activeTab, setActiveTab] = useState(TabsProfile.PersonalInfo);
  const onTabClick = (tab: TabsProfile) => {
    setActiveTab(tab);
  };
  const [activeModal, setActiveModal] = useState(false);
  const onGenerateClick = () => {
    dispatch(getGeneratePassword());
    setActiveModal(true);
  };
  const onScreenClick = () => {
    setActiveModal(false);
  };

  const currencyOptions = [
    { value: 'EUR', label: 'EUR' },
    { value: 'USD', label: 'USD' }
  ];

  const [selectedCurrencyOptions, setSelectedCurrencyOptions] = useState<any>(null);

  const languageOptions = [
    { value: 'English', label: 'English' },
    { value: 'French', label: 'French' },
    { value: 'Hebrew', label: 'Hebrew' },
    { value: 'Spanish', label: 'Spanish' },
    { value: 'Russian', label: 'Russian' },
    { value: 'Ukrainian', label: 'Ukrainian' },
    { value: 'Arabic', label: 'Arabic' }
  ];

  const [selectedLanguageOptions, setSelectedLanguageOptions] = useState<any>(null);

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString);
  };

  const isHead = personalInfoList?.role[0] === Role.Head;

  const TABS_NAMES = useMemo(
    () => [
      { name: 'Personal Info', key: TabsProfile.PersonalInfo },
      { name: 'Company Profile', key: TabsProfile.CompanyProfile },
      { name: 'Dev Team', key: TabsProfile.DevTeam }
    ],
    []
  );

  const [showClose, setShowClose] = useState(false);
  const onCloseProjectClick = () => {
    setShowClose(!showClose);
  };

  const ClOSEBUTTON_LIST = [
    { value: 'Pause', label: 'Pause', icon: <DeleteProjectIcon /> },
    { value: 'Delete', label: 'Delete', icon: <PauseProjectIcon /> }
  ];

  const COMPANY_LIST = [
    {
      name: 'CompanyName',
      key: CompanyList.CompanyName,
      answers: companyList?.company_name
    },
    {
      name: 'LogoCompany',
      key: CompanyList.LogoCompany,
      answers: companyList?.logo
    },
    {
      name: 'WebsiteDomain',
      key: CompanyList.WebsiteDomain,
      answers: companyList?.website
    },
    {
      name: 'Tagline',
      key: CompanyList.Tagline,
      answers: companyList?.tagline
    },
    {
      name: 'ClientIndustry',
      key: CompanyList.ClientIndustry,
      answers: companyList?.client_industry
    },
    {
      name: 'SoftwareStack',
      key: CompanyList.SoftwareStack,
      answers: companyList?.software_stack
    },
    {
      name: 'Industries',
      key: CompanyList.Industries,
      answers: companyList?.industry_choice
    },
    {
      name: 'CompanyDescription',
      key: CompanyList.CompanyDescription,
      answers: companyList?.short_description
    },
    {
      name: 'FullCompanyDescription',
      key: CompanyList.FullCompanyDescription,
      answers: companyList?.full_description
    },
    {
      name: 'AverageHourlyRate',
      key: CompanyList.AverageHourlyRate,
      answers: companyList?.average_hourly_rate
    },
    {
      name: 'MinimumBudget',
      key: CompanyList.MinimumBudget,
      answers: companyList?.minimum_project_budget
    },
    {
      name: 'TeamSize',
      key: CompanyList.TeamSize,
      answers: companyList?.team_size
    },
    {
      name: 'Location',
      key: CompanyList.Location,
      answers: companyList?.location
    },
    {
      name: 'FoundationDate',
      key: CompanyList.FoundationDate,
      answers: companyList?.foundation_date
    },
    {
      name: 'ClientsFocus',
      key: CompanyList.ClientsFocus,
      answers: companyList?.clients_focus
    },
    {
      name: 'ContactDetails',
      key: CompanyList.ContactDetails,
      answers: companyList?.contact_marketing
    },
    {
      name: 'ProjectExpertContactDetails',
      key: CompanyList.ProjectExpertContactDetails,
      answers: companyList?.contact_expert
    },
    {
      name: 'LinkToClient',
      key: CompanyList.LinkToClient,
      answers: companyList?.links_case
    },
    {
      name: 'ClientPortrait',
      key: CompanyList.ClientPortrait,
      answers: companyList?.client_describe
    }
  ];

  return (
    <div className={styles.container}>
      <div
        className={classNames({
          [styles.header]: isHead
        })}>
        <div className={styles.titleBlock}>
          <Title name={'My Profile'} className={styles.title} />
          {isHead ? (
            <div className={styles.dropdown_container}>
              <div className={styles.btnProject} onClick={onCloseProjectClick}>
                {'Close a project'}
              </div>
              {showClose ? (
                <div className={styles.dropdown_menu}>
                  {ClOSEBUTTON_LIST.map((el) => (
                    <div key={el.value} className={styles.dropdown_item}>
                      {el.icon}
                      {el.label}
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
        {isHead ? <TabsListProfile activeTab={activeTab} onSelectTab={onTabClick} tabsList={TABS_NAMES} /> : null}
      </div>

      {activeTab === TabsProfile.PersonalInfo ? (
        <div className={styles.containerBlockWithBtn}>
          <div className={styles.containerInfo}>
            <div className={styles.containerPhoto}>
              <h2 className={styles.subTitle}>Account photo</h2>
              <img className={styles.photo} src={personalInfoList?.account_photo} alt={''} />
              <div className={styles.description}>
                Edit photo <PencilIcon />
              </div>
            </div>

            <div className={styles.containerContactInfo}>
              <div>
                <h2 className={styles.subTitle}>Contact info</h2>

                <div className={styles.containerInput}>
                  <Input
                    title={'Full name'}
                    type={'text'}
                    value={name}
                    onChange={(value) => setName(value)}
                    placeholder={'Full name'}
                    className={styles.input}
                  />

                  <Input
                    title={'Nick name'}
                    type={'text'}
                    value={nickName}
                    onChange={(value) => setNickName(value)}
                    placeholder={'Nick name'}
                    className={styles.input}
                  />
                  <Input
                    title={'Company name'}
                    type={'text'}
                    value={company}
                    onChange={(value) => setCompany(value)}
                    disabled
                    placeholder={'Company name'}
                    className={styles.input}
                  />

                  <Input
                    title={'Positions'}
                    type={'text'}
                    value={positions}
                    onChange={(value) => setPositions(value)}
                    placeholder={'Positions'}
                    disabled
                    className={styles.input}
                  />
                </div>
              </div>

              <div className={styles.containerInput}>
                <Input
                  title={'Email'}
                  type={'email'}
                  value={email}
                  onChange={(value) => setEmail(value)}
                  placeholder={'Email'}
                  className={styles.input}
                />

                <Input
                  title={'Phone number '}
                  type={'tel'}
                  value={phone}
                  onChange={(value) => setPhone(value)}
                  placeholder={'Phone'}
                  className={styles.input}
                />

                <Input
                  title={'Telegram'}
                  type={'text'}
                  value={telegram}
                  onChange={(value) => setTelegram(value)}
                  placeholder={'Enter the profile link telegram'}
                  className={styles.input}
                />
              </div>
            </div>
          </div>

          <div className={styles.buttonsBlock}>
            <PuzzleButton
              btnTitle={'Cancel'}
              btnType={PuzzleButtonTypes.TextButton}
              onClick={() => {}}
              btnClassName={styles.buttonCancel}
            />

            <PuzzleButton
              btnTitle={'Save'}
              btnType={PuzzleButtonTypes.TextButton}
              onClick={() => {}}
              btnClassName={styles.buttonSave}
            />
          </div>
        </div>
      ) : null}
      {activeTab === TabsProfile.CompanyProfile ? <CompanyProfile CompanyList={COMPANY_LIST} /> : null}
      {activeTab === TabsProfile.DevTeam ? (
        <div className={styles.devTeamContainer}>
          <div className={styles.btnGenerate} onClick={onGenerateClick}>
            {'Generate code'}
            <GenerateIcon />
          </div>
          <DevTeamTable />
          <div
            className={classNames(styles.wrapModal, {
              [styles.showModal]: activeModal
            })}
            onClick={onScreenClick}>
            <ModalGeneratePassword modal={activeModal} password={password} />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProfilePage;