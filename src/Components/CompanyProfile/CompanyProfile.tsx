import React, { FC, useEffect } from "react";
import { CompanyList } from "../constants/@types";
import styles from "./CompanyProfile.module.css";
import CompanyProfileCard from "../CompanyProfileCard";
import { useDispatch, useSelector } from "react-redux";
import TabsListProfile from "../TabsListProfile";
import profileSelectors from "../../Redux/Selectors/profileSelectors";
import { getPoCompanyListReducer } from "../../Redux/Reducers/profileReducer";

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
