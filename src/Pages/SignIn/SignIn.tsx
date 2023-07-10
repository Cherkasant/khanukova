import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux';

import Input from '../../Components/Input';
import Title from '../../Components/Title';
import { PathNames } from '../Router/Router';
import Checkbox from '../../Components/Checkbox';
import { ClosedEyeIcon } from '../../Assets/icons/ClosedEyeIcon';
import { OpenEyeIcon } from '../../Assets/icons/OpenEyeIcon';
import { PasswordTypes } from '../../Components/constants/@types';
import { signInUser } from '../../Redux/Reducers/authReducer';
import PuzzleButton, { PuzzleButtonTypes } from '../../Components/PuzzleButton';
import FormContainer from '../../Components/FormContainer/FormContainer';
import { SignInType } from '../../Components/constants/@auth';
import { validationRules } from '../validationRules';
import statusSelectors from '../../Redux/Selectors/statusSelectors';
import Loader from '../../Components/Loader';

import styles from './SignIn.module.css';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [type, setType] = useState(PasswordTypes.Password);
  const [rememberPassword, setRememberPassword] = useState(false);
  const status = useSelector(statusSelectors.statusSignIn);

  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors }
  } = useForm<SignInType>({
    defaultValues: { email: '', password: '' },
    mode: 'onChange'
  });
  const onSubmit: SubmitHandler<SignInType> = (userInfo) => {
    dispatch(
      signInUser({
        data: userInfo,
        rememberPassword,
        callback: () => {
          navigate(PathNames.Home);
          reset();
        }
      })
    );
  };

  const onEyeClick = () => {
    type === PasswordTypes.Password ? setType(PasswordTypes.Text) : setType(PasswordTypes.Password);
  };

  const onChangeCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setRememberPassword(event.target.checked);
  };

  return status === 'pending' ? (
    <Loader className={styles.loader} />
  ) : (
    <FormContainer>
      <div className={styles.inner}>
        <div className={styles.titleBlock}>
          <Title name={'Login to account'} className={styles.title} />
          <div className={styles.subtitle}>{'Please enter your login details to sign in'}</div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.inputs}>
            <Controller
              control={control}
              name="email"
              rules={validationRules.emailSign}
              render={({ field: { onChange, value } }) => (
                <Input
                  type={'email'}
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
            <div className={styles.passwordContainer}>
              <Controller
                control={control}
                name="password"
                rules={validationRules.passwordSignIn}
                render={({ field: { onChange, value } }) => (
                  <Input
                    onChange={onChange}
                    onFocus={() => {
                      clearErrors('password');
                    }}
                    value={value}
                    type={type}
                    placeholder="Password"
                    error={errors.password?.message}
                  />
                )}
              />
              <div className={styles.eyeIcon} onClick={onEyeClick}>
                {type !== 'password' ? <ClosedEyeIcon /> : <OpenEyeIcon />}
              </div>
            </div>
          </div>
          <div className={styles.checkboxContainer}>
            <Checkbox isChecked={rememberPassword} handleChange={onChangeCheck} label={'Remember me'} />
            <div className={styles.line} onClick={() => navigate(PathNames.PasswordRequestPage)}>
              Forgot your password?
            </div>
          </div>
          <PuzzleButton
            htmlType="submit"
            btnTitle={'Login'}
            btnType={PuzzleButtonTypes.TextButton}
            btnClassName={styles.button}
            btnDisabled={!!errors.email || !!errors.password}
          />
        </form>
        <div className={styles.info}>
          {'Don`t have an account?'}
          <NavLink to={PathNames.SignUp} className={styles.link}>
            <span>{'Create an Account'}</span>
          </NavLink>
        </div>
      </div>
    </FormContainer>
  );
};

export default SignIn;
