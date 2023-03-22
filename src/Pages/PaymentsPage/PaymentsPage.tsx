import Title from '../../Components/Title'
import PaymentsList from '../../Components/PaymentsList'
import { PaymentsData } from '../../Components/PaymentsList/constantsPayments'

import styles from './PaymentsPage.module.css'

const PaymentsPage = () => {
  return (
    <div className={styles.container}>
      <Title name={'Payments'} className={styles.title} />
      <div className={styles.header}>
        <div className={styles.headerColumn}>{'Project name'}</div>
        <div className={styles.headerColumn}>{'Milestone-sprint'}</div>
        <div className={styles.headerColumn}>{'Status'}</div>
        <div className={styles.headerColumn}>{'Paid'}</div>
        <div className={styles.headerColumn}>{'Payment Deadline'}</div>
      </div>
      <PaymentsList PaymentsArray={PaymentsData} />
    </div>
  )
}

export default PaymentsPage
