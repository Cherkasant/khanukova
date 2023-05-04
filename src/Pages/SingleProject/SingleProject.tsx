import classNames from 'classnames';

import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { useParams } from 'react-router';

import { AddNewUser } from '../../Assets/ProjectPage/AddNewUser';
import { AddRoundIcon } from '../../Assets/icons/AddRoundIcon';
import { EditTitleIcon } from '../../Assets/icons/EditTitleIcon';
import { FilterIcon } from '../../Assets/icons/FilterIcon';
import ClientsRequestCard from '../../Components/ClientsRequestCard';
import { requestInProgressArray, requestOpenedArray } from '../../Components/ClientsRequestCard/constantsRequest';
import Documents from '../../Components/Documents';
import FilterProjectScreen from '../../Components/FilteresPanel/FilterProjectScreen';
import Input from '../../Components/Input';
import ModalEcase from '../../Components/ModalEcase';
import ModalMilestone from '../../Components/ModalMilestone';
import ModalNewMilestone from '../../Components/ModalNewMilestone';
import ModalNewSubTask from '../../Components/ModalNewSubTask';
import ModalNewTask from '../../Components/ModalNewTask';
import ModalRequest from '../../Components/ModalRequest';
import ModalSubTask from '../../Components/ModalSubTask';
import ModalTask from '../../Components/ModalTask';
import Resourses from '../../Components/Resourses';
import Table from '../../Components/Table';
import Tab from '../../Components/Tabs';
import { Tabs } from '../../Components/constants/@types';
import {
  getAllMilestones,
  getAllProjects,
  getSingleProject,
  patchProject,
  setFilterVisible,
  setProjectTitle,
  setSelectedModalVisible
} from '../../Redux/Reducers/postReducer';
import postSelector from '../../Redux/Selectors/postSelector';

import styles from './SingleProject.module.css';

const TABS_NAMES = [
  { name: 'Planning', key: Tabs.Planning },
  { name: 'Gantt', key: Tabs.Gantt },
  { name: 'Resourses', key: Tabs.Resourses },
  { name: 'Events', key: Tabs.Events },
  { name: 'Clients Requests', key: Tabs.ClientsRequests },
  { name: 'Documents', key: Tabs.Documents },
  { name: 'External Sources', key: Tabs.ExternalSources }
];

const SingleProject = () => {
  const params = useParams();
  const { id } = params;

  const onFilterClick = () => {
    dispatch(setFilterVisible(true));
  };
  const isSaveClicked = useSelector(postSelector.getAllMilestones);
  const singleProject = useSelector(postSelector.getSingleProject);

  const dispatch = useDispatch();

  const [addItem, setAddItem] = useState(false);
  const onAddItemClick = () => {
    if (singleProject) {
      dispatch(setProjectTitle(singleProject.project_name));
      setAddItem(!addItem);
      dispatch(setSelectedModalVisible(true));
    }
  };
  const [activeTab, setActiveTab] = useState(Tabs.Planning);

  const onTabClick = (newTab: Tabs) => {
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    } else setActiveTab(Tabs.Planning);
  };
  useEffect(() => {
    if (id) {
      dispatch(getSingleProject(+id));
      dispatch(getAllMilestones(+id));
    }
  }, [id]);
  useEffect(() => {
    if (singleProject) {
      setTitle(singleProject?.project_name);
    }
  }, [singleProject]);

  const [title, setTitle] = useState('');
  const [edit, setEdit] = useState(false);
  const onEditClick = () => {
    setEdit(!edit);
  };

  const onChangeKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      dispatch(
        patchProject({
          id: singleProject?.id,
          data: { project_name: title },
          callback: () => {
            if (id) {
              dispatch(getSingleProject(+id));
              dispatch(getAllProjects());
            }
          }
        })
      );
      setEdit(!edit);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div className={styles.widgets}>
          <div className={styles.titleContainer}>
            <div
              className={classNames(styles.popoverTitle, {
                [styles.hide]: singleProject
              })}>
              {'Please enter a project name and press Enter to get started'}
            </div>
            <Input
              value={title}
              onChange={(value) => setTitle(value)}
              onKeyDown={onChangeKeyDown}
              className={styles.title}
              placeholder={'New project'}
              disabled={!edit}
            />
            {!edit ? (
              <div className={styles.edit} onClick={onEditClick}>
                <EditTitleIcon />
              </div>
            ) : null}
          </div>

          <div className={styles.addContainer}>
            <div className={styles.icon}>
              <AddNewUser />
            </div>

            <div className={styles.button}>{'Create a Meeting'}</div>
          </div>
        </div>
        <Tab activeTab={activeTab} onClickedTab={onTabClick} TabsList={TABS_NAMES} />
      </div>
      <div className={styles.blueLine}>{}</div>
      {activeTab === Tabs.Planning ? (
        <div className={styles.bottomContainer}>
          <div className={styles.filterButton} onClick={onFilterClick}>
            <FilterIcon />
            {'Filters'}
          </div>
        </div>
      ) : null}
      {singleProject?.milestone_data.length === 0 && activeTab === Tabs.Planning ? (
        <div className={styles.bottomContainer}>
          <div
            className={classNames(styles.milestoneButton, {
              [styles.disabled]: !singleProject
            })}
            onClick={onAddItemClick}>
            <AddRoundIcon />
            {'Add item'}
          </div>
        </div>
      ) : null}
      {isSaveClicked && activeTab === Tabs.Planning && singleProject?.milestone_data.length !== 0 ? <Table /> : null}
      <FilterProjectScreen />

      {activeTab === Tabs.ClientsRequests ? (
        <div className={styles.clientRequestContainer}>
          <div className={styles.openedRequest}>
            <ClientsRequestCard openedArray={requestOpenedArray} nameOfArray={'Opened'} />
            <div className={styles.addRequestBtn}>{'+ Add request'}</div>
          </div>
          <div className={styles.inProgressRequest}>
            <ClientsRequestCard openedArray={requestInProgressArray} nameOfArray={'In progress'} />
          </div>
          <div className={styles.closedRequest}>
            <ClientsRequestCard openedArray={requestInProgressArray} nameOfArray={'Closed'} />
          </div>
        </div>
      ) : null}
      {activeTab === Tabs.Resourses ? <Resourses /> : null}
      {activeTab === Tabs.Documents ? <Documents /> : null}
      <ModalNewMilestone />
      <ModalNewTask />
      <ModalNewSubTask />
      <ModalEcase />
      <ModalRequest />
      <ModalMilestone />
      <ModalTask />
      <ModalSubTask />
    </div>
  );
};

export default SingleProject;
