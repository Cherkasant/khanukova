import { useNavigate, useParams } from 'react-router'
import { useDispatch } from 'react-redux'

import PuzzleButton, { PuzzleButtonTypes } from '../../Components/PuzzleButton'
import { activateUser } from '../../Redux/Reducers/authReducer'
import { PathNames } from '../Router/Router'
import Title from '../../Components/Title'

import styles from './ActivationPage.module.css'

const ActivationPage = () => {
  const { uid, token } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onConfirm = () => {
    if (uid && token) {
      dispatch(
        activateUser({
          data: { uid, token },
          callback: () => {
            navigate(PathNames.SignIn)
          }
        })
      )
    }
  }

  return (
    <>
      <div className={styles.container}>
        <Title name={'Activate your account'} className={styles.title} />
        <div className={styles.subTitle}>{'You need to confirm your email'}</div>
        <PuzzleButton
          btnTitle={'Confirm'}
          btnClassName={styles.button}
          btnType={PuzzleButtonTypes.TextButton}
          onClick={onConfirm}
        />
      </div>
    </>
  )
}

export default ActivationPage
