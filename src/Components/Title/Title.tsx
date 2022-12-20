import React, { FC } from "react";

import styles from "./Title.module.css";
import classnames from "classnames";

type TitleProps = {
  name: string;
  className?: string;
};

const Title: FC<TitleProps> = ({ name, className }) => {
  return <div className={classnames(className, styles.container)}>{name}</div>;
};

export default Title;
