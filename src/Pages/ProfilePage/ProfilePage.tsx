import classNames from 'classnames';

import React, { useEffect, useMemo, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { GenerateIcon } from '../../Assets/DevTeam/GenerateIcon';
import { PencilIcon } from '../../Assets/Profile/PencilIcon';
import CompanyProfile from '../../Components/CompanyProfile';
import DevTeamTable from '../../Components/DevTeamTable';
import ModalGeneratePassword from '../../Components/Modals/ModalGeneratePassword';
import PuzzleButton, { PuzzleButtonTypes } from '../../Components/PuzzleButton';
import TabsListProfile from '../../Components/TabsListProfile';
import Title from '../../Components/Title';
import { Role, TabsProfile } from '../../Components/constants/@types';
import {
  editPersonalInfo,
  getAllDevTeamEmployees,
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
    dispatch(getPersonalInfoReducer());
    dispatch(getAllDevTeamEmployees());
  }, []);

  const initialValues = {
    name: personalInfoList?.full_name,
    nickName: personalInfoList?.nickname,
    position: personalInfoList?.position,
    email: personalInfoList?.email,
    phone: personalInfoList?.phone,
    company: companyList?.company_name,
    telegram: ''
  };
  const [values, setValues] = useState(initialValues);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const onSaveBtnClick = () => {
    dispatch(
      editPersonalInfo({
        data: {
          full_name: values?.name,
          phone: values?.phone,
          position: values?.position
        },
        callback: () => {
          console.log('test');
        }
      })
    );
  };
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

  const isHead = personalInfoList?.role[0] === Role.Head;

  const TABS_NAMES = useMemo(
    () => [
      { name: 'Personal Info', key: TabsProfile.PersonalInfo },
      { name: 'Company Profile', key: TabsProfile.CompanyProfile },
      { name: 'Dev Team', key: TabsProfile.DevTeam }
    ],
    []
  );

  return (
    <div className={styles.container}>
      <div
        className={classNames({
          [styles.header]: isHead
        })}>
        <div className={styles.titleBlock}>
          <Title name={'My Profile'} className={styles.title} />
        </div>
        {isHead ? <TabsListProfile activeTab={activeTab} onSelectTab={onTabClick} tabsList={TABS_NAMES} /> : null}
      </div>

      {activeTab === TabsProfile.PersonalInfo ? (
        <div className={styles.containerBlockWithBtn}>
          <div className={styles.containerInfo}>
            <div className={styles.containerPhoto}>
              <h2 className={styles.subTitle}>Account photo</h2>
              <div className={styles.editContainer}>
                <img className={styles.photo} src={personalInfoList?.account_photo} alt={''} />
                <div className={styles.editIcon}>
                  <PencilIcon />
                </div>
              </div>
            </div>

            <div className={styles.containerContactInfo}>
              <div>
                <h2 className={styles.subTitle}>Contact info</h2>

                <div className={styles.containerInput}>
                  <div className={styles.inputBlock}>
                    <div className={styles.titleInput}>{'Full name'}</div>
                    <input
                      type={'text'}
                      name={'name'}
                      defaultValue={values.name}
                      onChange={handleInputChange}
                      placeholder={'Full name'}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.inputBlock}>
                    <div className={styles.titleInput}>{'Nick name'}</div>
                    <input
                      type={'text'}
                      name={'nickName'}
                      value={values.nickName}
                      onChange={handleInputChange}
                      placeholder={'Nick name'}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.inputBlock}>
                    <div className={styles.titleInput}>{'Company name'}</div>
                    <input
                      type={'text'}
                      name={'company'}
                      defaultValue={values.company}
                      onChange={handleInputChange}
                      placeholder={'Company name'}
                      className={styles.input}
                      disabled
                    />
                  </div>
                  <div className={styles.inputBlock}>
                    <div className={styles.titleInput}>{'Position'}</div>
                    <input
                      type={'text'}
                      name={'positions'}
                      defaultValue={values.position}
                      onChange={handleInputChange}
                      placeholder={'Positions'}
                      className={styles.input}
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className={styles.containerInput}>
                <div className={styles.inputBlock}>
                  <div className={styles.titleInput}>{'Email'}</div>
                  <input
                    type={'email'}
                    name={'email'}
                    defaultValue={values.email}
                    onChange={handleInputChange}
                    placeholder={'Enter Email'}
                    className={styles.input}
                  />
                </div>
                <div className={styles.inputBlock}>
                  <div className={styles.titleInput}>{'Phone number '}</div>
                  <input
                    type={'tel'}
                    name={'phone'}
                    defaultValue={values.phone}
                    onChange={handleInputChange}
                    placeholder={'Enter Phone'}
                    className={styles.input}
                  />
                </div>
                <div className={styles.inputBlock}>
                  <div className={styles.titleInput}>{'Telegram'}</div>
                  <input
                    title={'Telegram'}
                    type={'text'}
                    name={'telegram'}
                    defaultValue={values.telegram}
                    placeholder={'Enter the profile link telegram'}
                    className={styles.input}
                  />
                </div>
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
              onClick={onSaveBtnClick}
              btnClassName={styles.buttonSave}
            />
          </div>
        </div>
      ) : null}
      {activeTab === TabsProfile.CompanyProfile ? <CompanyProfile /> : null}
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
