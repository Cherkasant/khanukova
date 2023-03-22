import { FC } from 'react'
import classNames from 'classnames'

import { Tabs } from '../constants/@types'

import styles from './Tabs.module.css'

type TabsProps = {
  activeTab: Tabs
  onClickedTab: (tab: Tabs) => void
  TabsList: Array<{ name: string; key: Tabs }>
}

const Tab: FC<TabsProps> = ({ activeTab, TabsList, onClickedTab }) => {
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

export default Tab
