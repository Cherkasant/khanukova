import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

import { ChatsIcon } from '../../../Assets/icons/ChatsIcon'
import { ProjectsIcon } from '../../../Assets/icons/ProjectsIcon'
import { LibraryIcon } from '../../../Assets/icons/LibraryIcon'
import { PaymentsIcon } from '../../../Assets/icons/PaymentsIcon'
import { NotificationsIcon } from '../../../Assets/icons/NotificationsIcon'
import { ArrayDownIcon } from '../../../Assets/icons/ArrayDownIcon'
import { AddNewProjectIcon } from '../../../Assets/icons/AddNewProjectIcon'
import { LogOutIcon } from '../../../Assets/icons/LogOutIcon'
import { logoutUser } from '../../../Redux/Reducers/authReducer'
import authSelectors from '../../../Redux/Selectors/authSelectors'
import postSelector from '../../../Redux/Selectors/postSelector'
import { PathNames } from '../../../Pages/Router/Router'
import { MyProfileIcon } from '../../../Assets/icons/MyProfileIcon'
import { ProjectFile } from '../../../Assets/icons/ProjectFile'
import { getAllProjects } from '../../../Redux/Reducers/postReducer'
import { ProjectType } from '../../../Redux/Types/tasks'

import styles from './Menu.module.css'

const UserMenu = () => {
  const { pathname } = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useSelector(authSelectors.getLoggedIn)
  const allProjects = useSelector(postSelector.getAllProjects)
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getAllProjects())
    }
  }, [isLoggedIn])
  const onLogOutClick = () => {
    if (isLoggedIn) {
      dispatch(logoutUser())
    } else {
      navigate(PathNames.SignIn)
    }
  }
  const [isOpened, setOpened] = useState(false)
  const onArrowClick = () => {
    setOpened(!isOpened)
  }
  const navButtons = [
    { name: 'My profile', icon: <MyProfileIcon />, link: PathNames.Profile },
    { name: 'Chats', icon: <ChatsIcon />, link: '' },
    {
      name: 'Projects',
      icon: <ProjectsIcon />,
      link: PathNames.Home,
      button: <ArrayDownIcon />,
      active: true
    },
    {
      name: 'New project',
      icon: <AddNewProjectIcon />,
      link: PathNames.ProjectScreen,
      active: isOpened,
      projects: allProjects
    },
    { name: 'Library', icon: <LibraryIcon />, link: '' },
    { name: 'Payments', icon: <PaymentsIcon />, link: PathNames.Payments },
    { name: 'Notifications', icon: <NotificationsIcon />, link: PathNames.Notifications }
  ]

  return (
    <>
      <div className={styles.container}>
        <div>
          {navButtons.map(({ link, name, icon, button, active, projects }) => (
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
                  {icon}
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
                            e.preventDefault()
                            navigate(`/project/${project.id}`)
                          }}>
                          <ProjectFile />
                          {project.project_name}
                        </div>
                      )
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
  )
}

export default UserMenu
