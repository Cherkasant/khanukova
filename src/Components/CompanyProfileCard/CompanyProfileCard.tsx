import { FC, useState } from 'react';

import styles from '../CompanyProfile/CompanyProfile.module.css';
import { CompanyList } from '../constants/@types';
import { PencilIcon } from '../../Assets/Profile/PencilIcon';

type CompanyProfileCardProps = {
  CardType: { name: string; key: CompanyList; answers: string | undefined };
};

const CompanyProfileCard: FC<CompanyProfileCardProps> = ({ CardType }) => {
  const { key, answers } = CardType;
  const [edit, setEdit] = useState(false);
  const onEditClick = () => {
    setEdit(!edit);
  };
  return (
    <div className={styles.list}>
      {key}
      <textarea name={'text'} wrap={'soft'} className={styles.input} defaultValue={answers} disabled={edit} />
      <div className={styles.icon} onClick={onEditClick}>
        <PencilIcon />
      </div>
    </div>
  );
};

export default CompanyProfileCard;
