import { ChangeEvent, FC, useState } from 'react';
import classNames from 'classnames';

import Dropdown from 'react-dropdown';

import Input from '../Input';

import styles from './PaymentCard.module.css';

type PaymentCardProps = {
  card: { name: string; milestone: string; deadline: string }
}

const StatusOptions = [
  { value: 'Unpaid', label: 'Unpaid' },
  { value: 'Paid', label: 'Paid' }
];
const PaidOptions = [
  { value: 'USD', label: 'USD' },
  { value: 'EUR', label: 'EUR' }
];

const PaymentCard: FC<PaymentCardProps> = ({ card }) => {
  const { name, milestone, deadline } = card;
  const [status, setStatus] = useState<any>(StatusOptions[0].value);
  const [rate, setRate] = useState<any>(PaidOptions[0].value);
  const changeRate = (event: ChangeEvent<HTMLSelectElement>) => {
    setRate(event.target.value);
  };
  return (
    <div
      className={classNames(styles.list, {
        [styles.checked]: status === 'Paid'
      })}>
      <div className={styles.columnName}>{name}</div>
      <div className={styles.columnMilestone}>{milestone}</div>
      <div className={styles.columnStatus}>
        <Dropdown
          options={StatusOptions}
          onChange={(e) => setStatus(e.value)}
          value={status}
          className={styles.statusBlock}
          controlClassName={classNames(styles.status, {
            [styles.checked]: status === 'Paid'
          })}
          menuClassName={styles.menu}
        />
      </div>

      <div className={styles.columnPaid}>
        <Input
          type={'text'}
          placeholder={''}
          className={classNames(styles.input, {
            [styles.checked]: status === 'Paid'
          })}
        />
        <Dropdown
          options={PaidOptions}
          placeholder={'USD'}
          value={rate}
          onChange={() => changeRate}
          className={styles.root}
          controlClassName={classNames(styles.paidDropdown, {
            [styles.checked]: status === 'Paid'
          })}
          arrowClosed={<span className={styles.arrow} />}
          arrowOpen={<span className={styles.arrowOpen} />}
        />
      </div>
      <div className={styles.column}>{deadline}</div>
    </div>
  );
};

export default PaymentCard;
