import classNames from 'classnames';
import React, { useRef, useState } from 'react';

import { Edit } from '../../Assets/icons/Edit';
import ModalResourses from '../ModalResourses';

import styles from './Resourses.module.css';

const dataResourses = [
  {
    id: 1,
    positions: 'Dev 1',
    projecthours: 367,
    rateHour: 45,
    budget: '16515.00'
  },
  {
    id: 2,
    positions: 'Dev 2',
    projecthours: 387,
    rateHour: 30,
    budget: '12999.00'
  },
  {
    id: 3,
    positions: 'Dev 3',
    projecthours: 476,
    rateHour: 20,
    budget: '83432.00'
  },
  {
    id: 4,
    positions: 'Dev 4',
    projecthours: 367,
    rateHour: 20,
    budget: '23748.00'
  }
];

type dataResourseType = {
  positions: string;
  projecthours: number;
  rateHour: number;
  budget: string;
};

const sumBudget = dataResourses.reduce((sum, currentValue) => sum + Number(currentValue.budget), 0);

const sumProjecthours = dataResourses.reduce((sum, currentValue) => sum + currentValue.projecthours, 0);

const Resourses = () => {
  const [modal, setModal] = useState(false);
  const [editClick, setEditClick] = useState(false);
  const [dataEdit, setDataEdit] = React.useState<dataResourseType | null>(null);
  const btnAddNewRef = useRef(null);
  const btnEditRef = useRef(null);
  const [id, setId] = useState(0);
  return (
    <div className={styles.wrap}>
      <div className={styles.positions}>
        <div className={styles.title}>Positions</div>
        <div className={styles.inner}>
          {dataResourses.map((value, index) => (
            <div key={index} className={styles.bodyItem}>
              {value.positions}
            </div>
          ))}
          <div ref={btnAddNewRef} className={styles.addNew} onClick={() => setModal(true)}>
            + Add new
          </div>
        </div>
        <div className={styles.total}>Total</div>
      </div>
      <div>
        <div className={styles.title}>Project Involment - Hours</div>
        <div className={styles.inner}>
          {dataResourses.map((value, index) => (
            <div key={index} className={styles.bodyItem}>
              {value.projecthours}
            </div>
          ))}
        </div>
        <div className={styles.total}>{sumProjecthours}</div>
      </div>
      <div>
        <div className={styles.title}>Rate per hour</div>
        <div className={styles.inner}>
          {dataResourses.map((value, index) => (
            <div key={index} className={styles.bodyItem}>
              {value.rateHour}
            </div>
          ))}
        </div>
        <div className={styles.total}>{''}</div>
      </div>

      <div>
        <div className={styles.title}>Budget</div>
        <div className={styles.inner}>
          {dataResourses.map((value, index) => (
            <div key={index} className={styles.bodyItem}>
              {value.budget}
              <div
                ref={value.id === id ? btnEditRef : null}
                className={styles.iconsEdit}
                onClick={() => {
                  setDataEdit(value);
                  setModal(true);
                  setEditClick(true);
                  setId(value.id);
                }}>
                <Edit />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.total}>$ {`${sumBudget}.00`}</div>
      </div>
      <div className={classNames(styles.wrapModal, { [styles.showModal]: modal })}>
        <ModalResourses
          btnAddNewRef={btnAddNewRef}
          btnEditRef={btnEditRef}
          data={dataEdit}
          modal={modal}
          editClick={editClick}
          setModal={setModal}
          setEditClick={setEditClick}
        />
      </div>
    </div>
  );
};

export default Resourses;
