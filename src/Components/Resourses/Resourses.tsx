import classNames from 'classnames';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import {
  deleteResourses,
  getResourses,
  setstatusAddResourses,
  setstatusDeleteResourses,
  setstatusEditResourses
} from '../../Redux/Reducers/ResoursesReducer';
import resoursesSelectors from '../../Redux/Selectors/resoursesSelectors';
import { ResoursesDataType } from '../../Redux/Types/Resourses';
import { DeleteResoursesIcon } from '../../Assets/icons/DeleteResoursesIcon';

import { Edit } from '../../Assets/icons/Edit';
import ModalResourses from '../ModalResourses';
import Loader from '../Loader';

import styles from './Resourses.module.css';

const Resourses = () => {
  const resoursesData = useSelector(resoursesSelectors.getResourses);
  const statusResourses = useSelector(resoursesSelectors.setStatusResourses);
  const statusDeleteResourses = useSelector(resoursesSelectors.setstatusDeleteResourses);
  const statusEditResourses = useSelector(resoursesSelectors.setstatusEditResourses);
  const statusAddResourses = useSelector(resoursesSelectors.setstatusAddResourses);

  const sumBudget = resoursesData.reduce(
    (sum, currentValue) => sum + Number(+currentValue.rate * currentValue.time),
    0
  );
  const sumProjecthours = resoursesData.reduce((sum, currentValue) => sum + currentValue.time, 0);
  const titleResourses = ['Positions', 'Project Involment - Hours', 'Rate per hour', 'Budget'];
  const totalResourses = ['Total', sumProjecthours, '', `$ ${sumBudget}.00`];
  const { id: idParams } = useParams();
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  const [editClick, setEditClick] = useState(false);
  const [dataEdit, setDataEdit] = React.useState<ResoursesDataType | null>(null);

  const btnAddNewRef = useRef(null);
  const btnEditRef = useRef(null);
  const [id, setId] = useState(0);

  const deleteResoursesHandler = (idResourses: string) => {
    idParams && dispatch(deleteResourses({ id: idParams, idResourses }));
  };

  useEffect(() => {
    idParams && dispatch(getResourses(idParams));
  }, [idParams]);

  useEffect(() => {
    if (statusDeleteResourses === 'fullfilled') {
      idParams && dispatch(getResourses(idParams));
      dispatch(setstatusDeleteResourses(''));
    }
    if (statusEditResourses === 'fullfilled') {
      idParams && dispatch(getResourses(idParams));
      dispatch(setstatusEditResourses(''));
    }
    if (statusAddResourses === 'fullfilled') {
      idParams && dispatch(getResourses(idParams));
      dispatch(setstatusAddResourses(''));
    }
  }, [statusDeleteResourses, statusEditResourses, statusAddResourses]);

  return (
    <>
      <div className={styles.wrapTitle}>
        {titleResourses.map((value, index) => (
          <div key={index} className={classNames(styles.title, { [styles.positions]: value === 'Positions' })}>
            {value}
          </div>
        ))}
      </div>
      {statusResourses === 'pending' ? (
        <div className={styles.loaderWrap}>
          <Loader className={styles.loader} />
        </div>
      ) : (
        <div className={styles.wrap}>
          <div className={styles.positions}>
            <div className={styles.inner}>
              {resoursesData.map((value) => (
                <div key={value.id} className={styles.bodyItem}>
                  {value.position}
                </div>
              ))}
              <div ref={btnAddNewRef} className={styles.addNew} onClick={() => setModal(true)}>
                + Add new
              </div>
            </div>
          </div>
          <div>
            <div className={styles.inner}>
              {resoursesData.map((value) => (
                <div key={value.id} className={styles.bodyItem}>
                  {value.time}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className={styles.inner}>
              {resoursesData.map((value) => (
                <div key={value.id} className={styles.bodyItem}>
                  {value.rate}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className={styles.inner}>
              {resoursesData.map((value) => (
                <div key={value.id} className={styles.bodyItem}>
                  {+value.rate * value.time}
                  <div className={styles.iconsDelete} onClick={() => deleteResoursesHandler(value.id.toString())}>
                    <DeleteResoursesIcon />
                  </div>
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
      )}
      <div className={styles.wrapTotal}>
        {totalResourses.map((value, index) => (
          <div key={index} className={classNames(styles.total, { [styles.positions]: value === 'Total' })}>
            {value}
          </div>
        ))}
      </div>
    </>
  );
};

export default Resourses;
