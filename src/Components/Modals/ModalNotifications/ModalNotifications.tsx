import classNames from 'classnames';
import React, { FC, useState } from 'react';

import Checkbox from '../../Checkbox';

import styles from '../ModalNotifications/ModalNotifications.module.css';
import PuzzleButton, { PuzzleButtonTypes } from '../../PuzzleButton';

type ModalNotificationsProps = {
  modal: boolean;
};

const CATEGORIES = [
  {
    name: 'Actions',
    icon: <Checkbox isChecked={true} handleChange={() => {}} label={''} />,
    description: 'Some description about this option',
    isHead: true
  },
  {
    name: 'Deadline',
    icon: <Checkbox isChecked={true} handleChange={() => {}} label={''} />,
    description: 'Some description about this option',
    isHead: true
  },
  {
    name: 'Events',
    icon: <Checkbox isChecked={true} handleChange={() => {}} label={''} />,
    description: 'Some description about this option',
    isHead: true
  },
  {
    name: 'Payments',
    icon: <Checkbox isChecked={true} handleChange={() => {}} label={''} />,
    description: 'Some description about this option',
    isHead: true
  }
];

const ModalNotifications: FC<ModalNotificationsProps> = ({ modal }) => {
  const [activeModal, setActiveModal] = useState(false);

  const onScreenClick = () => {
    setActiveModal(!activeModal);
    console.log('bye');
  };

  return (
    <div
      className={classNames(styles.wrap, { [styles.activeModal]: modal })}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
      <div className={styles.container}>
        <div className={styles.containerTitle}>
          <div className={styles.title}>Notifications options</div>
          <div className={styles.subTitle}>Choose trigger for your notifications</div>
        </div>

        <div className={styles.containerCategory}>
          {CATEGORIES.map(({ name, icon, description, isHead }) => {
            return (
              <div className={styles.categories}>
                {isHead ? (
                  <div className={styles.category}>
                    <div className={styles.checkbox}>{icon}</div>
                    <div className={styles.options}>
                      <div className={styles.name}>{name}</div>
                      <div className={styles.description}>{description}</div>
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className={styles.containerSettings}>
          <div className={styles.setting}>
            <Checkbox isChecked={true} handleChange={() => {}} label={'Email notifications'} />
          </div>
          <div className={styles.setting}>
            <Checkbox isChecked={true} handleChange={() => {}} label={'In-account notifications'} />
          </div>
        </div>

        <div className={styles.buttons}>
          <PuzzleButton
            btnTitle={'Save'}
            btnType={PuzzleButtonTypes.TextButton}
            onClick={onScreenClick}
            btnClassName={styles.buttonSave}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalNotifications;
