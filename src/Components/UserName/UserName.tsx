import React, { FC } from 'react'
import styles from './UserName.module.css'
import { AvatarIcon } from '../../Assets/Header/AvatarIcon'
import PuzzleButton, { PuzzleButtonTypes } from '../PuzzleButton'
import { useNavigate } from 'react-router'
import { PathNames } from '../../Pages/Router/Router'

type UserNameProps = {
	username?: string
}

const UserName: FC<UserNameProps> = ({ username }) => {
	const navigate = useNavigate()
	return (
		<div className={styles.container}>
			<PuzzleButton
				btnTitle={<AvatarIcon />}
				btnType={PuzzleButtonTypes.IconButton}
				btnClassName={styles.avatar}
				onClick={() => navigate(PathNames.ProfileDevTeam)}
			/>
			{username}
		</div>
	)
}

export default UserName
