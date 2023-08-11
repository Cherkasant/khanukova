import PuzzleDropdown from '../../PuzzleDropdown';

import styles from './FilterChat.module.css';
import { clientsIndustry, codeLanguage, companyType } from './dataFilter';

type FilterChatType = {
  industry: string;
  language: string;
  company: string;
  setIndustry: React.Dispatch<React.SetStateAction<string>>;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  setCompany: React.Dispatch<React.SetStateAction<string>>;
};

const FilterChat: React.FC<FilterChatType> = ({
  industry,
  language,
  company,
  setIndustry,
  setLanguage,
  setCompany
}) => {
  return (
    <div className={styles.wrap}>
      <h2>Filters</h2>
      <div className={styles.innerFilters}>
        <PuzzleDropdown
          options={clientsIndustry}
          className={styles.arrowFilter}
          placeholder={'Clients industry'}
          value={industry}
          onChange={(e) => setIndustry(e.value)}
          placeholderClassName={styles.placeholder}
          controlClassName={styles.dropdownControl}
          menuClassName={styles.menuClassName}
        />
        <PuzzleDropdown
          options={codeLanguage}
          className={styles.arrowFilter}
          placeholder={'Code language'}
          value={language}
          onChange={(e) => setLanguage(e.value)}
          placeholderClassName={styles.placeholder}
          controlClassName={styles.dropdownControl}
          menuClassName={styles.menuClassName}
        />
        <PuzzleDropdown
          options={companyType}
          className={styles.arrowFilter}
          placeholder={'Company type'}
          value={company}
          onChange={(e) => setCompany(e.value)}
          placeholderClassName={styles.placeholder}
          controlClassName={styles.dropdownControl}
          menuClassName={styles.menuClassName}
        />
      </div>
    </div>
  );
};

export default FilterChat;
