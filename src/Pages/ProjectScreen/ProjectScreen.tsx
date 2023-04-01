import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import classNames from 'classnames'

import { AddMeetingIcon } from '../../Assets/icons/AddMeetingIcon'
import { Tabs } from '../../Components/constants/@types'
import Tab from '../../Components/Tabs'
import { FilterIcon } from '../../Assets/icons/FilterIcon'
import { AddRoundIcon } from '../../Assets/icons/AddRoundIcon'
import { EditTitleIcon } from '../../Assets/icons/EditTitleIcon'
import NewTask from '../../Components/ModalNewTask'

import postSelector from '../../Redux/Selectors/postSelector'
import Input from '../../Components/Input'
import FilterProjectScreen from '../../Components/FilteresPanel/FilterProjectScreen'
import Table from '../../Components/Table'
import ClientsRequestCard from '../../Components/ClientsRequestCard'
import { requestInProgressArray, requestOpenedArray } from '../../Components/ClientsRequestCard/constantsRequest'
import ModalEcase from '../../Components/ModalEcase'
import ModalRequest from '../../Components/ModalRequest'
import Resourses from '../../Components/Resourses'
import Documents from '../../Components/Documents'
import { postProject, setFilterVisible, setSelectedModalVisible } from '../../Redux/Reducers/postReducer'

import styles from './ProjectScreen.module.css'

const TABS_NAMES = [
  { name: 'Planning', key: Tabs.Planning },
  { name: 'Gantt', key: Tabs.Gantt },
  { name: 'Resourses', key: Tabs.Resourses },
  { name: 'Events', key: Tabs.Events },
  { name: 'Clients Requests', key: Tabs.ClientsRequests },
  { name: 'Documents', key: Tabs.Documents },
  { name: 'External Sources', key: Tabs.ExternalSources }
]

const ProjectScreen = () => {
  const onFilterClick = () => {
    dispatch(setFilterVisible(true))
  }
  const isSaveClicked = useSelector(postSelector.getTask)
  const projectTitle = useSelector(postSelector.getTitleMilestone)
  const dispatch = useDispatch()
  const [titleDown, setTitleDown] = useState('')
  const [addItem, setAddItem] = useState(false)
  const onAddItemClick = () => {
    if (projectTitle) {
      setAddItem(!addItem)
      dispatch(setSelectedModalVisible(true))
    }
  }
  const [activeTab, setActiveTab] = useState(Tabs.Planning)

  const onTabClick = (newTab: Tabs) => {
    if (newTab !== activeTab) {
      setActiveTab(newTab)
    } else setActiveTab(Tabs.Planning)
  }

  const [title, setTitle] = useState('')
  const [edit, setEdit] = useState(false)
  const onEditClick = () => {
    setEdit(!edit)
  }

  const onChangeKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      dispatch(postProject({ project_name: title }))
      setTitleDown(title)
      setEdit(!edit)
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div className={styles.widgets}>
          <div className={styles.titleContainer}>
            <div
              className={classNames(styles.popoverTitle, {
                [styles.hide]: projectTitle
              })}>
              {'Please enter a project name and press Enter to get started'}
            </div>
            {!titleDown ? <Input
              value={title}
              onChange={(value) => setTitle(value)}
              onKeyDown={onChangeKeyDown}
              className={styles.title}
              placeholder={'New project'}
              disabled={!edit}
            /> : (
              <div className={styles.titleDiv}>{title}</div>
            )}
            {!edit ? (
              <div className={styles.edit} onClick={onEditClick}>
                <EditTitleIcon />
              </div>
            ) : null}
          </div>

          <div className={styles.addContainer}>
            <div className={styles.icon}>
              <AddMeetingIcon />
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
      {!isSaveClicked && activeTab === Tabs.Planning ? (
        <div className={styles.bottomContainer}>
          <div
            className={classNames(styles.milestoneButton, {
              [styles.disabled]: !projectTitle
            })}
            onClick={onAddItemClick}>
            <AddRoundIcon />
            {'Add item'}
          </div>
        </div>
      ) : null}
      {isSaveClicked && activeTab === Tabs.Planning ? <Table /> : null}
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
      <NewTask />
      <ModalEcase />
      <ModalRequest />
    </div>
  )
}

export default ProjectScreen
