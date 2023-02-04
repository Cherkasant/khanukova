import React, { useEffect, useState } from "react";
import styles from "./ProjectScreen.module.css";
import { AddMeetingIcon } from "../../Assets/icons/AddMeetingIcon";
import { Tabs } from "../../Components/constants/@types";
import Tab from "../../Components/Tabs";
import { FilterIcon } from "../../Assets/icons/FilterIcon";
import { AddRoundIcon } from "../../Assets/icons/AddRoundIcon";
import { EditTitleIcon } from "../../Assets/icons/EditTitleIcon";
import Table from "../../Components/Table";
import NewTask from "../../Components/ModalNewTask";
import { useDispatch, useSelector } from "react-redux";
import postSelector from "../../Redux/Selectors/postSelector";
import {
  setFilterVisible,
  setSelectedModalVisible,
  setTitleTask,
} from "../../Redux/Reducers/postReducer";
import Input from "../../Components/Input";
import FilterProjectScreen from "../../Components/FilteresPanel/FilterProjectScreen";

const TABS_NAMES = [
  { name: "Planning", key: Tabs.Planning },
  { name: "Gantt", key: Tabs.Gantt },
  { name: "Resourses", key: Tabs.Resourses },
  { name: "Events", key: Tabs.Events },
  { name: "Clients Requests", key: Tabs.ClientsRequests },
  { name: "Documents", key: Tabs.Documents },
  { name: "External Sources", key: Tabs.ExternalSources },
];

const ProjectScreen = () => {
  const onFilterClick = () => {
    dispatch(setFilterVisible(true));
  };
  const isFilterVisible = useSelector(postSelector.getFilter);

  const isVisible = useSelector(postSelector.getModal);
  const dispatch = useDispatch();
  const onCloseClick = () => {
    dispatch(setSelectedModalVisible(false));
  };

  const [addItem, setAddItem] = useState(false);
  const onAddItemClick = () => {
    setAddItem(!addItem);
    dispatch(setSelectedModalVisible(true));
  };
  const [activeTab, setActiveTab] = useState(Tabs.Planning);
  const onTabClick = (newTab: Tabs) => {
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    } else setActiveTab(Tabs.Planning);
  };

  const [title, setTitle] = useState("");
  const [edit, setEdit] = useState(false);
  const onEditClick = () => {
    setEdit(!edit);
  };

  useEffect(() => {
    if (title) {
      dispatch(setTitleTask(title));
    } else setTitle(title);
  }, [title]);

  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div className={styles.widgets}>
          <div className={styles.titleContainer}>
            <Input
              value={title}
              onChange={(value) => setTitle(value)}
              className={styles.title}
              placeholder={"Project"}
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
              <AddMeetingIcon />
            </div>
            <div className={styles.button}>{"Create a Meeting"}</div>
          </div>
        </div>
        <Tab
          activeTab={activeTab}
          onClickedTab={onTabClick}
          TabsList={TABS_NAMES}
        />
      </div>
      <div className={styles.blueLine}></div>
      <div className={styles.bottomContainer}>
        <div className={styles.filterButton} onClick={onFilterClick}>
          <FilterIcon />
          {"Filters"}
        </div>
      </div>
      {!addItem ? (
        <div className={styles.bottomContainer}>
          <div className={styles.milestoneButton} onClick={onAddItemClick}>
            <AddRoundIcon />
            {"Add item"}
          </div>
        </div>
      ) : (
        <Table />
      )}

      <NewTask
        isOpen={isVisible}
        onRequestClose={onCloseClick}
        ariaHideApp={false}
      />
      {isFilterVisible ? <FilterProjectScreen /> : null}
    </div>
  );
};

export default ProjectScreen;
