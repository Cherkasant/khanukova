import React, { FC } from "react";
import { CompanyList } from "../constants/@types";
import styles from "./CompanyProfile.module.css";
import { EditTitleIcon } from "../../Assets/icons/EditTitleIcon";

type CompanyProfileProps = {
  activeTab?: CompanyList;
  onSelectIcon?: (tab: CompanyList) => void;
  disabled?: boolean;
  CompanyList: Array<{ name: string; key: CompanyList }>;
};

const CompanyProfile: FC<CompanyProfileProps> = ({
  onSelectIcon,
  CompanyList,
}) => {
  return (
    <div className={styles.listContainer}>
      {CompanyList.map((list) => {
        return (
          <div key={list.name} className={styles.list}>
            {list.key}
            <input type={"text"} className={styles.input} />
            <EditTitleIcon />
          </div>
        );
      })}
    </div>
  );
};

export default CompanyProfile;
