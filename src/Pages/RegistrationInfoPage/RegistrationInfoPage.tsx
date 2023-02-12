import React, {useEffect, useState} from "react";
import RegisterContainer from "../../Components/RegisterContainer";
import styles from "./RegistrationInfoPage.module.css";
import PuzzleButton, {PuzzleButtonTypes} from "../../Components/PuzzleButton";
import Input from "../../Components/Input";

const RegistrationInfoPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [activeButton, setActiveButton] = useState(true);
    useEffect(() => {
        if (name && email && phone && password) {
            setActiveButton(false);
        } else setActiveButton(true);
    }, [name, email, phone, password]);
    return (
        <RegisterContainer title={"Choose your role in the project"}>
            <>
                <div className={styles.formContainer}>
                    <Input
                        type={"text"}
                        value={name}
                        onChange={(value) => setName(value)}
                        placeholder={"Full name"}
                    />
                    <Input
                        type={"email"}
                        value={email}
                        onChange={(value) => setEmail(value)}
                        placeholder={"Email"}
                    />
                    <Input
                        type={"tel"}
                        value={phone}
                        onChange={(value) => setPhone(value)}
                        placeholder={"Phone"}
                    />
                    <Input
                        type={"password"}
                        value={password}
                        onChange={(value) => setPassword(value)}
                        placeholder={"Password"}
                    />
                </div>

                <div className={styles.buttonContainer}>
                    <PuzzleButton
                        btnTitle={"Next"}
                        btnType={PuzzleButtonTypes.TextButton}
                        btnDisabled={activeButton}
                        className={styles.button}
                    />
                </div>
            </>
        </RegisterContainer>
    );
};

export default RegistrationInfoPage;
