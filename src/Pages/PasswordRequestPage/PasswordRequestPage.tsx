import React, { useState } from "react";
import Title from "../../Components/Title";
import styles from "./PasswordRequestPage.module.css";
import Input from "../../Components/Input";
import Button, { ButtonTypes } from "../../Components/Button";

const PasswordRequestPage = () => {
  const [email, setEmail] = useState("");
  return (
    <div className={styles.container}>
      <div className={styles.paddingContainer}>
        <div className={styles.titleBlock}>
          <Title name={"Password Request"} className={styles.title} />
          <div className={styles.subtitle}>
            {
              "We will send instructions how to reset your password to your email address."
            }
          </div>
        </div>
        <div className={styles.inputContainer}>
          <Input
            required={true}
            type={"email"}
            value={email}
            onChange={(value) => {
              setEmail(value);
            }}
            placeholder={"Email"}
          />
          <Button
            title={"Continue"}
            type={ButtonTypes.TextButton}
            disabled={!email}
          />
        </div>
      </div>
    </div>
  );
};

export default PasswordRequestPage;
