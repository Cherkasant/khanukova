import React, { useState } from "react";
import { NotificationsSmallIcon } from "../../Assets/icons/NotificationsSmallIcon";
import { UserIcon } from "../../Assets/icons/UserIcon";
import Button, { ButtonTypes } from "../Button";
import Title from "../Title";
import styles from "./Header.module.css";

const Header = () => {
      return (
      <div className={styles.container}>
            <div className={styles.headerLine}>
            <div className={styles.title}><Title name={"New project"}/></div>
            <div className={styles.iconsContainer}>
                  <Button title={<NotificationsSmallIcon />} type={ButtonTypes.IconButton} className={styles.icon}/>
                  <Button title={<UserIcon />} type={ButtonTypes.IconButton} className={styles.icon}/>
            </div>
            </div>
      </div>
);
};

export default Header;
