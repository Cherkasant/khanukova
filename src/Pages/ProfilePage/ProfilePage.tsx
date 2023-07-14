import classNames from 'classnames';
import React, { useEffect, useMemo, useRef, useState } from 'react';

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

import { getUserName } from '../../Redux/Reducers/authReducer';

import Input from '../../Components/Input';

import styles from './ProfilePage.module.css';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const isInfoLoading = useSelector(profileSelectors.getInfoLoader);
  const personalInfoList = useSelector(profileSelectors.getPersonalInfo);
  const companyList = useSelector(profileSelectors.getCompanyList);
  const password = useSelector(profileSelectors.getGeneratePassword);

  const isHead = personalInfoList?.role[0] === Role.Head;
  const isDevTeam = personalInfoList?.role[0] === Role.DevTeam;
  const isPO = personalInfoList?.role[0] === Role.PO;

  useEffect(() => {
    dispatch(getHeadCompanyListReducer());
    dispatch(getPersonalInfoReducer());
    dispatch(getAllDevTeamEmployees());
  }, []);

  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [position, setPosition] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState<any>('');
  const [telegram, setTelegram] = useState('');

  useEffect(() => {
    if (personalInfoList && companyList) {
      setName(personalInfoList?.full_name);
      setNickname(personalInfoList?.nickname);
      setPosition(personalInfoList?.position);
      setEmail(personalInfoList?.email);
      setPhone(personalInfoList?.phone);
      setCompany(companyList?.company_name);
      setTelegram('');
    }
  }, [personalInfoList, companyList]);

  useEffect(() => {
    if ((personalInfoList && isDevTeam) || isPO) {
      setName(personalInfoList?.full_name);
      setNickname(personalInfoList?.nickname);
      setPosition(personalInfoList?.position);
      setEmail(personalInfoList?.email);
      setPhone(personalInfoList?.phone);
      setTelegram('');
    }
  }, [personalInfoList]);
  const inputFile = useRef<any>(null);

  const [file, setFile] = useState<any>(null);

  const onChangeFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
      const fd = new FormData();
      fd.append('account_photo', event.target.files[0]);
      dispatch(
        editPersonalInfo({
          formData: fd,
          callback: () => {
            dispatch(getPersonalInfoReducer());
          }
        })
      );
    }
  };

  const onSaveBtnClick = () => {
    const formData = new FormData();
    formData.append('full_name', name);
    formData.append('phone', phone);
    formData.append(' position', position);

    dispatch(
      editPersonalInfo({
        formData,
        callback: () => {
          dispatch(getPersonalInfoReducer());
          dispatch(getUserName());
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
        <div className={classNames(styles.containerBlockWithBtn, { [styles.devHeight]: !isHead })}>
          <div className={styles.containerInfo}>
            <div className={styles.containerPhoto}>
              <h2 className={styles.subTitle}>Account photo</h2>
              <div className={styles.editContainer}>
                <img className={styles.photo} src={personalInfoList?.account_photo} alt={''} />
                <div className={styles.editIcon} onClick={() => inputFile.current.click()}>
                  <PencilIcon />
                  <input type={'file'} className={styles.inputFile} onChange={onChangeFile} ref={inputFile} />
                </div>
              </div>
            </div>
            <div>
              <h2 className={styles.subTitle}>Contact info</h2>
              <div className={styles.containerContactInfo}>
                <div>
                  <div className={styles.containerInput}>
                    <div className={styles.inputBlock}>
                      <Input
                        title={'Full name'}
                        type={'text'}
                        value={name}
                        onChange={(value) => setName(value)}
                        placeholder={'Full name'}
                        className={styles.input}
                      />
                    </div>
                    <div className={styles.inputBlock}>
                      <Input
                        title={'Nick name'}
                        type={'text'}
                        value={nickname}
                        onChange={(value) => setNickname(value)}
                        placeholder={'Nick name'}
                        className={styles.input}
                      />
                    </div>
                    {/*<div className={styles.inputBlock}>*/}
                    {/*  <Input*/}
                    {/*    title={'Company'}*/}
                    {/*    type={'text'}*/}
                    {/*    value={company}*/}
                    {/*    onChange={(value) => setCompany(value)}*/}
                    {/*    placeholder={'Company'}*/}
                    {/*    disabled*/}
                    {/*    className={styles.input}*/}
                    {/*  />*/}
                    {/*</div>*/}
                    <div className={styles.inputBlock}>
                      <Input
                        title={'Position'}
                        type={'text'}
                        value={position}
                        onChange={(value) => setPosition(value)}
                        placeholder={'Positions'}
                        disabled
                        className={styles.input}
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.containerInput}>
                  <div className={styles.inputBlock}>
                    <Input
                      title={'Email'}
                      type={'email'}
                      value={email}
                      onChange={(value) => setEmail(value)}
                      placeholder={'Email'}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.inputBlock}>
                    <Input
                      title={'Phone number '}
                      type={'tel'}
                      value={phone}
                      onChange={(value) => setPhone(value)}
                      placeholder={'Phone'}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.inputBlock}>
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
            </div>
          </div>

          <div className={styles.buttonsBlock}>
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
