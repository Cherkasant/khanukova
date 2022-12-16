import React, { FC } from "react";
import styles from "./Role.module.css";
import classNames from "classnames";
import { Roles } from "../constants/@types";

type RoleProps = {
  activeRole: Roles;
  onClickedRole: (role: Roles) => void;
  rolesList: Array<{ name: string; key: Roles }>;
};

const Role: FC<RoleProps> = ({ activeRole, rolesList, onClickedRole }) => {
  return (
    <div className={styles.formContainer}>
      {rolesList.map((role) => {
        return (
          <div
            key={role.key}
            onClick={() => onClickedRole(role.key)}
            className={classNames(styles.container, {
              [styles.clicked]: role.key === activeRole,
            })}
          >
            {role.name}
          </div>
        );
      })}
    </div>
  );
};

export default Role;
