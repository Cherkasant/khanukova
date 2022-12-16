import React, { useState } from "react";
import Role from "../../Components/Role";
import RegisterContainer from "../../Components/RegisterContainer";
import styles from "./RegistrationRolePage.module.css";
import Button, { ButtonTypes } from "../../Components/Button";
import { useNavigate } from "react-router";
import { PathNames } from "../Router/Router";

const RegistrationRolePage = () => {
  const navigate = useNavigate();
  const [activeButton, setActiveButton] = useState(true);
  const onClickRole = () => {
    activeButton ? setActiveButton(false) : setActiveButton(true);
  };

  return (
    <RegisterContainer title={"Выберете вашу роль в проекте"}>
      <>
        <div className={styles.formContainer}>
          <Role name={"Product Owner"} onClick={onClickRole} />
          <Role name={"CEO"} onClick={onClickRole} />
          <Role name={"CTO"} onClick={onClickRole} />
          <Role name={"Project Manager"} onClick={onClickRole} />
          <Role name={"Designer"} onClick={onClickRole} />
          <Role name={"QA"} onClick={onClickRole} />
          <Role name={"Programmer"} onClick={onClickRole} />
        </div>

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
