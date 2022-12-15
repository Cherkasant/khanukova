import React, { useState } from "react";
import Input from "../../Components/Input";
import Button, { ButtonTypes } from "../../Components/Button";
import styles from "./SignIn.module.css";
import { LinkedinIcon } from "../../Assets/icons/LinkedinIcon";
import { GoogleIcon } from "../../Assets/icons/GoogleIcon";

const SignIn = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>Logo</div>
        <div className={styles.inputs}>
          <Input
            value={login}
            onChange={(value: string) => setLogin(value)}
            placeholder={"Email"}
          ></Input>
          <Input
            value={password}
            onChange={(value: string) => setPassword(value)}
            placeholder={"Password"}
          ></Input>
        </div>

        <div className={styles.line}>Forgot your password?</div>
        <div className={styles.button}>
          <Button title={"Login"} type={ButtonTypes.TextButton}></Button>
        </div>

        <div className={styles.or}>or</div>
        <div className={styles.icons}>
          <Button
            title={<LinkedinIcon></LinkedinIcon>}
            type={ButtonTypes.IconButton}
          ></Button>
          <Button
            title={<GoogleIcon></GoogleIcon>}
            type={ButtonTypes.IconButton}
          ></Button>
        </div>
        <div className={styles.info}>
          {"Don`t have an account?"} <span>{"Sign Up"}</span>{" "}
        </div>
      </div>
    </>
  );
};

export default SignIn;
