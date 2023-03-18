import React, { FC, useState } from 'react'
import classNames from 'classnames'
import styles from '../ModalGeneratePassword/ModalGeneratePassword.module.css'
import { TelegramIcon } from '../../Assets/DevTeam/TelegramIcon'
import { ViberIcon } from '../../Assets/DevTeam/ViberIcon'
import { WhatsappIcon } from '../../Assets/DevTeam/WhatsappIcon'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { CopyIcon } from '../../Assets/DevTeam/CopyIcon'

type ModalGeneratePasswordProps = {
	modal: boolean
}

const ModalGeneratePassword: FC<ModalGeneratePasswordProps> = ({ modal }) => {
	const [copied, setCopied] = useState(false)
	const onCopyClick = () => {
		setCopied(true)
		setTimeout(() => {
			setCopied(false)
		}, 1500)
	}
	return (
		<div
			className={classNames(styles.wrap, { [styles.activeModal]: modal })}
			onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
		>
			<div className={styles.container}>
				<div className={styles.passwordBlock}>
					<div className={styles.popoverTitle}>
						{'Copy password to clipboard'}
					</div>
					<div className={styles.password}>{'01udpo35cmsn'}</div>
					<CopyToClipboard text='01udpo35cmsn' onCopy={onCopyClick}>
						<div className={styles.copyIcon}>
							<CopyIcon />
						</div>
					</CopyToClipboard>
					{copied ? (
						<div className={styles.copyMessage}>{'Password copied!'}</div>
					) : null}
				</div>
				<div className={styles.description}>
					<div className={styles.bold}>
						{'This code is active only for 1 hour'}
					</div>
					<div>{'Send the code to a team member to add the project'}</div>
				</div>
				<div className={styles.iconsBlock}>
					<div className={styles.icon}>
						<TelegramIcon />
					</div>
					<div className={styles.icon}>
						<ViberIcon />
					</div>
					<div className={styles.icon}>
						<WhatsappIcon />
					</div>
				</div>
			</div>
		</div>
	)
}

export default ModalGeneratePassword
