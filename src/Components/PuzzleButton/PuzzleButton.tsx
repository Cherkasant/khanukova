import React, {FC, PropsWithChildren, ReactElement} from "react";
import classNames from "classnames";
import {Button} from "antd";

import styles from "./PuzzleButton.module.css";
import {ButtonProps} from "antd/es/button/button";

export enum PuzzleButtonTypes {
    TextButton = "text",
    IconButton = "icon",
};

export type PuzzleButtonProps = PropsWithChildren<ButtonProps> & {
    btnTitle?: string | ReactElement;
    btnType?: PuzzleButtonTypes;
    onClick?: () => void;
    btnClassName?: string;
    btnDisabled?: boolean;
};

const PuzzleButton: FC<PuzzleButtonProps> = (props) => {
    const {btnType, btnTitle, btnClassName, onClick, btnDisabled} = props;

    const buttonClassName = btnType && styles[btnType];

    return (
        <Button
            className={classNames(styles.button, buttonClassName, btnClassName, {
                [styles.disabled]: !!btnDisabled,
            })}
            onClick={onClick}
        >
            {btnTitle}
        </Button>
    );
};

export default PuzzleButton;