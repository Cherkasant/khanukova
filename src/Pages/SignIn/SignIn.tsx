import React, { ChangeEvent, useState } from "react";
import Input from "../../Components/Input";
import Button, { ButtonTypes } from "../../Components/Button";
import styles from "./SignIn.module.css";
import { LinkedinIcon } from "../../Assets/icons/LinkedinIcon";
import { GoogleIcon } from "../../Assets/icons/GoogleIcon";
import Title from "../../Components/Title";
import { NavLink } from "react-router-dom";
import { PathNames } from "../Router/Router";
import Checkbox from "../../Components/Checkbox";

const SignIn = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const onChangeCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.test}>
          <div className={styles.titleBlock}>
            <Title name={"Login to account"} className={styles.title} />
            <div className={styles.subtitle}>
              {"Please enter your login details to sign in"}
            </div>
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
          </div>
          <div className={styles.checkboxContainer}>
            <Checkbox
              isChecked={checked}
              handleChange={onChangeCheck}
              label={"Remember me"}
            />

            <div className={styles.line}>Forgot your password?</div>
          </div>

          <Button
            title={"Login"}
            type={ButtonTypes.TextButton}
            className={styles.button}
            disabled={true}
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
            {"Don`t have an account?"}
            <NavLink to={PathNames.SignUpPageRole} className={styles.link}>
              <span>{"Create an Account"}</span>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
