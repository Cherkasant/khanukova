import React, {ChangeEvent, useState} from "react";
import "react-dropdown/style.css";
import "react-phone-number-input/style.css";

import "intl-tel-input/build/css/intlTelInput.css";

import Input from "../../../Components/Input";
import Button, {ButtonTypes} from "../../../Components/Button";
import styles from "./SignUpHeadInfo.module.css";
import Title from "../../../Components/Title";
import {PathNames} from "../../Router/Router";
import {registerUser} from "../../../Redux/Reducers/authReducer";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import Checkbox from "../../../Components/Checkbox";

const options = [
    // { value: "productOwner", label: "Product Owner" },
    {value: "ceo", label: "CEO"},
    {value: "cto", label: "CTO"},
    {value: "projectManger", label: "Project Manager"},
    // { value: "designer", label: "Designer" },
    // { value: "qa", label: "QA" },
    // { value: "programmer", label: "Programmer" },
];

const SignUpHeadInfo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

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
                    navigate(PathNames.ActivateUser);
                },
            })
        );
    };

    return (
        <>
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <div className={styles.titleBlock}>
                        <Title name={"Sign up"} className={styles.title}/>
                        <div className={styles.subtitle}>{"Partner's profile"}</div>
                    </div>

                    <div className={styles.infoContainer}>
                        <Input
                            value={""}
                            onChange={onSignUp}
                            title={"1. Company name"}
                            className={styles.input}
                        />
                        <Input
                            value={""}
                            onChange={onSignUp}
                            title={"3. Website domain name"}
                            className={styles.input}
                        />
                        <Input
                            value={""}
                            onChange={onSignUp}
                            title={
                                "4. Tagline (service description in one sentence or mission/vision)*"
                            }
                            className={styles.input}
                        />{" "}
                        <Input
                            value={""}
                            onChange={onSignUp}
                            title={"5. Industries that your clients are coming from*"}
                            className={styles.input}
                        />{" "}
                        <Input
                            value={""}
                            onChange={onSignUp}
                            title={"6. Preferable Software Stack*"}
                            className={styles.input}
                        />
                        <div className={styles.checkboxBlock}>
                            <div className={styles.checkboxBlockTitle}>7. Choose the preferable industries where you
                                have the most successful experience and where the potential clients are expected to come
                                from*
                            </div>
                            <div className={styles.checkboxContainer}>
                                <Checkbox isChecked={false} handleChange={() => {
                                }} label={'Ecommerce'}/><Checkbox isChecked={false} handleChange={() => {
                            }} label={'AI and Machine Learning'}/><Checkbox isChecked={false} handleChange={() => {
                            }} label={'Martech (Marketing Tech'}/><Checkbox isChecked={false} handleChange={() => {
                            }} label={'Live Chat software'}/><Checkbox isChecked={false} handleChange={() => {
                            }} label={'Logistics'}/><Checkbox isChecked={false} handleChange={() => {
                            }} label={'Data Science'}/><Checkbox isChecked={false} handleChange={() => {
                            }} label={'HR Software'}/><Checkbox isChecked={false} handleChange={() => {
                            }} label={'Webinar software'}/><Checkbox isChecked={false} handleChange={() => {
                            }} label={'eLearning'}/><Checkbox isChecked={false} handleChange={() => {
                            }} label={'Cybersecurity'}/><Checkbox isChecked={false} handleChange={() => {
                            }} label={'Augmented Reality'}/><Checkbox isChecked={false} handleChange={() => {
                            }} label={'Project Management software'}/>
                            </div>
                        </div>
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
                </div>
            </div>
        </>
    );
};

export default SignUpHeadInfo;
