import React, { FC } from "react";
import styles from "./Role.module.css";
import classNames from "classnames";

type RoleProps = {
  name: string;
  className?: string;
  onClick?: () => void;
  clicked?: boolean;
};

const Role: FC<RoleProps> = ({ name, className, onClick, clicked }) => {
  return (
    <div
      className={classNames(
        styles.container,
        { [styles.clicked]: clicked },
        className
      )}
      onClick={onClick}
    >
      {name}
    </div>
  );
};

export default Role;
