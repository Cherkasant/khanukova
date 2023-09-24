import classNames from 'classnames';

import styles from './ModalChat.module.css';

type ModalChatType = {
  onSendMessages: () => void;
};

const ModalChat: React.FC<ModalChatType> = ({ onSendMessages }) => {
  return (
    <div className={styles.wrap}>
      <h3 className={styles.title}>Good afternoon!</h3>
      <div className={styles.subTitle}>
        You have successfully registered in the system. Now we help you to organize your work
      </div>
      <div className={styles.innerItem}>
        <div className={styles.itemNum}>1</div>
        <div className={styles.item}>Send a message to a potential Head</div>
      </div>
      <div className={styles.mainText}>
        Good afternoon! I would like to request a commercial offer. Sending you a link to my project. In the tab Clients
        request you can find all necessary information. If you are ineterested in the project, click Approve in the chat
        to start a conversation{' '}
        <a href="#" className={styles.link}>
          https://devteamradar.com/development-teams
        </a>
      </div>
      <button onClick={onSendMessages} className={styles.btn}>
        Send
      </button>
      <div className={styles.innerItem}>
        <div className={classNames(styles.itemNum, styles.itemNumGrey)}>2</div>
        <div className={styles.itemGrey}>Request a quote and approve if you are satisfied</div>
      </div>
      <div className={styles.innerItem}>
        <div className={classNames(styles.itemNum, styles.itemNumGrey)}>3</div>
        <div className={styles.itemGrey}>Request a quote and approve if you are satisfied</div>
      </div>
    </div>
  );
};

export default ModalChat;
