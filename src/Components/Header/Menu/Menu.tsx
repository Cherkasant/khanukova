import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChatsIcon } from "../../../Assets/icons/ChatsIcon";

import styles from "./Menu.module.css";
import classNames from "classnames";
import { ProjectsIcon } from "../../../Assets/icons/ProjectsIcon";
import { LibraryIcon } from "../../../Assets/icons/LibraryIcon";
import { PaymentsIcon } from "../../../Assets/icons/PaymentsIcon";
import { NotificationsIcon } from "../../../Assets/icons/NotificationsIcon";

const UserMenu = () => {

  const { pathname } = useLocation();
  const navButtons = [
    { name: "Chats", icon: <ChatsIcon />, link: "/" },
    { name: "Projects", icon: <ProjectsIcon />, link: "" },
    { name: "Library", icon: <LibraryIcon />, link: "" },
    { name: "Payments", icon: <PaymentsIcon />, link: "" },
    { name: "Notifications", icon: <NotificationsIcon />, link: "" },
  ];

  return (
    <>
    <div className={styles.container}>
      {navButtons.map(({ link, name, icon }) => {
        return (
          <NavLink
            key={link}
            to={link}
            className={classNames(styles.navButton, {
              [styles.activeNavButton]: pathname === link,
            })}
          >
            {icon}
            {name}
          </NavLink>
        );
      })}
    </div>
  </>
);
};

export default UserMenu;
