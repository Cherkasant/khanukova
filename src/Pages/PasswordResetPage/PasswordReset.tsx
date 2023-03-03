import React, {useState} from "react";
import styles from "./PasswordReset.module.css";
import Title from "../../Components/Title";
import Input from "../../Components/Input";

import PuzzleButton, {PuzzleButtonTypes} from "../../Components/PuzzleButton";

import {PasswordTypes} from "../../Components/constants/@types";
import {ClosedEyeIcon} from "../../Assets/icons/ClosedEyeIcon";
import {OpenEyeIcon} from "../../Assets/icons/OpenEyeIcon";

import {useDispatch} from "react-redux";
import {resetPasswordConfirm} from "../../Redux/Reducers/authReducer";
import {useNavigate, useParams} from "react-router";
import {PathNames} from "../Router/Router";
import {Form} from "antd";
import {NavLink} from "react-router-dom";

const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {uid, token} = useParams();

    const [form] = Form.useForm();
    const checkPassword = Form.useWatch("password", form);
    const checkPasswordConfirm = Form.useWatch("passwordNew", form);
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

    const onSetPassword = (values: any) => {
        if (uid && token) {
            dispatch(
                resetPasswordConfirm({
                    data: {
                        uid,
                        token,
                        new_password: values.password,
                        re_password: values.passwordNew,
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
                    <Title name={"Reset password"}/>
                    <div className={styles.description}>
                        {"Please enter your new password"}
                    </div>
                </div>
                <Form onFinish={onSetPassword} className={styles.form} form={form} initialValues={{ password: "", passwordNew: "" }}>
                    <div className={styles.inputsContainer}>
                        <div className={styles.passwordContainer}>
                            <Form.Item name="password" className={styles.formItem} rules={[
                                {required: true, message: "Please input your new password!"},
                            ]}>
                                <Input
                                    type={type}
                                    placeholder={"New password "}
                                    value={checkPassword}
                                />
                            </Form.Item>
                            <div className={styles.eyeIcon} onClick={onEyeClick}>
                                {checkPassword && type !== "password" ? (
                                    <ClosedEyeIcon/>
                                ) : (
                                    <OpenEyeIcon/>
                                )}
                            </div>
                        </div>

                        <div className={styles.passwordContainer}>
                            <Form.Item name="passwordNew" className={styles.formItem} rules={[
                                {required: true, message: "Please repeat your new password!"},
                            ]}>
                                <Input
                                    type={typeConfirm}
                                    placeholder={"Confirm Password "}
                                    value={checkPasswordConfirm}
                                />
                            </Form.Item>
                            <div className={styles.eyeIcon} onClick={onEyeClickConfirm}>
                                {checkPasswordConfirm && typeConfirm !== "password" ? (
                                    <ClosedEyeIcon/>
                                ) : (
                                    <OpenEyeIcon/>
                                )}
                            </div>
                        </div>
                        <Form.Item className={styles.formItem}>
                            <PuzzleButton
                                htmlType="submit"
                                btnTitle={"Save new password"}
                                btnType={PuzzleButtonTypes.TextButton}
                                btnClassName={styles.button}
                                btnDisabled={
                                    !(checkPassword && checkPasswordConfirm) ||
                                    !(checkPassword === checkPasswordConfirm)
                                }
                            />
                        </Form.Item>
                    </div>
                </Form>
                <div className={styles.info}>
                    {"Have an account?"}
                    <NavLink to={PathNames.SignIn} className={styles.link}>
                        <span>{"Sign in"}</span>
                    </NavLink>
                </div>
            </div>
        </>
    );
};

export default ResetPassword;
