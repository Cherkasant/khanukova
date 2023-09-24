import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { useEffect, useState } from 'react';

import { BellIcon } from '../../Assets/Header/BellIcon';
import { UserIcon } from '../../Assets/icons/UserIcon';
import PuzzleButton, { PuzzleButtonTypes } from '../PuzzleButton';
import Title from '../Title';
import UserName from '../UserName';
import authSelectors from '../../Redux/Selectors/authSelectors';
import { PathNames } from '../../Pages/Router/Router';

import notificationSelector from '../../Redux/Selectors/notificationSelector';

import { setProfileNotification } from '../../Redux/Reducers/notificationReducer';
import profileSelectors from '../../Redux/Selectors/profileSelectors';

import styles from './Header.module.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const personalInfoList = useSelector(profileSelectors.getPersonalInfo);
  const webSocketNotifications = useSelector(notificationSelector.getWebSocketNotifications);
  const profileNotifications = useSelector(notificationSelector.getProfileNotifications);
  const isLoggedIn = useSelector(authSelectors.getLoggedIn);
  const userName = useSelector(authSelectors.getUserName);
  const [clickedBell, setClickedBell] = useState(false);
  const fullNotifications = [...profileNotifications, ...webSocketNotifications];
  const onBellClick = () => {
    setClickedBell(true);
    navigate(PathNames.Notifications);
  };

  useEffect(() => {
    if (personalInfoList) {
      dispatch(setProfileNotification(personalInfoList.notification));
    }
  }, [personalInfoList]);

  return (
    <div className={styles.container}>
      <div className={styles.headerLine}>
        <div className={styles.title}>
          <Title name={'Logo'} />
        </div>
        <div className={styles.iconsContainer}>
          <div className={styles.notificationContainer} onClick={onBellClick}>
            <PuzzleButton btnTitle={<BellIcon />} btnType={PuzzleButtonTypes.IconButton} className={styles.iconBell} />
            {fullNotifications.length > 0 && !clickedBell ? (
              <div className={styles.notificationCount}>
                <div className={styles.count}>{fullNotifications?.length}</div>
              </div>
            ) : null}
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
