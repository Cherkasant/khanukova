import React, { useState } from "react";
import styles from "./PasswordReset.module.css";
import Title from "../../Components/Title";
import Input from "../../Components/Input";

import PuzzleButton, { PuzzleButtonTypes } from "../../Components/PuzzleButton";

import { PasswordTypes } from "../../Components/constants/@types";
import { ClosedEyeIcon } from "../../Assets/icons/ClosedEyeIcon";
import { OpenEyeIcon } from "../../Assets/icons/OpenEyeIcon";

import { useDispatch } from "react-redux";
import { resetPasswordConfirm } from "../../Redux/Reducers/authReducer";
import { useNavigate, useParams } from "react-router";
import { PathNames } from "../Router/Router";
import { Form } from "antd";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { uid, token } = useParams();

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

  const onSetPassword = () => {
    if (uid && token) {
      dispatch(
        resetPasswordConfirm({
          data: {
            uid,
            token,
            new_password: password,
            re_password: passwordConfirm,
          },
          callback: () => navigate(PathNames.SignIn),
        })
      );
    }
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
          <Form>
            <div className={styles.passwordContainer}>
              <Form.Item>
                <Input
                  type={type}
                  placeholder={"New password "}
                  value={password}
                  onChange={(value: string) => setPassword(value)}
                />
              </Form.Item>
              <div className={styles.eyeIcon} onClick={onEyeClick}>
                {password && type !== "password" ? (
                  <ClosedEyeIcon />
                ) : (
                  <OpenEyeIcon />
                )}
              </div>
            </div>

            <div className={styles.passwordContainer}>
              <Form.Item>
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
              </Form.Item>
            </div>
            <Form.Item>
              <PuzzleButton
                btnTitle={"Save new password"}
                btnType={PuzzleButtonTypes.TextButton}
                onClick={onSetPassword}
                btnClassName={styles.button}
                btnDisabled={!(password !== "" && password === passwordConfirm)}
              />
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
