import React, { FC } from "react";
import styles from "./Role.module.css";

type RoleProps = {
  name: string;
  className?: string;
};

const Role: FC<RoleProps> = ({ name, className }) => {
  return <div className={styles.container}>{name}</div>;
};

export default Role;
