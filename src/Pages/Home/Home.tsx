import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import classNames from 'classnames';

import { useDispatch, useSelector } from 'react-redux';

import { SearchIcon } from '../../Assets/Home/SearchIcon';
import CardsList from '../../Components/CardsList';
import Input from '../../Components/Input';
import Title from '../../Components/Title';
import { PathNames } from '../Router/Router';

import ModalCloseProject from '../../Components/Modals/ModalCloseProject';

import postSelector from '../../Redux/Selectors/postSelector';

import { AddNewProjectIcon } from '../../Assets/Home/AddNewProjectIcon';

import { ArrowDropDownIcon } from '../../Assets/Table/ArrowDropDownIcon';

import { Close } from '../../Assets/Table/Close';

import { SortIcon } from '../../Assets/Home/SortIcon';

import { getHomeScreenProjects } from '../../Redux/Reducers/postReducer';

import styles from './Home.module.css';

const MOCK_CARDS_LIST = [
  {
    id: 1,
    projectName: 'Yandex',
    tasks: '20%',
    deadline: '16.02.2222',
    budget: '1000000$',
    paid: '12500$'
  },
  {
    id: 2,
    projectName: 'Google',
    tasks: '20%',
    deadline: '16.02.2222',
    budget: '1000000$',
    paid: '12500$'
  }
];

const SORT_LIST = [
  { value: 'Alphabetical', label: 'Alphabetical', icon: <SortIcon /> },
  { value: 'Date created', label: 'Date created', icon: <SortIcon /> },
  { value: 'Status', label: 'Status', icon: <SortIcon /> }
];
const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getHomeScreenProjects());
  });

  const AllProjects = useSelector(postSelector.getAllHomeScreenProjects);
  const activeModal = useSelector(postSelector.getCloseProjectModal);
  const navigate = useNavigate();
  const [inputSearch, setInputSearch] = useState('');
  const onChange = (value: string) => {
    setInputSearch(value);
  };
  const [sort, setSort] = useState(false);
  const [typeSort, setTypeSort] = useState('Alphabetical');
  const [clicked, setClicked] = useState(false);
  const onSortSelectClick = () => {
    setSort(!sort);
  };
  const onSortItemClick = (value: string) => {
    setTypeSort(value);
    setClicked(true);
  };
  return (
    <div className={styles.container}>
      <div className={styles.widgets}>
        <Title name={'Projects'} className={styles.title} />
      </div>
      <div className={styles.btnAdd}>
        <div className={styles.addNewContainer} onClick={() => navigate(PathNames.ProjectScreen)}>
          <AddNewProjectIcon />
          {'Add new'}
        </div>
        <div className={styles.sortContainer}>
          <div className={styles.sortTitle}>{'Sort'}</div>
          <div className={styles.sortSelector} onClick={onSortSelectClick}>
            {typeSort}
            {sort ? <Close /> : <ArrowDropDownIcon />}
            {sort ? (
              <div className={styles.sortDropDown}>
                {SORT_LIST.map((el) => (
                  <div key={el.value} className={styles.sortItem} onClick={() => onSortItemClick(el.value)}>
                    {typeSort === el.value ? el.icon : null}
                    {el.value}
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className={styles.searchContainer}>
            <Input
              value={inputSearch}
              onChange={onChange}
              placeholder={'Project name'}
              className={styles.searchInput}
            />
            <div className={styles.icon}>
              <SearchIcon />
            </div>
          </div>
        </div>
      </div>

      <CardsList cardsList={AllProjects} />
      <div
        className={classNames(styles.wrapModal, {
          [styles.showModal]: activeModal
        })}>
        <ModalCloseProject modal={activeModal} />
      </div>
    </div>
  );
};

export default Home;
