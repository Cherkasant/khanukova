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

const UserMenu = () => {

  const { pathname } = useLocation();

  const navButtons = [
    { name: "Chats", icon: <ChatsIcon />, link: "/" },
    { name: "Projects", icon: <ProjectsIcon />, link: "", button: <ArrayDownIcon />, active: true },
    { name: "Library", icon: <LibraryIcon />, link: "" },
    { name: "Payments", icon: <PaymentsIcon />, link: "" },
    { name: "Notifications", icon: <NotificationsIcon />, link: "" },
  ];

  const [isOpened, setOpened] = useState(false);

  console.log(isOpened)

  return (
    <>
    <div className={styles.container}>

      {navButtons.map(({ link, name, icon, button, active }) =>
      
        <div>

          <NavLink

            key={link}
            to={link}
            className={classNames(styles.navButton, {
              [styles.activeNavButton]: pathname === link,
              [styles.new]: name === "Projects"
            })}
            
          >
            <div>

            <div className={styles.div}>
              {icon}
              {name}
              <div
              onClick={() => setOpened(!isOpened)}
              >{button}</div>
            </div>

            {active? <div className={classNames(styles.list, {[styles.listActive]:isOpened})}>
              <div className={styles.el}> <div><AddNewProjectIcon /></div>New project</div>
              </div> : null}
            </div>
            
            

          </NavLink>

        </div>)}

      
    </div>
  </>
);
};

export default UserMenu;
