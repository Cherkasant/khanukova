import { NavLink } from 'react-router-dom'

import Title from '../../Components/Title'

import { PathNames } from '../Router/Router'

import styles from './CheckEmailPage.module.css'

const CheckEmailPage = () => {
  return (
    <>
      <div className={styles.container}>
        <Title name={'Check your email'} className={styles.title} />
        <div className={styles.subTitle}>
          {'Email with instructions on password recovery was sent to the email address you provided.'}
        </div>
        <div className={styles.description}>{'Please follow the link to activate your profile.'}</div>
        <div className={styles.info}>
          {'The letter didn’t arrive?'}
          <NavLink to={PathNames.PasswordRequestPage} className={styles.link}>
            <span>{'Resend the email'}</span>
          </NavLink>
        </div>
      </div>
    </>
  )
}

export default CheckEmailPage
