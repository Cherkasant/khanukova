import { useState } from 'react';

import { Collapse } from 'antd';

import classNames from 'classnames';

import Input from '../../Components/Input';
import InputChat from '../../Components/Chats/InputChat';
import PuzzleButton, { PuzzleButtonTypes } from '../../Components/PuzzleButton';
import { SearchIcon } from '../../Assets/icons/SearchIcon';
import UserChat from '../../Components/UserChat/UserChat';
import Quote from '../../Assets/Chat/Quote';
import More from '../../Assets/Chat/More';

import styles from './Chats.module.css';

const { Panel } = Collapse;

const mocUser = [
  {
    id: 1,
    name: 'Pavel',
    team: 'Capix'
  },
  {
    id: 2,
    name: 'Ivan',
    team: 'MaxinAI'
  },
  {
    id: 3,
    name: 'Pit',
    team: 'Powercode.co.uk'
  },
  {
    id: 4,
    name: 'Apkadii',
    team: 'Artkai.ai'
  }
];

const Chats = () => {
  const [inputSearch, setInputSearch] = useState('');
  const [userId, setUserId] = useState(0);
  const onChange = (value: string) => {
    setInputSearch(value);
  };
  return (
    <div className={styles.wrapChats}>
      <div className={styles.panelChats}>
        <h3 className={styles.title}>{'Chats'}</h3>
        <div className={styles.searchContainer}>
          <Input value={inputSearch} onChange={onChange} placeholder={'Seacrh'} className={styles.searchInput} />
          <div className={styles.icon}>
            <SearchIcon />
          </div>
        </div>
        <div className={styles.filters}>{'Filters'}</div>
        <div className={styles.panelChatsInner}>
          <div className={styles.panelChatsFilters}>
            <Collapse bordered={false} className={styles.collapseContainer} expandIconPosition={'end'}>
              <Panel
                header="Clients Industry"
                key="1"
                className={styles.panel}
                style={{ borderBottom: '1px solid #0e4298' }}></Panel>
              <Panel
                header="Code language name"
                key="2"
                className={styles.panel}
                style={{ borderBottom: '1px solid #0e4298' }}></Panel>
              <Panel header="Company type" key="3" className={styles.panel}></Panel>
            </Collapse>
          </div>
          <div className={styles.panelChatsUsers}>
            {mocUser.map((value, index) => (
              <UserChat
                onClick={() => setUserId(value.id)}
                key={index}
                name={value.name}
                team={value.team}
                className={classNames({
                  [styles.active]: value.id === userId,
                  [styles.activeTitle]: value.id === userId
                })}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.chats}>
        <div className={styles.chatsHeader}>
          <UserChat name={'Pavel'} team={'CAPIX'} />
          <div className={styles.chatsPanel}>
            <div className={styles.quote}>
              <Quote /> {'Request a quote'}
            </div>
            <PuzzleButton
              btnDisabled
              btnClassName={styles.btn}
              btnTitle={'Launch a project'}
              btnType={PuzzleButtonTypes.TextButton}
            />
            <PuzzleButton
              btnDisabled
              btnClassName={styles.btn}
              btnTitle={'Create a Meeting'}
              btnType={PuzzleButtonTypes.TextButton}
            />
            <More className={styles.more} />
          </div>
        </div>
        <div className={styles.chatsMain}></div>
        <div className={styles.chatsFooter}>
          <InputChat />
          <PuzzleButton btnTitle={'Send'} btnType={PuzzleButtonTypes.TextButton} />
        </div>
      </div>
    </div>
  );
};

export default Chats;
