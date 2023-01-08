import React from "react";
import { BellIcon } from "../../Assets/icons/BellIcon";
import { UserIcon } from "../../Assets/icons/UserIcon";
import Button, { ButtonTypes } from "../Button";
import Title from "../Title";
import styles from "./Header.module.css";
import UserName from "../UserName";
import { useSelector } from "react-redux";
import authSelectors from "../../Redux/Selectors/authSelectors";

const Header = () => {
  const hasMessage = true;
  const isLoggedIn = useSelector(authSelectors.getLoggedIn);

  return (
    <div className={styles.container}>
      <div className={styles.headerLine}>
        <div className={styles.title}>
          <Title name={"Logo"} />
        </div>
        <div className={styles.iconsContainer}>
          <div className={styles.notificationContainer}>
            <Button
              title={<BellIcon />}
              type={ButtonTypes.IconButton}
              className={styles.iconBell}
            />
            {hasMessage && <div className={styles.notificationCount}></div>}
          </div>
          {isLoggedIn ? (
            <UserName username={"Irina Ivanova"}></UserName>
          ) : (
            <Button
              title={<UserIcon />}
              type={ButtonTypes.IconButton}
              className={styles.iconUser}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
