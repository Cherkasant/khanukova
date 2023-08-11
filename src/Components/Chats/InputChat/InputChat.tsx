import classNames from 'classnames';

import Clip from '../../../Assets/Chat/Clip';

import styles from './InputChat.module.css';

type InputChatType = {
  setMessages: React.Dispatch<React.SetStateAction<string>>;
  messagesValue: string;
  disabled: boolean;
};

const InputChat: React.FC<InputChatType> = ({ setMessages, messagesValue, disabled }) => {
  return (
    <div className={classNames(styles.wrap, { [styles.disabled]: disabled })}>
      <Clip />
      <textarea
        value={messagesValue}
        onChange={(e) => setMessages(e.target.value)}
        rows={3}
        className={styles.input}
        placeholder="Write your messages"
      />
    </div>
  );
};

export default InputChat;
