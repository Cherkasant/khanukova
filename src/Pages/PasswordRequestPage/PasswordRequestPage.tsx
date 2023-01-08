import React, { useState } from "react";
import Title from "../../Components/Title";
import styles from "./PasswordRequestPage.module.css";
import Input from "../../Components/Input";
import Button, { ButtonTypes } from "../../Components/Button";
import { sendResetEmail } from "../../Redux/Reducers/authReducer";
import { useDispatch } from "react-redux";

const PasswordRequestPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const [isSent, setSent] = useState(false);

  const onSend = () => {
    dispatch(sendResetEmail({ email, callback: () => setSent(!isSent) }));
  };

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
          {!isSent ? (
            <>
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
                onClick={onSend}
              />
            </>
          ) : (
            <div>
              {
                "Email with instructions on password recovery was sent to the email address you provided." // сделать переход на страницу Востановление пароля- вам отправлено письмо
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PasswordRequestPage;
