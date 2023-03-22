import { FC } from 'react'
import classNames from 'classnames'

import { TabsNotifications } from '../constants/@types'

import styles from './TabsListNotifications.module.css'

type TabsNotificationsProps = {
  activeTab: TabsNotifications
  onClickedTab: (tab: TabsNotifications) => void
  TabsList: Array<{ name: string; key: TabsNotifications }>
}

const TabsListNotifications: FC<TabsNotificationsProps> = ({ activeTab, TabsList, onClickedTab }) => {
  return (
    <div className={styles.formContainer}>
      {TabsList.map((tab) => {
        return (
          <div
            key={tab.key}
            onClick={() => onClickedTab(tab.key)}
            className={classNames(styles.container, {
              [styles.clicked]: tab.key === activeTab
            })}>
            {tab.name}
          </div>
        )
      })}
    </div>
  )
}

export default TabsListNotifications
