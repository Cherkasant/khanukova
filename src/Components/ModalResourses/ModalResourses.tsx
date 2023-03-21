import React, { useEffect, useState } from 'react'
import styles from './ModalResourses.module.css'
import { CloseModalIcon } from '../../Assets/icons/CloseModalIcon'
import PuzzleButton, { PuzzleButtonTypes } from '../PuzzleButton'
import classNames from 'classnames'

type ModalResoursesProps = {
	data?: any
	modal: boolean
	editClick: boolean
	setModal: React.Dispatch<React.SetStateAction<boolean>>
	setEditClick: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalResourses: React.FC<ModalResoursesProps> = ({
	data,
	modal,
	editClick,
	setModal,
	setEditClick
}) => {
	const [positionsValue, setPositionsValue] = useState('')
	const [projectHoursValue, setProjectHoursValue] = useState('')
	const [rateHourValue, setRateHourValue] = useState('')
	const [budgetValue, setBudgetValue] = useState('')

	useEffect(() => {
		if (editClick) {
			setPositionsValue(data.positions)
			setProjectHoursValue(data.projecthours)
			setRateHourValue(data.rateHour)
			setBudgetValue(data.budget)
		} else {
			setPositionsValue('')
			setProjectHoursValue('')
			setRateHourValue('')
			setBudgetValue('')
		}
	}, [editClick])

	return (
		<div className={classNames(styles.wrap, { [styles.activeModal]: modal })}>
			<div className={styles.items}>
				<div className={styles.item}>
					<div className={styles.title}>Positions</div>
					<input
						value={positionsValue}
						type='text'
						className={styles.input}
						onChange={e => setPositionsValue(e.target.value)}
					/>
				</div>
				<div className={styles.item}>
					<div className={styles.title}>Project involment-hours,h</div>
					<input
						value={projectHoursValue}
						type='text'
						className={styles.input}
						onChange={e => setProjectHoursValue(e.target.value)}
					/>
				</div>
				<div className={styles.item}>
					<div className={styles.title}>Rate per hour, h</div>
					<input
						value={rateHourValue}
						type='text'
						className={styles.input}
						onChange={e => setRateHourValue(e.target.value)}
					/>
				</div>
				<div className={styles.item}>
					<div className={styles.title}>Budget</div>
					<input
						value={budgetValue}
						type='text'
						className={styles.input}
						onChange={e => setBudgetValue(e.target.value)}
					/>
				</div>
			</div>
			<div className={styles.buttonsContainer}>
				<PuzzleButton
					btnTitle={'Cancel'}
					btnType={PuzzleButtonTypes.TextButton}
					btnClassName={styles.cancelBtn}
					onClick={() => {
						setEditClick(false)
						setModal(false)
					}}
				/>
				<PuzzleButton
					btnTitle={'Save'}
					btnType={PuzzleButtonTypes.TextButton}
					btnClassName={styles.saveBtn}
					onClick={() => {}}
				/>
			</div>
			<div
				className={styles.icon}
				onClick={() => {
					setModal(false)
					setEditClick(false)
				}}
			>
				<CloseModalIcon />
			</div>
		</div>
	)
}

export default ModalResourses
