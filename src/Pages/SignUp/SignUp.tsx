import React, { ChangeEvent, useState } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";

import "intl-tel-input/build/css/intlTelInput.css";

import Input from "../../Components/Input";
import Button, { ButtonTypes } from "../../Components/Button";
import styles from "./SignUp.module.css";
import Title from "../../Components/Title";
import { NavLink } from "react-router-dom";
import { PathNames } from "../Router/Router";
import Checkbox from "../../Components/Checkbox";

// const options = [

// ];
const options = [
  { value: "productOwner", label: "Product Owner" },
  { value: "ceo", label: "CEO" },
  { value: "cto", label: "CTO" },
  { value: "projectManger", label: "Project Manager" },
  { value: "designer", label: "Designer" },
  { value: "qa", label: "QA" },
  { value: "programmer", label: "Programmer" },
];

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const onSignUp = () => {};

  const [selectedOption, setSelectedOption] = useState<any>(null);

  const [checked, setChecked] = useState(false);
  const onChangeCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const [value, setValue] = useState<any>();

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
              type={"text"}
              value={fullName}
              onChange={(value: string) => setFullName(value)}
              placeholder={"Full name"}
            />
            <Input
              type={"email"}
              value={email}
              onChange={(value: string) => setEmail(value)}
              placeholder={"Email"}
            />
            <PhoneInput
              placeholder="Enter phone number"
              value={value}
              onChange={setValue}
              className={styles.phoneInput}
            />
            <Dropdown
              options={options}
              onChange={setSelectedOption}
              value={selectedOption}
              placeholder="Role in the project"
              className={styles.dropdownContainer}
              controlClassName={styles.dropdownControl}
              placeholderClassName={styles.dropdownPlaceholder}
              // arrowClassName={styles.dropdownArrow}
              arrowClosed={<span className={styles.arrowClosed} />}
              arrowOpen={<span className={styles.arrowOpen} />}
              menuClassName={styles.dropdownMenu}
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
          <div className={styles.checkboxContainer}>
            <Checkbox
              isChecked={checked}
              handleChange={onChangeCheck}
              label={"I agree "}
            />

            <div className={styles.line}>Terms and Conditions</div>
          </div>
          <Button
            title={"Create an Account"}
            type={ButtonTypes.TextButton}
            className={styles.button}
            onClick={onSignUp}
            disabled={
              !(password !== "" && password === passwordConfirmation) ||
              !checked
            }
          />

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
