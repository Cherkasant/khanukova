import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { NavLink, useLocation } from 'react-router-dom';

import { ChatActiveIcon } from '../../../Assets/Header/Menu/ActiveIcons/ChatActiveIcon';
import { LibraryActiveIcon } from '../../../Assets/Header/Menu/ActiveIcons/LibraryActiveIcon';
import { MyProfileActive } from '../../../Assets/Header/Menu/ActiveIcons/MyProfileActive';
import { NotificationActiveIcon } from '../../../Assets/Header/Menu/ActiveIcons/NotificationActiveIcon';
import { PaymentsActiveIcon } from '../../../Assets/Header/Menu/ActiveIcons/PaymentsActiveIcon';
import { ProjectActiveIcon } from '../../../Assets/Header/Menu/ActiveIcons/ProjectActiveIcon';
import { ChatIcon } from '../../../Assets/Header/Menu/ChatIcon';
import { LibraryIcon } from '../../../Assets/Header/Menu/LibraryIcon';
import { MyProfileIcon } from '../../../Assets/Header/Menu/MyProfileIcon';
import { NotificationIcon } from '../../../Assets/Header/Menu/NotificationIcon';
import { PaymentIcon } from '../../../Assets/Header/Menu/PaymentIcon';
import { ProjectIcon } from '../../../Assets/Header/Menu/ProjectIcon';
import { AddNewProjectIcon } from '../../../Assets/icons/AddNewProjectIcon';
import { ArrayDownIcon } from '../../../Assets/icons/ArrayDownIcon';
import { LogOutIcon } from '../../../Assets/icons/LogOutIcon';
import { ProjectFile } from '../../../Assets/icons/ProjectFile';
import { PathNames } from '../../../Pages/Router/Router';
import { logoutUser } from '../../../Redux/Reducers/authReducer';
import { getAllProjects } from '../../../Redux/Reducers/postReducer';
import authSelectors from '../../../Redux/Selectors/authSelectors';
import postSelector from '../../../Redux/Selectors/postSelector';
import { ProjectType } from '../../../Redux/Types/tasks';

import styles from './Menu.module.css';

const UserMenu = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(authSelectors.getLoggedIn);
  const allProjects = useSelector(postSelector.getAllProjects);
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getAllProjects());
    }
  }, [dispatch, isLoggedIn]);
  const onLogOutClick = () => {
    if (isLoggedIn) {
      dispatch(logoutUser());
      navigate(PathNames.SignIn);
    } else {
      navigate(PathNames.SignIn);
    }
  };
  const [isOpened, setOpened] = useState(false);
  const onArrowClick = () => {
    setOpened(!isOpened);
  };
  const navButtons = [
    {
      name: 'My profile',
      icon: <MyProfileIcon />,
      link: PathNames.Profile,
      activeIcon: <MyProfileActive />
    },
    { name: 'Chats', icon: <ChatIcon />, link: PathNames.Chats, activeIcon: <ChatActiveIcon /> },
    {
      name: 'Projects',
      icon: <ProjectIcon />,
      link: PathNames.Home,
      button: <ArrayDownIcon />,
      active: true,
      activeIcon: <ProjectActiveIcon />
    },
    {
      name: 'New project',
      icon: <AddNewProjectIcon />,
      link: PathNames.ProjectScreen,
      active: isOpened,
      projects: allProjects,
      activeIcon: <AddNewProjectIcon />
    },
    { name: 'Library', icon: <LibraryIcon />, link: '', activeIcon: <LibraryActiveIcon /> },
    { name: 'Payments', icon: <PaymentIcon />, link: PathNames.Payments, activeIcon: <PaymentsActiveIcon /> },
    {
      name: 'Notifications',
      icon: <NotificationIcon />,
      link: PathNames.Notifications,
      activeIcon: <NotificationActiveIcon />
    }
  ];

  return (
    <>
      <div className={styles.container}>
        <div>
          {navButtons.map(({ link, name, icon, button, active, projects, activeIcon }) => (
            <NavLink
              key={name}
              to={link}
              className={classNames(
                styles.navButton,
                {
                  [styles.activeNavButton]: pathname === link
                },
                { [styles.list]: active === false },
                {
                  [styles.projectsMargin]: name === 'Projects' && isOpened
                }
              )}>
              <div>
                <div className={classNames(styles.div)}>
                  {pathname === link ? activeIcon : icon}
                  {name}
                  <div onClick={onArrowClick}>{button}</div>
                </div>
                {projects ? (
                  <div className={styles.projectList}>
                    {projects.map((project: ProjectType) => {
                      return (
                        <div
                          key={project.id}
                          className={styles.projectBlock}
                          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
                            e.preventDefault();
                            navigate(`/project/${project.id}`);
                          }}>
                          <ProjectFile />
                          {project.project_name}
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            </NavLink>
          ))}
        </div>
        <div className={styles.logoutContainer} onClick={onLogOutClick}>
          <LogOutIcon />
          <div className={styles.logout}>{isLoggedIn ? 'Log Out' : 'Sign in'}</div>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
