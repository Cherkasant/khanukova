import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MultiSelect } from '@mantine/core';

import { Role } from '../../constants/@types';
import { getAllChatFilter, setCheckFilterChats } from '../../../Redux/Reducers/chatReducer';
import profileSelectors from '../../../Redux/Selectors/profileSelectors';

import { clientsIndustry, codeLanguage, companyType } from './dataFilter';

import styles from './FilterChat.module.css';

const stylesSelect = {
  values: {
    minHeight: '100%',
    margin: 0,
    '&[data-clearable]': {
      margin: 0
    }
  },
  value: {},
  input: {
    border: '1px solid transparent',
    borderRadius: '8px',
    padding: '8px 15px 8px 12px',
    margin: 0,
    width: '161px'
  },
  item: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '20px',
    '&[data-selected]': {
      '&, &:hover': {
        backgroundColor: '#5E96FC',
        color: '#FFFFFF',
        borderRadius: '8px'
      }
    },
    '&[data-hovered]': {
      backgroundColor: '#DEECFF'
    }
  }
};

const FilterChat = () => {
  const dispatch = useDispatch();
  const [industry, setIndustry] = useState<string[]>([]);
  const [language, setLanguage] = useState<string[]>([]);
  const [company, setCompany] = useState<string[]>([]);

  const personalInfoList = useSelector(profileSelectors.getPersonalInfo);

  const resetFilter = () => {
    setIndustry([]);
    setLanguage([]);
    setCompany([]);
  };

  useEffect(() => {
    if (personalInfoList?.role[0] === Role.PO) {
      dispatch(
        getAllChatFilter({
          clients_industry: industry.join(','),
          software_stack: language.join(','),
          industry_choice: company.join(',')
        })
      );
      if (industry.length || language.length || company.length) {
        dispatch(setCheckFilterChats(true));
      } else {
        dispatch(setCheckFilterChats(false));
      }
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
        <MultiSelect
          placeholder={'Clients industry'}
          value={industry}
          data={clientsIndustry}
          onChange={(e) => setIndustry(e)}
          styles={stylesSelect}
          transitionProps={{ duration: 150, transition: 'pop-top-left', timingFunction: 'ease' }}
          maxSelectedValues={6}
        />
        <MultiSelect
          placeholder={'Code language'}
          value={language}
          data={codeLanguage}
          onChange={(e) => setLanguage(e)}
          styles={stylesSelect}
          transitionProps={{ duration: 150, transition: 'pop-top-left', timingFunction: 'ease' }}
          maxSelectedValues={6}
        />
        <MultiSelect
          placeholder={'Company type'}
          value={company}
          data={companyType}
          onChange={(e) => setCompany(e)}
          styles={stylesSelect}
          transitionProps={{ duration: 150, transition: 'pop-top-left', timingFunction: 'ease' }}
          maxSelectedValues={6}
        />
      </div>
    </div>
  );
};

export default FilterChat;
