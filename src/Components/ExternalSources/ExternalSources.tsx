import { HelpIcon } from '../../Assets/ExternalSources/HelpIcon';

import CardListExternalSources from './CardListExternalSources';

import styles from './ExternalSources.module.css';

const CARD_MOCK = {
  id: 1,
  icon: <HelpIcon />,
  name: 'Google Docs'
};

const MOCK_CARDSLIST = [CARD_MOCK, CARD_MOCK, CARD_MOCK, CARD_MOCK, CARD_MOCK, CARD_MOCK, CARD_MOCK];

const ExternalSources = () => {
  return (
    <div className={styles.container}>
      <div className={styles.containerHelp}>
        <div className={styles.iconHelp}>
          <HelpIcon />
        </div>
        <div className={styles.textHelp}>
          In this tab you can synchronize your accounts with the programs below. You can simple tap on the appropriate
          programm — and the data will be synchronized
        </div>
      </div>

      <div className={styles.containerCards}>
        <CardListExternalSources CardsListExternalSources={MOCK_CARDSLIST} />
      </div>
    </div>
  );
};

export default ExternalSources;
