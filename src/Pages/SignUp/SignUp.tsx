import React, { useState } from "react";
import Input from "../../Components/Input";
import Button, { ButtonTypes } from "../../Components/Button";
import styles from "./SignUp.module.css";
import { LinkedinIcon } from "../../Assets/icons/LinkedinIcon";
import { GoogleIcon } from "../../Assets/icons/GoogleIcon";
import Title from "../../Components/Title";
import { NavLink } from "react-router-dom";
import { PathNames } from "../Router/Router";

const SignUp = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const onSignUp = () => {};

  return (
    <>
      <div className={styles.container}>
        <div className={styles.test}>
          <div className={styles.titleBlock}>
            <Title name={"Sign up"} className={styles.title} />
            <div className={styles.subtitle}>{"Let’s get started"}</div>
          </div>

          <div className={styles.inputs}>
            <Input
              type={"email"}
              value={login}
              onChange={(value: string) => setLogin(value)}
              placeholder={"Email"}
            />
            <Input
              type={"password"}
              value={password}
              onChange={(value: string) => setPassword(value)}
              placeholder={"Password"}
            />
            <Input
              type={"password"}
              value={passwordConfirmation}
              onChange={(value: string) => setPasswordConfirmation(value)}
              placeholder={"Confirm password"}
            />
          </div>
          <Button
            title={"Create an Account"}
            type={ButtonTypes.TextButton}
            className={styles.button}
            onClick={onSignUp}
            disabled={!(password !== "" && password === passwordConfirmation)}
          />
          <div className={styles.lineBlock}>
            <div className={styles.straightLine}></div>
            <div className={styles.or}>or</div>
            <div className={styles.straightLine}></div>
          </div>

          <div className={styles.icons}>
            <Button title={<LinkedinIcon />} type={ButtonTypes.IconButton} />
            <Button title={<GoogleIcon />} type={ButtonTypes.IconButton} />
          </div>
          <div className={styles.info}>
            {"Have an account?"}
            <NavLink to={PathNames.SignIn} className={styles.link}>
              <span>{"Sign in"}</span>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
