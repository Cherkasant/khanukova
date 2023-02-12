import React from "react";
import {useNavigate, useParams} from "react-router";
import {useDispatch} from "react-redux";
import styles from "./ActivationPage.module.css";
import PuzzleButton, {PuzzleButtonTypes} from "../../Components/PuzzleButton";
import {activateUser} from "../../Redux/Reducers/authReducer";
import {PathNames} from "../Router/Router";

const ActivationPage = () => {
    const {uid, token} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onConfirm = () => {
        if (uid && token) {
            dispatch(
                activateUser({
                    data: {uid, token},
                    callback: () => {
                        navigate(PathNames.SignIn);
                    },
                })
            );
        }
    };

    return (
        <div className={styles.container}>
            <div> {"You need to confirm your email"}</div>
            <div>{"Please confirm"}</div>
            <PuzzleButton
                btnTitle={"Confirm"}
                btnType={PuzzleButtonTypes.TextButton}
                onClick={onConfirm}
            />
        </div>
    );
};

export default ActivationPage;
