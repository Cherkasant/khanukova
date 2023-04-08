import { FC } from 'react';

import classNames from 'classnames';

import { TabsProfile } from '../constants/@types';

import styles from './TabsList.module.css';

type TabProps = {
  activeTab: TabsProfile
  onSelectTab: (tab: TabsProfile) => void
  disabled?: boolean
  tabsList: Array<{ name: string; key: TabsProfile }>
}

const TabsListProfile: FC<TabProps> = ({ activeTab, onSelectTab, tabsList }) => {
  return (
    <div className={styles.tabs}>
      {tabsList.map((tab) => {
        return (
          <div
            key={tab.key}
            onClick={() => onSelectTab(tab.key)}
            className={classNames(styles.tab, {
              [styles.active]: tab.key === activeTab,
              [styles.disabled]: tab.key !== activeTab
            })}>
            {tab.name}
          </div>
        );
      })}
    </div>
  );
};

export default TabsListProfile;
