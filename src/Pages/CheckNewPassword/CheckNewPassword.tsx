import React from "react";
import styles from "./CheckNewPassword.module.css";
import Title from "../../Components/Title";
import { NavLink } from "react-router-dom";
import { PathNames } from "../Router/Router";

const CheckNewPassword = () => {
  return (
    <>
      <div className={styles.container}>
        <Title name={"Check your email"} className={styles.title} />
        <div className={styles.subTitle}>
          {
            "Email with instructions on password recovery was sent to the email address you provided."
          }
        </div>
        <div className={styles.description}>
          {"Please follow the link in the email to recover your password."}
        </div>
        <div className={styles.info}>
          {"The letter didn’t arrive?"}
          <NavLink to={PathNames.PasswordRequestPage} className={styles.link}>
            <span>{"Resend the email"}</span>
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default CheckNewPassword;
