import React, { useState } from "react";
import styles from "./PasswordReset.module.css";
import Title from "../../Components/Title";
import Input from "../../Components/Input";

import Button, { ButtonTypes } from "../../Components/Button";

import { PasswordTypes } from "../../Components/constants/@types";
import { ClosedEyeIcon } from "../../Assets/icons/ClosedEyeIcon";
import { OpenEyeIcon } from "../../Assets/icons/OpenEyeIcon";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const [type, setType] = useState(PasswordTypes.Password);
  const onEyeClick = () => {
    type === PasswordTypes.Password
      ? setType(PasswordTypes.Text)
      : setType(PasswordTypes.Password);
  };
  const [typeConfirm, setTypeConfirm] = useState(PasswordTypes.Password);
  const onEyeClickConfirm = () => {
    typeConfirm === PasswordTypes.Password
      ? setTypeConfirm(PasswordTypes.Text)
      : setTypeConfirm(PasswordTypes.Password);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <Title name={"Reset password"} />
          <div className={styles.description}>
            {"Please enter your new password"}
          </div>
        </div>

        <div className={styles.inputsContainer}>
          <div className={styles.passwordContainer}>
            <Input
              type={type}
              placeholder={"New password "}
              value={password}
              onChange={(value: string) => setPassword(value)}
            />

            <div className={styles.eyeIcon} onClick={onEyeClick}>
              {password && type !== "password" ? (
                <ClosedEyeIcon />
              ) : (
                <OpenEyeIcon />
              )}
            </div>
          </div>

          <div className={styles.passwordContainer}>
            <Input
              type={typeConfirm}
              placeholder={"Confirm Password "}
              value={passwordConfirm}
              onChange={(value: string) => setPasswordConfirm(value)}
            />
            <div className={styles.eyeIcon} onClick={onEyeClickConfirm}>
              {passwordConfirm && typeConfirm !== "password" ? (
                <ClosedEyeIcon />
              ) : (
                <OpenEyeIcon />
              )}
            </div>
          </div>

          <Button
            title={"Save new password"}
            type={ButtonTypes.TextButton}
            onClick={() => {}}
            className={styles.button}
            disabled={!(password !== "" && password === passwordConfirm)}
          />
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
