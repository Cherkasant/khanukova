import React, { FC } from "react";
import styles from "./Tabs.module.css";
import classNames from "classnames";
import { Tabs } from "../constants/@types";

type TabsProps = {
  activeTab: Tabs;
  onClickedTab: (tab: Tabs) => void;
  TabsList: Array<{ name: string; key: Tabs }>;
};

const Tab: FC<TabsProps> = ({ activeTab, TabsList, onClickedTab }) => {
  return (
    <div className={styles.formContainer}>
      {TabsList.map((tab) => {
        return (
          <div
            key={tab.key}
            onClick={() => onClickedTab(tab.key)}
            className={classNames(styles.container, {
              [styles.clicked]: tab.key === activeTab,
            })}
          >
            {tab.name}
          </div>
        );
      })}
    </div>
  );
};

export default Tab;
