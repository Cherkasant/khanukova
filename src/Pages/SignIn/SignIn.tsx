import React, { useState } from "react";
import Input from "../../Components/Input";
import Button, { ButtonTypes } from "../../Components/Button";
import styles from "./SignIn.module.css";
import { LinkedinIcon } from "../../Assets/icons/LinkedinIcon";
import { GoogleIcon } from "../../Assets/icons/GoogleIcon";
import Title from "../../Components/Title";
import { NavLink } from "react-router-dom";
import { PathNames } from "../Router/Router";

const SignIn = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  return (
    <>
      <div className={styles.container}>
        <div className={styles.title}>
          <Title name={"Logo"} />
        </div>
        <div className={styles.inputs}>
          <Input
            value={login}
            onChange={(value: string) => setLogin(value)}
            placeholder={"Email"}
          />
          <Input
            value={password}
            onChange={(value: string) => setPassword(value)}
            placeholder={"Password"}
          />
        </div>

        <div className={styles.line}>Forgot your password?</div>
        <div className={styles.button}>
          <Button title={"Login"} type={ButtonTypes.TextButton} />
        </div>

        <div className={styles.or}>or</div>
        <div className={styles.icons}>
          <Button title={<LinkedinIcon />} type={ButtonTypes.IconButton} />
          <Button title={<GoogleIcon />} type={ButtonTypes.IconButton} />
        </div>
        <div className={styles.info}>
          {"Don`t have an account?"}
          <NavLink to={PathNames.SignUpPageRole}>
            <span>{"Sign Up"}</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default SignIn;
