import React, {ChangeEvent, useState} from "react";

import {UploadOutlined} from '@ant-design/icons';
import type {UploadProps} from 'antd';
import {Button, message, Upload} from 'antd';
import Input from "../../../Components/Input";
import PuzzleButton, {ButtonTypes} from "../../../Components/PuzzleButton";
import styles from "./SignUpHeadInfo.module.css";
import Title from "../../../Components/Title";
import {PathNames} from "../../Router/Router";
import {registerUser} from "../../../Redux/Reducers/authReducer";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import Checkbox from "../../../Components/Checkbox";


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
    const props: UploadProps = {
        beforeUpload: (file) => {
            const isPNG = file.type === 'image/png';
            const isJPG = file.type === 'image/jpg';
            if (!isPNG && !isJPG) {
                message.error(`${file.name} is not a png or jpg file`);
            }
            return isPNG || isJPG || Upload.LIST_IGNORE;
        },
        onChange: (info) => {
            console.log(info.fileList);
        },
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
                        <div className={styles.uploadContainer}>
                            <div className={styles.uploadContainerTitle}>
                                2. Logo company - 300x300, png or jpg, white background*
                            </div>
                            <Upload {...props}>
                                <Button icon={<UploadOutlined/>}>Add a file</Button>
                            </Upload>
                        </div>
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
                        />
                        <Input
                            value={""}
                            onChange={onSignUp}
                            title={"5. Industries that your clients are coming from*"}
                            className={styles.input}
                        />
                        <Input
                            value={""}
                            onChange={onSignUp}
                            title={"6. Preferable Software Stack*"}
                            className={styles.input}
                        />
                        <div className={styles.checkboxBlock}>
                            <div className={styles.checkboxBlockTitle}>
                                7. Choose the preferable industries where you have the most
                                successful experience and where the potential clients are
                                expected to come from*
                            </div>
                            <div className={styles.checkboxContainer}>
                                <Checkbox
                                    isChecked={false}
                                    handleChange={() => {
                                    }}
                                    label={"Ecommerce"}
                                />
                                <Checkbox
                                    isChecked={false}
                                    handleChange={() => {
                                    }}
                                    label={"AI and Machine Learning"}
                                />
                                <Checkbox
                                    isChecked={false}
                                    handleChange={() => {
                                    }}
                                    label={"Martech (Marketing Tech"}
                                />
                                <Checkbox
                                    isChecked={false}
                                    handleChange={() => {
                                    }}
                                    label={"Live Chat software"}
                                />
                                <Checkbox
                                    isChecked={false}
                                    handleChange={() => {
                                    }}
                                    label={"Logistics"}
                                />
                                <Checkbox
                                    isChecked={false}
                                    handleChange={() => {
                                    }}
                                    label={"Data Science"}
                                />
                                <Checkbox
                                    isChecked={false}
                                    handleChange={() => {
                                    }}
                                    label={"HR Software"}
                                />
                                <Checkbox
                                    isChecked={false}
                                    handleChange={() => {
                                    }}
                                    label={"Webinar software"}
                                />
                                <Checkbox
                                    isChecked={false}
                                    handleChange={() => {
                                    }}
                                    label={"eLearning"}
                                />
                                <Checkbox
                                    isChecked={false}
                                    handleChange={() => {
                                    }}
                                    label={"Cybersecurity"}
                                />
                                <Checkbox
                                    isChecked={false}
                                    handleChange={() => {
                                    }}
                                    label={"Augmented Reality"}
                                />
                                <Checkbox
                                    isChecked={false}
                                    handleChange={() => {
                                    }}
                                    label={"Project Management software"}
                                />
                                <Checkbox
                                    isChecked={false}
                                    handleChange={() => {
                                    }}
                                    label={"Fintech"}
                                />
                                <Checkbox
                                    isChecked={false}
                                    handleChange={() => {
                                    }}
                                    label={"Blockchain"}
                                />
                                <Checkbox
                                    isChecked={false}
                                    handleChange={() => {
                                    }}
                                    label={"Marketplaces"}
                                />
                                <Checkbox
                                    isChecked={false}
                                    handleChange={() => {
                                    }}
                                    label={"Point of sale software"}
                                />
                                <Checkbox
                                    isChecked={false}
                                    handleChange={() => {
                                    }}
                                    label={"Mobile Development"}
                                />
                                <Checkbox
                                    isChecked={false}
                                    handleChange={() => {
                                    }}
                                    label={"Voice recognition"}
                                />
                                <Checkbox
                                    isChecked={false}
                                    handleChange={() => {
                                    }}
                                    label={"CRM software"}
                                />
                                <Checkbox
                                    isChecked={false}
                                    handleChange={() => {
                                    }}
                                    label={"Game Development"}
                                />
                                <Checkbox
                                    isChecked={false}
                                    handleChange={() => {
                                    }}
                                    label={"Video (Face) recognition"}
                                />
                                <Checkbox
                                    isChecked={false}
                                    handleChange={() => {
                                    }}
                                    label={"ERP software"}
                                />
                                <Checkbox
                                    isChecked={false}
                                    handleChange={() => {
                                    }}
                                    label={"Other"}
                                />
                                <Input
                                    value={""}
                                    onChange={() => {
                                    }}
                                    className={styles.checkboxInput}
                                />
                            </div>
                        </div>
                        <Input
                            value={""}
                            onChange={onSignUp}
                            title={"8. Company Short Description*"}
                            className={styles.input}
                        />
                        <Input
                            value={""}
                            onChange={onSignUp}
                            title={"9. Full company Description*"}
                            className={styles.input}
                        />
                        <Input
                            value={""}
                            onChange={onSignUp}
                            title={"12. Team Size*"}
                            className={styles.input}
                        />
                        <Input
                            value={""}
                            onChange={onSignUp}
                            title={"13. Location*"}
                            className={styles.input}
                        />
                        <Input
                            value={""}
                            onChange={onSignUp}
                            title={
                                "15. Client's Focus (Ideal Client Profile based on your portfolio)"
                            }
                            className={styles.input}
                        />
                        <Input
                            value={""}
                            onChange={onSignUp}
                            title={"16. Marketing manager contact details*"}
                            className={styles.input}
                        />
                        <Input
                            value={""}
                            onChange={onSignUp}
                            title={
                                "17. Tech or Project Expert contact details (who will be in touch with a client)*"
                            }
                            className={styles.input}
                        />
                        <Input
                            value={""}
                            onChange={onSignUp}
                            title={"18. Links to client's success cases*"}
                            className={styles.input}
                        />
                        <Input
                            value={""}
                            onChange={onSignUp}
                            title={"19. Describe ideal client portrait*"}
                            className={styles.input}
                        />
                    </div>
                    <PuzzleButton
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
