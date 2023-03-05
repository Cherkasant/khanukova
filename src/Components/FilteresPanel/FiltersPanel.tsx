import React, { FC, ReactElement } from "react";
import styles from "./FiltersPanel.module.css";
import { CloseFilterIcon } from "../../Assets/icons/CloseFilterIcon";
import { useDispatch, useSelector } from "react-redux";
import { setFilterVisible } from "../../Redux/Reducers/postReducer";
import PuzzleButton, { PuzzleButtonTypes } from "../PuzzleButton";
import classNames from "classnames";
import postSelector from "../../Redux/Selectors/postSelector";

type FiltersPanelProps = {
  children: ReactElement;
};

const FiltersPanel: FC<FiltersPanelProps> = ({ children }) => {
  const dispatch = useDispatch();
  const onCloseFilterClick = () => {
    dispatch(setFilterVisible(false));
  };
  const isFilterVisible = useSelector(postSelector.getFilter);

  return (
    <div
      className={classNames(styles.container, {
        [styles.activeModal]: isFilterVisible,
      })}
    >
      <div className={styles.filtersHeader}>
        <div className={styles.headerTitle}>{"Filters"}</div>
        <div className={styles.closeIcon} onClick={onCloseFilterClick}>
          <CloseFilterIcon />
        </div>
      </div>
      <div className={styles.children}>{children}</div>

      <div className={styles.btnContainer}>
        <PuzzleButton
          btnTitle={"Apply"}
          btnType={PuzzleButtonTypes.TextButton}
        />
        <div className={styles.clearBtn}>{"Clear the filter"}</div>
      </div>
    </div>
  );
};

export default FiltersPanel
