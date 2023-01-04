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
import { PasswordTypes } from "../../Components/constants/@types";
import { ClosedEyeIcon } from "../../Assets/icons/ClosedEyeIcon";
import { OpenEyeIcon } from "../../Assets/icons/OpenEyeIcon";
import { registerUser } from "../../Redux/Reducers/authReducer";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

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

  const [selectedOption, setSelectedOption] = useState<any>(null);

  const [checked, setChecked] = useState(false);
  const onChangeCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const [value, setValue] = useState<any>();

  const onSignUp = () => {
    dispatch(
      registerUser({
        data: {
          full_name: fullName,
          email: email,
          phone: value,
          user_status: selectedOption.label,
          password: password,
          password_rep: passwordConfirmation,
        },
        callback: () => {
          navigate(PathNames.SignUpPageRole);
        },
      })
    );
  };

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
              arrowClassName={styles.dropdownArrow}
              arrowClosed={<span className={styles.arrowClosed} />}
              arrowOpen={<span className={styles.arrowOpen} />}
              menuClassName={styles.dropdownMenu}
            />
            <div className={styles.passwordContainer}>
              <Input
                type={type}
                value={password}
                onChange={(value: string) => setPassword(value)}
                placeholder={"Password"}
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
                value={passwordConfirmation}
                onChange={(value: string) => setPasswordConfirmation(value)}
                placeholder={"Confirm password"}
              />
              <div className={styles.eyeIcon} onClick={onEyeClickConfirm}>
                {passwordConfirmation && typeConfirm !== "password" ? (
                  <ClosedEyeIcon />
                ) : (
                  <OpenEyeIcon />
                )}
              </div>
            </div>
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
