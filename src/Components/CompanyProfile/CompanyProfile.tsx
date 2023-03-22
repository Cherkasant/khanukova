import { FC } from 'react'

import { CompanyList } from '../constants/@types'

import CompanyProfileCard from '../CompanyProfileCard'

import styles from './CompanyProfile.module.css'

type CompanyProfileProps = {
  activeTab?: CompanyList
  disabled?: boolean
  CompanyList: Array<{
    name: string
    key: CompanyList
    answers: string | undefined
  }>
}

const CompanyProfile: FC<CompanyProfileProps> = ({ CompanyList }) => {
  return (
    <div className={styles.listContainer}>
      {CompanyList.map((card) => {
        return <CompanyProfileCard CardType={card} key={card.key} />
      })}
    </div>
  )
}

export default CompanyProfile
