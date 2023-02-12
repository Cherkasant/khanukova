import React, {ChangeEvent, useState} from "react";
import Input from "../../Components/Input";
import styles from "./SignIn.module.css";
import Title from "../../Components/Title";
import {NavLink} from "react-router-dom";
import {PathNames} from "../Router/Router";
import Checkbox from "../../Components/Checkbox";
import {useNavigate} from "react-router";
import {ClosedEyeIcon} from "../../Assets/icons/ClosedEyeIcon";
import {OpenEyeIcon} from "../../Assets/icons/OpenEyeIcon";
import {PasswordTypes} from "../../Components/constants/@types";
import {useDispatch} from "react-redux";
import {signInUser} from "../../Redux/Reducers/authReducer";
import {Button, Form} from "antd";
import PuzzleButton, {PuzzleButtonTypes} from "../../Components/PuzzleButton";

const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onSignIn = (values: any) => {
        dispatch(
            signInUser({
                data: {email: values.email, password: values.password},
                callback: () => {
                    navigate(PathNames.Home);
                },
            })
        );
    };

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [checked, setChecked] = useState(false);
    const [type, setType] = useState(PasswordTypes.Password);
    const onEyeClick = () => {
        type === PasswordTypes.Password
            ? setType(PasswordTypes.Text)
            : setType(PasswordTypes.Password);
    };
    const onChangeCheck = (event: ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };
    return (
        <>
            <div className={styles.container}>
                <div className={styles.test}>
                    <div className={styles.titleBlock}>
                        <Title name={"Login to account"} className={styles.title}/>
                        <div className={styles.subtitle}>
                            {"Please enter your login details to sign in"}
                        </div>
                    </div>
                    <Form onFinish={onSignIn}>
                        <div className={styles.inputs}>
                            <Form.Item name="email"
                            >
                                <Input
                                    type={"email"}
                                    // value={login}
                                    // onChange={(value: string) => setLogin(value)}
                                    placeholder={"Email"}
                                />
                            </Form.Item>
                            <div className={styles.passwordContainer}>
                                <Form.Item name='password'>
                                    <Input
                                        type={type}
                                        // value={password}
                                        // onChange={(value: string) => setPassword(value)}
                                        placeholder={"Password"}
                                    />
                                </Form.Item>
                                <div className={styles.eyeIcon} onClick={onEyeClick}>
                                    {password && type !== "password" ? (
                                        <ClosedEyeIcon/>
                                    ) : (
                                        <OpenEyeIcon/>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className={styles.checkboxContainer}>
                            <Checkbox
                                isChecked={checked}
                                handleChange={onChangeCheck}
                                label={"Remember me"}
                            />

                            <div
                                className={styles.line}
                                onClick={() => navigate(PathNames.PasswordRequestPage)}
                            >
                                Forgot your password?
                            </div>
                        </div>
                        <Button htmlType='submit'>Login</Button>
                        <PuzzleButton htmlType='submit'
                                      btnTitle={"Login"}
                                      btnType={PuzzleButtonTypes.TextButton}
                                      btnClassName={styles.button}
                            // onClick={onSignIn}
                                      btnDisabled={!(login !== "" || password !== "")}
                        />
                    </Form>
                    <div className={styles.info}>
                        {"Don`t have an account?"}
                        <NavLink to={PathNames.SignUp} className={styles.link}>
                            <span>{"Create an Account"}</span>
                        </NavLink>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignIn;