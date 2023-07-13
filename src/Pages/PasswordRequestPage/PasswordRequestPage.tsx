import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import Input from '../../Components/Input';
import { PathNames } from '../Router/Router';
import { sendResetEmail } from '../../Redux/Reducers/authReducer';
import PuzzleButton, { PuzzleButtonTypes } from '../../Components/PuzzleButton';
import Title from '../../Components/Title';
import FormContainer from '../../Components/FormContainer/FormContainer';
import { SignInType } from '../../Components/constants/@auth';
import { validationRules } from '../validationRules';
import statusSelectors from '../../Redux/Selectors/statusSelectors';
import Loader from '../../Components/Loader';

import styles from './PasswordRequestPage.module.css';

const PasswordRequestPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const status = useSelector(statusSelectors.statusRequestPass);

  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    watch,
    formState: { errors }
  } = useForm<SignInType>({
    defaultValues: { email: '' },
    mode: 'onSubmit'
  });

  const onSubmit: SubmitHandler<SignInType> = (userInfo) => {
    dispatch(
      sendResetEmail({
        email: userInfo.email,
        callback: () => {
          navigate(PathNames.CheckNewPassword);
          reset();
        }
      })
    );
  };

  return status === 'pending' ? (
    <Loader className={styles.loader} />
  ) : (
    <FormContainer>
      <div className={styles.container}>
        <div className={styles.paddingContainer}>
          <div className={styles.titleBlock}>
            <Title name={'Password Request'} className={styles.title} />
            <div className={styles.subtitle}>
              {'We will send instructions how to reset your password to your email address.'}
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className={styles.inputContainer}>
            <Controller
              control={control}
              name="email"
              rules={validationRules.emailSign}
              render={({ field: { onChange, value } }) => (
                <Input
                  type={'text'}
                  placeholder={'Email'}
                  onChange={onChange}
                  value={value}
                  error={errors.email?.message}
                  onFocus={() => {
                    clearErrors('email');
                  }}
                />
              )}
            />
            <PuzzleButton
              htmlType="submit"
              btnTitle={'Continue'}
              btnType={PuzzleButtonTypes.TextButton}
              btnClassName={styles.button}
              btnDisabled={!watch('email')}
            />
          </form>
        </div>
      </div>
    </FormContainer>
  );
};

export default PasswordRequestPage;
