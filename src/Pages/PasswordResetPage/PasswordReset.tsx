import React, { useState } from "react";
import styles from "./PasswordReset.module.css";
import Title from "../../Components/Title";
import Input from "../../Components/Input";
import Button, { ButtonTypes } from "../../Components/Button";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <Title name={"Reset password"}></Title>
          <div className={styles.description}>
            {"Please enter your new password"}
          </div>
        </div>

        <div className={styles.inputsContainer}>
          <Input
            placeholder={"New password "}
            value={password}
            onChange={(value: string) => setPassword(value)}
          />
          <Input
            placeholder={"Confirm Password "}
            value={passwordConfirm}
            onChange={(value: string) => setPasswordConfirm(value)}
          />

          <Button
            title={"Save new password"}
            type={ButtonTypes.TextButton}
            onClick={() => {}}
            className={styles.button}
          />
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
