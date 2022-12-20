import React, { useState } from "react";
import Role from "../../Components/Role";
import RegisterContainer from "../../Components/RegisterContainer";
import styles from "./RegistrationRolePage.module.css";
import Button, { ButtonTypes } from "../../Components/Button";
import { useNavigate } from "react-router";
import { PathNames } from "../Router/Router";
import { Roles } from "../../Components/constants/@types";

const ROLES_NAMES = [
  { name: "Product Owner", key: Roles.ProductOwner },
  { name: "CEO", key: Roles.CEO },
  { name: "CTO", key: Roles.CTO },
  { name: "Project Manager", key: Roles.ProjectManager },
  { name: "Designer ", key: Roles.Designer },
  { name: "QA ", key: Roles.QA },
  { name: "Programmer", key: Roles.Programmer },
];

const RegistrationRolePage = () => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(true);
  const [role, setRole] = useState(Roles.default);
  const onClickRole = (newRole: Roles) => {
    if (newRole !== role) {
      setRole(newRole);
    } else setRole(Roles.default);
    activeButton ? setActiveButton(false) : setActiveButton(true);
  };

  return (
    <RegisterContainer title={"Choose your role in the project"}>
      <>
        <Role
          activeRole={role}
          onClickedRole={onClickRole}
          rolesList={ROLES_NAMES}
        />
        <div className={styles.buttonContainer}>
          <Button
            title={"Next"}
            type={ButtonTypes.TextButton}
            disabled={activeButton}
            className={styles.button}
            onClick={() => navigate(PathNames.SignUpPageInfo)}
          />
        </div>
      </>
    </RegisterContainer>
  );
};

export default RegistrationRolePage;
