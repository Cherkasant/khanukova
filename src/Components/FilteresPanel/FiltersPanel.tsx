import React, { FC, ReactElement } from "react";
import styles from "./FiltersPanel.module.css";
import { CloseFilterIcon } from "../../Assets/icons/CloseFilterIcon";
import Button, { ButtonTypes } from "../Button";
import { useDispatch } from "react-redux";
import { setFilterVisible } from "../../Redux/Reducers/postReducer";

type FiltersPanelProps = {
  children: ReactElement;
};

const FiltersPanel: FC<FiltersPanelProps> = ({ children }) => {
  const dispatch = useDispatch();
  const onCloseFilterClick = () => {
    dispatch(setFilterVisible(false));
  };
  return (
    <div className={styles.container}>
      <div className={styles.filtersHeader}>
        <div className={styles.headerTitle}>{"Filters"}</div>
        <div className={styles.closeIcon} onClick={onCloseFilterClick}>
          <CloseFilterIcon />
        </div>
      </div>
      <div className={styles.children}>{children}</div>

      <div className={styles.btnContainer}>
        <Button title={"Apply"} type={ButtonTypes.TextButton} />
        <div className={styles.clearBtn}>{"Clear the filter"}</div>
      </div>
    </div>
  );
};

export default FiltersPanel;
