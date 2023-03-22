import { useEffect, useMemo, useState } from 'react'
import Dropdown from 'react-dropdown'
import { DatePicker, DatePickerProps, Space } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import classNames from 'classnames'

import PuzzleButton, { PuzzleButtonTypes } from '../../Components/PuzzleButton'
import Input from '../../Components/Input'
import Title from '../../Components/Title'
import { PencilIcon } from '../../Assets/Profile/PencilIcon'
import { Avatar } from '../../Assets/Profile/avatar'
import TabsListProfile from '../../Components/TabsListProfile'
import { CompanyList, TabsProfile } from '../../Components/constants/@types'
import CompanyProfile from '../../Components/CompanyProfile'
import DevTeamTable from '../../Components/DevTeamTable'

import profileSelectors from '../../Redux/Selectors/profileSelectors'
import { getHeadCompanyListReducer } from '../../Redux/Reducers/profileReducer'
import { GenerateIcon } from '../../Assets/DevTeam/GenerateIcon'
import ModalGeneratePassword from '../../Components/ModalGeneratePassword'

import styles from './ProfilePage.module.css'

const ProfilePage = () => {
  const dispatch = useDispatch()
  const companyList = useSelector(profileSelectors.getCompanyList)

  useEffect(() => {
    dispatch(getHeadCompanyListReducer())
  })

  const [name, setName] = useState('Ivanova Irina')
  const [nickName, setNickName] = useState('')
  const [positions, setPositions] = useState('CEO')
  const [email, setEmail] = useState('irina@gmail.com')
  const [phone, setPhone] = useState('+375 (29) 758-78-47')
  const [telegram, setTelegram] = useState('')

  const [level, setLevel] = useState('')
  const [rate, setRate] = useState('')

  const [projects, setProjects] = useState('')
  const [stack, setStack] = useState('')
  const [experience, setExperience] = useState('')

  const [info, setInfo] = useState('')

  const [activeTab, setActiveTab] = useState(TabsProfile.PersonalInfo)
  const onTabClick = (tab: TabsProfile) => {
    setActiveTab(tab)
  }
  const [activeModal, setActiveModal] = useState(false)
  const onGenerateClick = () => {
    setActiveModal(true)
  }
  const onScreenClick = () => {
    setActiveModal(false)
  }

  const currencyOptions = [
    { value: 'EUR', label: 'EUR' },
    { value: 'USD', label: 'USD' }
  ]

  const [selectedCurrencyOptions, setSelectedCurrencyOptions] = useState<any>(null)

  const languageOptions = [
    { value: 'English', label: 'English' },
    { value: 'Russian', label: 'Russian' }
  ]

  const [selectedLanguageOptions, setSelectedLanguageOptions] = useState<any>(null)

  const onChange: DatePickerProps['onChange'] = (date, dateString) => {
    console.log(date, dateString)
  }

  const isHead = false

  const TABS_NAMES = useMemo(
    () => [
      { name: 'Personal Info', key: TabsProfile.PersonalInfo },
      { name: 'Company Profile', key: TabsProfile.CompanyProfile },
      { name: 'Dev Team', key: TabsProfile.DevTeam }
    ],
    []
  )

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
  ]

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Title name={'My Profile'} className={styles.title} />
        <TabsListProfile activeTab={activeTab} onSelectTab={onTabClick} tabsList={TABS_NAMES} />
      </div>

      {activeTab === TabsProfile.PersonalInfo ? (
        <div className={styles.containerBlockWithBtn}>
          <div className={styles.containerInfo}>
            <div className={styles.containerPhoto}>
              <h2 className={styles.subTitle}>Account photo</h2>
              <div className={styles.photo}>
                <Avatar />
              </div>
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
                    value={companyList?.company_name}
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

      {isHead && activeTab === TabsProfile.PersonalInfo ? (
        <div className={styles.containerHead}>
          <h2 className={styles.subTitle}>Info for Head</h2>

          <div className={styles.blockHead}>
            <div className={styles.containerInputHead}>
              <Input
                title={'Position Level'}
                type={'text'}
                value={level}
                onChange={(value) => setLevel(value)}
                placeholder={'Select position'}
                className={styles.input}
              />

              <div className={styles.containerRate}>
                <Input
                  title={'Rate'}
                  type={'text'}
                  value={rate}
                  onChange={(value) => setRate(value)}
                  placeholder={'10.00'}
                  className={styles.inputRate}
                />

                <Dropdown
                  options={currencyOptions}
                  onChange={setSelectedCurrencyOptions}
                  value={selectedCurrencyOptions}
                  placeholder="USD"
                  className={styles.dropdownContainer}
                  controlClassName={styles.dropdownControl}
                  placeholderClassName={styles.dropdownPlaceholder}
                  arrowClosed={<span className={styles.arrowClosed} />}
                  arrowOpen={<span className={styles.arrowOpen} />}
                  menuClassName={styles.dropdownMenu}
                />
              </div>

              <div>
                <div className={styles.inputTitle}>Language</div>

                <Dropdown
                  options={languageOptions}
                  onChange={setSelectedLanguageOptions}
                  value={selectedLanguageOptions}
                  placeholder="Select language"
                  className={styles.dropdownContainer}
                  controlClassName={styles.dropdownControl}
                  placeholderClassName={styles.dropdownPlaceholder}
                  arrowClosed={<span className={styles.arrowClosed} />}
                  arrowOpen={<span className={styles.arrowOpen} />}
                  menuClassName={styles.dropdownMenu}
                />
              </div>

              <div>
                <div className={styles.inputTitle}>Date of birth</div>
                <Space direction="vertical" className={styles.datePicker}>
                  <DatePicker onChange={onChange} className={styles.inputDatePicker} />
                </Space>
              </div>
            </div>

            <div className={styles.containerInputHead}>
              <Input
                title={'Projects'}
                type={'text'}
                value={projects}
                onChange={(value) => setProjects(value)}
                placeholder={'Text'}
                className={styles.inputBigLong}
              />

              <Input
                title={'Tech Stack'}
                type={'text'}
                value={stack}
                onChange={(value) => setStack(value)}
                placeholder={'Text'}
                className={styles.inputBigLong}
              />
            </div>

            <div className={styles.containerInputHead}>
              <Input
                title={'Experience'}
                type={'text'}
                value={experience}
                onChange={(value) => setExperience(value)}
                placeholder={'Text'}
                className={styles.inputBig}
              />

              <Input
                title={'Personal info'}
                type={'text'}
                value={info}
                onChange={(value) => setInfo(value)}
                placeholder={'Text'}
                className={styles.inputBig}
              />
            </div>
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
            <ModalGeneratePassword modal={activeModal} />
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default ProfilePage
