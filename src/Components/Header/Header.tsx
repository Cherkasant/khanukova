import React from "react";
import {BellIcon} from "../../Assets/icons/BellIcon";
import {UserIcon} from "../../Assets/icons/UserIcon";
import PuzzleButton from "../PuzzleButton";
import Title from "../Title";
import styles from "./Header.module.css";
import UserName from "../UserName";
import {useSelector} from "react-redux";
import authSelectors from "../../Redux/Selectors/authSelectors";
import {useNavigate} from "react-router";
import {PathNames} from "../../Pages/Router/Router";
import {PuzzleButtonTypes} from "../PuzzleButton/PuzzleButton";

const Header = () => {
    const navigate = useNavigate();
    const hasMessage = true;
    const isLoggedIn = useSelector(authSelectors.getLoggedIn);

    return (
        <div className={styles.container}>
            <div className={styles.headerLine}>
                <div className={styles.title}>
                    <Title name={"Logo"}/>
                </div>
                <div className={styles.iconsContainer}>
                    <div className={styles.notificationContainer}>
                        <PuzzleButton
                            btnTitle={<BellIcon/>}
                            btnType={PuzzleButtonTypes.IconButton}
                            className={styles.iconBell}
                        />
                        {hasMessage && <div className={styles.notificationCount}></div>}
                    </div>
                    {isLoggedIn ? (
                        <UserName username={"Irina Ivanova"}/>
                    ) : (
                        <PuzzleButton
                            btnTitle={<UserIcon/>}
                            btnType={PuzzleButtonTypes.IconButton}
                            className={styles.iconUser}
                            onClick={() => navigate(PathNames.SignIn)}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
