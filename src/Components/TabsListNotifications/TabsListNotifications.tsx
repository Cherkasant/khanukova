import React, { FC } from "react";
import styles from "./TabsListNotifications.module.css";
import classNames from "classnames";
import { TabsNotifications } from "../constants/@types";

type TabsNotificationsProps = {
   activeTab: TabsNotifications;
   onClickedTab: (tab: TabsNotifications) => void;
   TabsList: Array<{ name: string; key: TabsNotifications }>;
};

const TabsListNotifications: FC<TabsNotificationsProps> = ({ activeTab, TabsList, onClickedTab }) => {
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

export default TabsListNotifications;
