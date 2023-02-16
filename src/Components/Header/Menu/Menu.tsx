import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChatsIcon } from "../../../Assets/icons/ChatsIcon";
import styles from "./Menu.module.css";
import classNames from "classnames";
import { ProjectsIcon } from "../../../Assets/icons/ProjectsIcon";
import { LibraryIcon } from "../../../Assets/icons/LibraryIcon";
import { PaymentsIcon } from "../../../Assets/icons/PaymentsIcon";
import { NotificationsIcon } from "../../../Assets/icons/NotificationsIcon";
import { ArrayDownIcon } from "../../../Assets/icons/ArrayDownIcon";
import { AddNewProjectIcon } from "../../../Assets/icons/AddNewProjectIcon";
import { LogOutIcon } from "../../../Assets/icons/LogOutIcon";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { logoutUser } from "../../../Redux/Reducers/authReducer";
import authSelectors from "../../../Redux/Selectors/authSelectors";
import { PathNames } from "../../../Pages/Router/Router";
import { MyProfileIcon } from "../../../Assets/icons/MyProfileIcon";

const UserMenu = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(authSelectors.getLoggedIn);

  const onLogOutClick = () => {
    if (isLoggedIn) {
      dispatch(logoutUser());
    } else {
      navigate(PathNames.SignIn);
    }
  };

  const navButtons = [
    { name: "My profile", icon: <MyProfileIcon />, link: PathNames.Profile },
    { name: "Chats", icon: <ChatsIcon />, link: "" },
    {
      name: "Projects",
      icon: <ProjectsIcon />,
      link: PathNames.Home,
      button: <ArrayDownIcon />,
      active: true,
      sublink: PathNames.ProjectScreen,
    },
    { name: "Library", icon: <LibraryIcon />, link: "" },
    { name: "Payments", icon: <PaymentsIcon />, link: PathNames.Payments },
    { name: "Notifications", icon: <NotificationsIcon />, link: "" },
  ];

  const [isOpened, setOpened] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <div>
          {navButtons.map(({ link, name, icon, button, active, sublink }) => (
            <NavLink
              key={name}
              to={link}
              className={classNames(styles.navButton, {
                [styles.activeNavButton]: pathname === link,
              })}
            >
              <div>
                <div className={styles.div}>
                  {icon}
                  {name}
                  <div onClick={() => setOpened(!isOpened)}>{button}</div>
                </div>

                {active ? (
                  <div
                    className={classNames(styles.list, {
                      [styles.listActive]: isOpened,
                    })}
                  >
                    <div
                      className={styles.el}
                      onClick={() => navigate(sublink)}
                    >
                      <AddNewProjectIcon />
                      {"New project"}
                    </div>
                  </div>
                ) : null}
              </div>
            </NavLink>
          ))}
        </div>
        <div className={styles.logoutContainer} onClick={onLogOutClick}>
          <LogOutIcon />
          <div className={styles.logout}>
            {isLoggedIn ? "Log Out" : "Sign in"}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserMenu;
