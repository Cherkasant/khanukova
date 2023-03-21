import { FC, useState } from 'react'
import { CardNotificationsType } from '../constants/@types'
import { Avatar } from '../../Assets/Notification/Avatar'

import styles from './CardNotifications.module.css'

import classNames from 'classnames'

type CardNotificationsProps = {
	card: CardNotificationsType
	onClick?: () => void
	className?: string
}
const CardNotifications: FC<CardNotificationsProps> = ({ card }) => {
	const [isReading, setIsReading] = useState(false)

	const onNotificationClick = () => {
		setIsReading(!isReading)
	}
	return (
		<div
			className={classNames(styles.container, {
				[styles.containerIsReading]: isReading
			})}
			onClick={onNotificationClick}>
			<div className={styles.info}>
				<div className={styles.sectionInfo}>
					<div className={styles.avatar}>
						<Avatar />
					</div>
					<div className={styles.userName}>{card?.userName}</div>
				</div>
				<div className={styles.status}>{card?.status}</div>
				<div className={styles.location}>{card?.location}</div>
			</div>

			<div className={styles.date}>{card?.date}</div>
		</div>
	)
}

export default CardNotifications
