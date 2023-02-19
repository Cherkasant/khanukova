import React from "react";
import Title from "../../Components/Title";
import styles from "./PasswordRequestPage.module.css";
import Input from "../../Components/Input";
import PuzzleButton, {PuzzleButtonTypes} from "../../Components/PuzzleButton";
import {sendResetEmail} from "../../Redux/Reducers/authReducer";
import {useDispatch} from "react-redux";
import {PathNames} from "../Router/Router";
import {useNavigate} from "react-router";
import {Form} from "antd";

const PasswordRequestPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSend = (value: any) => {
        dispatch(
            sendResetEmail({
                email: value.email,
                callback: () => {
                    navigate(PathNames.CheckNewPassword);
                },
            })
        );
    };
    const [form] = Form.useForm();
    const checkEmail = Form.useWatch("email", form);

    return (
        <div className={styles.container}>
            <div className={styles.paddingContainer}>
                <div className={styles.titleBlock}>
                    <Title name={"Password Request"} className={styles.title}/>
                    <div className={styles.subtitle}>
                        {
                            "We will send instructions how to reset your password to your email address."
                        }
                    </div>
                </div>
                <div className={styles.inputContainer}>
                    <>
                        <Form onFinish={onSend} form={form}>
                            <Form.Item
                                name="email"
                                rules={[
                                    {required: true, message: "Please input your email!"},
                                ]}
                                className={styles.formItem}
                            >
                                <Input type={"email"} placeholder={"Email"}/>
                            </Form.Item>
                            <Form.Item>
                                <PuzzleButton
                                    htmlType="submit"
                                    btnTitle={"Continue"}
                                    btnType={PuzzleButtonTypes.TextButton}
                                    btnDisabled={!checkEmail}
                                    btnClassName={styles.button}
                                />
                            </Form.Item>
                        </Form>
                    </>
                </div>
            </div>
        </div>
    );
};

export default PasswordRequestPage;
