import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PuzzleDropdown from '../../PuzzleDropdown';
import { Role } from '../../constants/@types';
import { getAllChatFilter } from '../../../Redux/Reducers/chatReducer';
import profileSelectors from '../../../Redux/Selectors/profileSelectors';

import { clientsIndustry, codeLanguage, companyType } from './dataFilter';

import styles from './FilterChat.module.css';

const FilterChat = () => {
  const dispatch = useDispatch();
  const [industry, setIndustry] = useState('');
  const [language, setLanguage] = useState('');
  const [company, setCompany] = useState('');

  const personalInfoList = useSelector(profileSelectors.getPersonalInfo);

  const resetFilter = () => {
    setIndustry('');
    setLanguage('');
    setCompany('');
  };

  useEffect(() => {
    if (personalInfoList?.role[0] === Role.PO) {
      dispatch(getAllChatFilter({ clients_industry: industry, software_stack: language, industry_choice: company }));
    }
  }, [industry, language, company]);
  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <h2>Filters</h2>
        <div onClick={resetFilter} className={styles.reset}>
          Reset
        </div>
      </div>
      <div className={styles.innerFilters}>
        <PuzzleDropdown
          options={clientsIndustry}
          className={styles.arrowFilter}
          placeholder={'Clients industry'}
          value={industry}
          onChange={(e) => setIndustry(e.value)}
          placeholderClassName={styles.placeholder}
          controlClassName={styles.dropdownControl}
          menuClassName={styles.menuClassName}
        />
        <PuzzleDropdown
          options={codeLanguage}
          className={styles.arrowFilter}
          placeholder={'Code language'}
          value={language}
          onChange={(e) => setLanguage(e.value)}
          placeholderClassName={styles.placeholder}
          controlClassName={styles.dropdownControl}
          menuClassName={styles.menuClassName}
        />
        <PuzzleDropdown
          options={companyType}
          className={styles.arrowFilter}
          placeholder={'Company type'}
          value={company}
          onChange={(e) => setCompany(e.value)}
          placeholderClassName={styles.placeholder}
          controlClassName={styles.dropdownControl}
          menuClassName={styles.menuClassName}
        />
      </div>
    </div>
  );
};

export default FilterChat;
