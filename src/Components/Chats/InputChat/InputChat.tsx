import Clip from '../../../Assets/Chat/Clip';

import styles from './InputChat.module.css';
const InputChat = () => {
  return (
    <div className={styles.wrap}>
      <Clip />
      <input className={styles.input} type="text" placeholder="Write your messages" />
    </div>
  );
};

export default InputChat;
