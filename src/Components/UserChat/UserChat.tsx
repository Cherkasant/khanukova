import classNames from 'classnames';

import { AvatarIcon } from '../../Assets/Header/AvatarIcon';

import styles from './UserChat.module.css';

type UserChatType = {
  className?: string;
  name: string;
  team: string;
  onClick: () => void;
};

const UserChat: React.FC<UserChatType> = ({ className, name, team, onClick }) => {
  return (
    <div onClick={onClick} className={classNames(styles.wrapUserChat, className)}>
      <AvatarIcon />
      <div className={styles.inner}>
        <div className={classNames(styles.user, className)}>{name}</div>
        <div className={styles.team}>{team}</div>
      </div>
    </div>
  );
};

export default UserChat;
