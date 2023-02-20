import React, { FC } from "react";
import { CompanyList } from "../constants/@types";
import styles from "./CompanyProfile.module.css";
import CompanyProfileCard from "../CompanyProfileCard";

type CompanyProfileProps = {
  activeTab?: CompanyList;
  disabled?: boolean;
  CompanyList: Array<{ name: string; key: CompanyList; answers: string }>;
};

const CompanyProfile: FC<CompanyProfileProps> = ({ CompanyList }) => {
  return (
    <div className={styles.listContainer}>
      {CompanyList.map((card) => {
        return <CompanyProfileCard CardType={card} key={card.key} />;
      })}
    </div>
  );
};

export default CompanyProfile;
