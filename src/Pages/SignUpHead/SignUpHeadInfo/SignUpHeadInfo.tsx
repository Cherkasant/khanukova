import React from "react";

import {UploadOutlined} from "@ant-design/icons";
import type {UploadProps} from "antd";
import {Button, Checkbox, DatePicker, Form, message, Upload} from "antd";
import Input from "../../../Components/Input";
import PuzzleButton, {PuzzleButtonTypes,} from "../../../Components/PuzzleButton";
import styles from "./SignUpHeadInfo.module.css";
import Title from "../../../Components/Title";
import {PathNames} from "../../Router/Router";
import {registerHeadInfo} from "../../../Redux/Reducers/authReducer";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import Dropdown from "react-dropdown";
import authSelectors from "../../../Redux/Selectors/authSelectors";

const SignUpHeadInfo = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currencyOptions = [
        {value: "EUR", label: "EUR"},
        {value: "USD", label: "USD"},
    ];
    const defaultCurrencyOption = currencyOptions[1].value;
    const idUser = useSelector(authSelectors.getUserId)

    const onSignUpHeadInfo = (values: any) => {
        dispatch(
            registerHeadInfo({
                data: {
                    company_name: values.companyName,
                    // logo: string,
                    website: values.website,
                    tagline: values.tagline,
                    client_industry: values.clientIndustry,
                    software_stack: values.softwareStack,
                    industry_choice: values.industryChoice.join(", "),
                    short_description: values.shortDescription,
                    full_description: values.fullDescription,
                    average_hourly_rate: values.averageHourlyRate,
                    currency_rate: values.currencyRate.label,
                    minimum_project_budget: values.minimumProjectBudget,
                    currency_budget: values.currencyBudget.label,
                    team_size: values.teamSize,
                    location: values.location,
                    foundation_date: values["datePicker"].format("YYYY-MM-DD"),
                    clients_focus: values.clientsFocus,
                    contact_marketing: values.contactMarketing,
                    contact_expert: values.contactExpert,
                    links_case: values.linksCase,
                    client_describe: values.clientDescribe,
                    employees: [idUser],
                },
                callback: () => {
                    navigate(PathNames.ActivateUser);
                },
            })
        );
    };
    const props: UploadProps = {
        beforeUpload: (file) => {
            const isPNG = file.type === "image/png";
            const isJPG = file.type === "image/jpg";
            const isJPEG = file.type === "image/jpeg";
            if (!isPNG && !isJPG && !isJPEG) {
                message.error(`${file.name} is not a png or jpg file`);
            }
            return isPNG || isJPG || isJPEG || Upload.LIST_IGNORE;
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
                    <Form onFinish={onSignUpHeadInfo} className={styles.form}>
                        <div className={styles.infoContainer}>
                            <Form.Item name="companyName" className={styles.formItem}>
                                <Input title={"1. Company name"} className={styles.input}/>
                            </Form.Item>
                            <div className={styles.uploadContainer}>
                                <div className={styles.uploadContainerTitle}>
                                    2. Logo company - 300x300, png or jpg, white background*
                                </div>
                                <Upload {...props}>
                                    <Button
                                        icon={<UploadOutlined/>}
                                        className={styles.uploadButton}
                                    >
                                        Add a file
                                    </Button>
                                </Upload>
                            </div>
                            <Form.Item name="website" className={styles.formItem}>
                                <Input
                                    title={"3. Website domain name"}
                                    className={styles.input}
                                />
                            </Form.Item>
                            <Form.Item name="tagline" className={styles.formItem}>
                                <Input
                                    title={
                                        "4. Tagline (service description in one sentence or mission/vision)*"
                                    }
                                    className={styles.input}
                                />
                            </Form.Item>
                            <Form.Item name="clientIndustry" className={styles.formItem}>
                                <Input
                                    title={"5. Industries that your clients are coming from*"}
                                    className={styles.input}
                                />
                            </Form.Item>
                            <Form.Item name="softwareStack" className={styles.formItem}>
                                <Input
                                    title={"6. Preferable Software Stack*"}
                                    className={styles.input}
                                />
                            </Form.Item>
                            <div className={styles.checkboxBlock}>
                                <div className={styles.checkboxBlockTitle}>
                                    7. Choose the preferable industries where you have the most
                                    successful experience and where the potential clients are
                                    expected to come from*
                                </div>
                                <Form.Item name="industryChoice" className={styles.formItem}>
                                    <Checkbox.Group className={styles.checkboxContainer}>
                                        <Checkbox value="Ecommerce">
                                            Ecommerce
                                        </Checkbox>
                                        <Checkbox
                                            value="AI and Machine Learning"
                                            style={{margin: '0'}}
                                        >
                                            AI and Machine Learning
                                        </Checkbox>
                                        <Checkbox value="Martech (Marketing Tech)" style={{margin: '0'}}>
                                            Martech (Marketing Tech)
                                        </Checkbox>
                                        <Checkbox value="Live Chat software" style={{margin: '0'}}>
                                            Live Chat software
                                        </Checkbox>
                                        <Checkbox value="Logistics" style={{margin: '0'}}>Logistics</Checkbox>
                                        <Checkbox value="Data Science" style={{margin: '0'}}>Data Science</Checkbox>
                                        <Checkbox value="HR Software" style={{margin: '0'}}>HR Software</Checkbox>
                                        <Checkbox value="Webinar software" style={{margin: '0'}}>
                                            Webinar software
                                        </Checkbox>
                                        <Checkbox value="eLearning" style={{margin: '0'}}>eLearning</Checkbox>
                                        <Checkbox value="Cybersecurity" style={{margin: '0'}}>Cybersecurity</Checkbox>
                                        <Checkbox value="Augmented Reality" style={{margin: '0'}}>
                                            Augmented Reality
                                        </Checkbox>
                                        <Checkbox value="Project Management software" style={{margin: '0'}}>
                                            Project Management software
                                        </Checkbox>
                                        <Checkbox value="Fintech" style={{margin: '0'}}>Fintech</Checkbox>
                                        <Checkbox value="Blockchain" style={{margin: '0'}}>Blockchain</Checkbox>
                                        <Checkbox value="Marketplaces" style={{margin: '0'}}>Marketplaces</Checkbox>
                                        <Checkbox value="Point of sale software" style={{margin: '0'}}>
                                            Point of sale software
                                        </Checkbox>
                                        <Checkbox value="Mobile Development" style={{margin: '0'}}>
                                            Mobile Development
                                        </Checkbox>
                                        <Checkbox value="Voice recognition" style={{margin: '0'}}>
                                            Voice recognition
                                        </Checkbox>
                                        <Checkbox value="CRM software" style={{margin: '0'}}>CRM software</Checkbox>
                                        <Checkbox value="Game Development" style={{margin: '0'}}>
                                            Game Development
                                        </Checkbox>
                                        <Checkbox value="Video (Face) recognition" style={{margin: '0'}}>
                                            Video (Face) recognition
                                        </Checkbox>
                                        <Checkbox value="ERP software" style={{margin: '0'}}>ERP software</Checkbox>
                                        <Checkbox value="Other" style={{margin: '0'}}>Other</Checkbox>
                                        <Input
                                            value={""}
                                            onChange={() => {
                                            }}
                                            className={styles.checkboxInput}
                                        />
                                    </Checkbox.Group>
                                </Form.Item>
                            </div>
                            <Form.Item name="shortDescription" className={styles.formItem}>
                                <Input
                                    title={"8. Company Short Description*"}
                                    className={styles.input}
                                />
                            </Form.Item>
                            <Form.Item name="fullDescription" className={styles.formItem}>
                                <Input
                                    title={"9. Full company Description*"}
                                    className={styles.input}
                                />
                            </Form.Item>
                            <div className={styles.rateContainer}>
                                <div className={styles.rateContainerTitle}>
                                    10. Average hourly rate*
                                </div>
                                <div className={styles.rateContainerInput}>
                                    <Form.Item
                                        name="averageHourlyRate"
                                        className={styles.formItem}
                                    >
                                        <Input className={styles.inputRate}/>
                                    </Form.Item>
                                    <Form.Item name="currencyRate" className={styles.formItem}>
                                        <Dropdown
                                            options={currencyOptions}
                                            value={defaultCurrencyOption}
                                            className={styles.dropdownContainer}
                                            controlClassName={styles.dropdownControl}
                                            placeholderClassName={styles.dropdownPlaceholder}
                                            arrowClosed={<span className={styles.arrowClosed}/>}
                                            arrowOpen={<span className={styles.arrowOpen}/>}
                                            menuClassName={styles.dropdownMenu}
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <div className={styles.budgetContainer}>
                                <div className={styles.budgetContainerTitle}>
                                    11. Minimum project budget*
                                </div>
                                <div className={styles.budgetContainerInput}>
                                    <Form.Item
                                        name="minimumProjectBudget"
                                        className={styles.formItem}
                                    >
                                        <Input className={styles.inputRate}/>
                                    </Form.Item>
                                    <Form.Item name="currencyBudget" className={styles.formItem}>
                                        <Dropdown
                                            options={currencyOptions}
                                            value={defaultCurrencyOption}
                                            className={styles.dropdownContainer}
                                            controlClassName={styles.dropdownControl}
                                            placeholderClassName={styles.dropdownPlaceholder}
                                            arrowClosed={<span className={styles.arrowClosed}/>}
                                            arrowOpen={<span className={styles.arrowOpen}/>}
                                            menuClassName={styles.dropdownMenu}
                                        />
                                    </Form.Item>
                                </div>
                            </div>
                            <Form.Item name="teamSize" className={styles.formItem}>
                                <Input title={"12. Team Size*"} className={styles.input}/>
                            </Form.Item>
                            <Form.Item name="location" className={styles.formItem}>
                                <Input title={"13. Location*"} className={styles.input}/>
                            </Form.Item>
                            <div className={styles.datePickerContainer}>
                                <div className={styles.datePickerContainerTitle}>
                                    14. Foundation date*
                                </div>
                                <Form.Item name="datePicker" className={styles.formItem}>
                                    <DatePicker
                                        format="YYYY-MM-DD"
                                        className={styles.datePickerInput}
                                    />
                                </Form.Item>
                            </div>
                            <Form.Item name="clientsFocus" className={styles.formItem}>
                                <Input
                                    title={
                                        "15. Client's Focus (Ideal Client Profile based on your portfolio)"
                                    }
                                    className={styles.input}
                                />
                            </Form.Item>
                            <Form.Item name="contactMarketing" className={styles.formItem}>
                                <Input
                                    title={"16. Marketing manager contact details*"}
                                    className={styles.input}
                                />
                            </Form.Item>
                            <Form.Item name="contactExpert" className={styles.formItem}>
                                <Input
                                    title={
                                        "17. Tech or Project Expert contact details (who will be in touch with a client)*"
                                    }
                                    className={styles.input}
                                />
                            </Form.Item>
                            <Form.Item name="linksCase" className={styles.formItem}>
                                <Input
                                    title={"18. Links to client's success cases*"}
                                    className={styles.input}
                                />
                            </Form.Item>
                            <Form.Item name="clientDescribe" className={styles.formItem}>
                                <Input
                                    title={"19. Describe ideal client portrait*"}
                                    className={styles.input}
                                />
                            </Form.Item>
                        </div>
                        <Form.Item className={styles.formItem}>
                            <PuzzleButton
                                htmlType="submit"
                                btnTitle={"Create an Account"}
                                btnType={PuzzleButtonTypes.TextButton}
                                btnClassName={styles.button}
                                // btnDisabled={}
                            />
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </>
    );
};

export default SignUpHeadInfo;
