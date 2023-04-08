import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { BellIcon } from '../../Assets/Header/BellIcon';
import { UserIcon } from '../../Assets/icons/UserIcon';
import PuzzleButton, { PuzzleButtonTypes } from '../PuzzleButton';
import Title from '../Title';
import UserName from '../UserName';
import authSelectors from '../../Redux/Selectors/authSelectors';
import { PathNames } from '../../Pages/Router/Router';

import styles from './Header.module.css';

const Header = () => {
  const navigate = useNavigate();
  const hasMessage = true;
  const isLoggedIn = useSelector(authSelectors.getLoggedIn);
  const userName = useSelector(authSelectors.getUserName);

  return (
    <div className={styles.container}>
      <div className={styles.headerLine}>
        <div className={styles.title}>
          <Title name={'Logo'} />
        </div>
        <div className={styles.iconsContainer}>
          <div className={styles.notificationContainer}>
            <PuzzleButton btnTitle={<BellIcon />} btnType={PuzzleButtonTypes.IconButton} className={styles.iconBell} />
            {hasMessage ? <div className={styles.notificationCount}>{''}</div> : null}
          </div>
          {isLoggedIn ? (
            <UserName username={userName} />
          ) : (
            <PuzzleButton
              btnTitle={<UserIcon />}
              btnType={PuzzleButtonTypes.IconButton}
              className={styles.iconUser}
              onClick={() => navigate(PathNames.SignIn)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
