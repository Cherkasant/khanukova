import React, { FC, useState } from "react";
import { CompanyList } from "../constants/@types";
import styles from "./CompanyProfile.module.css";
import { EditTitleIcon } from "../../Assets/icons/EditTitleIcon";

type CompanyProfileProps = {
  activeTab?: CompanyList;
  disabled?: boolean;
  CompanyList: Array<{ name: string; key: CompanyList; answers: string }>;
  onChangeList?: (value: string) => void;
};

const CompanyProfile: FC<CompanyProfileProps> = ({ CompanyList }) => {
  const [edit, setEdit] = useState(false);
  const onEditClick = () => {
    setEdit(!edit);
  };

  return (
    <div className={styles.listContainer}>
      {CompanyList.map((list) => {
        return (
          <div key={list.name} className={styles.list}>
            {list.key}
            <textarea
              key={list.answers}
              name={"text"}
              wrap={"soft"}
              className={styles.input}
              defaultValue={list.answers}
              disabled={edit}
            />
            <div className={styles.icon} onClick={onEditClick}>
              <EditTitleIcon />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CompanyProfile;
