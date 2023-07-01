import classNames from 'classnames';
import React, { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';

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
      const avatar = new File([personalInfoList?.account_photo], personalInfoList?.account_photo, {
        type: 'image/png'
      });
      setFile(avatar);
    }
  }, [personalInfoList, companyList]);

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

  // @ts-ignore
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
                <div className={styles.editIcon} onClick={() => inputFile.current.click()}>
                  <PencilIcon />
                  <input type={'file'} className={styles.inputFile} onChange={onChangeFile} ref={inputFile} />
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
                      value={name}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                      placeholder={'Full name'}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.inputBlock}>
                    <div className={styles.titleInput}>{'Nick name'}</div>
                    <input
                      type={'text'}
                      name={'nickName'}
                      value={nickname}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)}
                      placeholder={'Nick name'}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.inputBlock}>
                    <div className={styles.titleInput}>{'Company name'}</div>
                    <input
                      type={'text'}
                      name={'company'}
                      value={company}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setCompany(e.target.value)}
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
                      value={position}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => setPosition(e.target.value)}
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
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    placeholder={'Enter Email'}
                    className={styles.input}
                  />
                </div>
                <div className={styles.inputBlock}>
                  <div className={styles.titleInput}>{'Phone number '}</div>
                  <input
                    type={'tel'}
                    name={'phone'}
                    value={phone}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
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
                    value={telegram}
                    placeholder={'Enter the profile link telegram'}
                    className={styles.input}
                  />
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
