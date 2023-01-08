import React, { useState } from "react";
import styles from "./ProjectScreen.module.css";
import { AddMeetingIcon } from "../../Assets/icons/AddMeetingIcon";
import { Tabs } from "../../Components/constants/@types";
import Tab from "../../Components/Tabs";
import { FilterIcon } from "../../Assets/icons/FilterIcon";
import { AddRoundIcon } from "../../Assets/icons/AddRoundIcon";
import { EditTitleIcon } from "../../Assets/icons/EditTitleIcon";

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
  const [activeTab, setActiveTab] = useState(Tabs.default);
  const onTabClick = (newTab: Tabs) => {
    if (newTab !== activeTab) {
      setActiveTab(newTab);
    } else setActiveTab(Tabs.default);
  };
  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div className={styles.widgets}>
          <div className={styles.titleContainer}>
            <div className={styles.title}>{"New project"}</div>
            <div className={styles.edit}>
              <EditTitleIcon />
            </div>
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
        <div className={styles.filterButton}>
          <FilterIcon />
          {"Filters"}
        </div>
        <div className={styles.milestoneButton}>
          <AddRoundIcon />
          {"Add item"}
        </div>
      </div>
    </div>
  );
};

export default ProjectScreen;
