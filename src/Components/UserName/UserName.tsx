import { FC } from 'react';
import { useNavigate } from 'react-router';

import { AvatarIcon } from '../../Assets/Header/AvatarIcon';
import PuzzleButton, { PuzzleButtonTypes } from '../PuzzleButton';
import { PathNames } from '../../Pages/Router/Router';

import styles from './UserName.module.css';

type UserNameProps = {
  username?: string
}

const UserName: FC<UserNameProps> = ({ username }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <PuzzleButton
        btnTitle={<AvatarIcon />}
        btnType={PuzzleButtonTypes.IconButton}
        btnClassName={styles.avatar}
        onClick={() => navigate(PathNames.ProfileDevTeam)}
      />
      {username}
    </div>
  );
};

export default UserName;
