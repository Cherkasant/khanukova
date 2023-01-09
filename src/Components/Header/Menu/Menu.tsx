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
    { name: "Chats", icon: <ChatsIcon />, link: "/" },
    {
      name: "Projects",
      icon: <ProjectsIcon />,
      link: "",
      button: <ArrayDownIcon />,
      active: true,
    },
    { name: "Library", icon: <LibraryIcon />, link: "" },
    { name: "Payments", icon: <PaymentsIcon />, link: "" },
    { name: "Notifications", icon: <NotificationsIcon />, link: "" },
  ];

  const [isOpened, setOpened] = useState(false);

  return (
    <>
      <div className={styles.container}>
        <div>
          {navButtons.map(({ link, name, icon, button, active }) => (
            <div>
              <NavLink
                key={link}
                to={link}
                className={classNames(styles.navButton, {
                  [styles.activeNavButton]: pathname === link,
                  [styles.new]: name === "Projects",
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
                      <div className={styles.el}>
                        <div>
                          <AddNewProjectIcon />
                        </div>
                        New project
                      </div>
                    </div>
                  ) : null}
                </div>
              </NavLink>
            </div>
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
