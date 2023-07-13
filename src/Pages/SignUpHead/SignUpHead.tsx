import { useState } from 'react';
import 'react-dropdown/style.css';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import classNames from 'classnames';

import { ClosedEyeIcon } from '../../Assets/icons/ClosedEyeIcon';
import { OpenEyeIcon } from '../../Assets/icons/OpenEyeIcon';
import Input from '../../Components/Input';
import PuzzleButton, { PuzzleButtonTypes } from '../../Components/PuzzleButton';
import PuzzleCheckbox from '../../Components/PuzzleCheckbox';
import PuzzleDropdown from '../../Components/PuzzleDropdown';
import Title from '../../Components/Title';
import { PasswordTypes } from '../../Components/constants/@types';
import { registerUser } from '../../Redux/Reducers/authReducer';
import { PathNames } from '../Router/Router';
import { SignUpType } from '../../Components/constants/@auth';
import { validationRules } from '../validationRules';
import statusSelectors from '../../Redux/Selectors/statusSelectors';
import Loader from '../../Components/Loader';

import 'intl-tel-input/build/css/intlTelInput.css';
import styles from './SignUpHead.module.css';

export enum Role {
  PjO = 'Project Owner',
  CEO = 'CEO',
  CTO = 'CTO',
  PM = 'Project Manager',
  Designer = 'Designer',
  QA = 'QA',
  Programmer = 'Programmer',
  PdO = 'Product Owner'
}

const options = [
  { value: Role.PjO, label: 'Project Owner' },
  { value: Role.CEO, label: 'CEO' },
  { value: Role.CTO, label: 'CTO' },
  { value: Role.PM, label: 'Project Manager' },
  { value: Role.PdO, label: 'Product Owner' },
  { value: Role.Designer, label: 'Designer' },
  { value: Role.QA, label: 'QA' },
  { value: Role.Programmer, label: 'Programmer' }
];

const optionsHead = [
  { value: Role.PjO, label: 'Project Owner' },
  { value: Role.CEO, label: 'CEO' },
  { value: Role.CTO, label: 'CTO' },
  { value: Role.PM, label: 'Project Manager' },
  { value: Role.PdO, label: 'Product Owner' }
];

const SignUpHead = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    watch,
    formState: { errors }
  } = useForm<SignUpType>({
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
      phone: '',
      position: '',
      code: '',
      passwordConfirmation: ''
    },
    mode: 'onSubmit'
  });
  const checkRole = watch('position');
  const [type, setType] = useState(PasswordTypes.Password);
  const [typeConfirm, setTypeConfirm] = useState(PasswordTypes.Password);
  const [checked, setChecked] = useState(false);
  const [checkedCode, setCheckedCode] = useState(false);
  const [checkedCompany, setCheckedCompany] = useState(false);
  const status = useSelector(statusSelectors.statusSignUp);

  const onEyeClick = () => {
    type === PasswordTypes.Password ? setType(PasswordTypes.Text) : setType(PasswordTypes.Password);
  };
  const onEyeClickConfirm = () => {
    typeConfirm === PasswordTypes.Password
      ? setTypeConfirm(PasswordTypes.Text)
      : setTypeConfirm(PasswordTypes.Password);
  };

  const onChangeCheck = (e: CheckboxChangeEvent) => {
    setChecked(e.target.checked);
  };
  const onChangeCheckCode = (e: CheckboxChangeEvent) => {
    setCheckedCode(e.target.checked);
    setCheckedCompany(!e.target.checked);
  };
  const onChangeCheckCompany = (e: CheckboxChangeEvent) => {
    setCheckedCompany(e.target.checked);
    setCheckedCode(!e.target.checked);
  };

  const getValueCauntry = (value: string) => (value ? options.find((opt) => opt.value === value) : '');
  const handleValidate = (value: string) => {
    const isValid = isValidPhoneNumber(value);
    return isValid;
  };

  const onSubmit: SubmitHandler<SignUpType> = (userInfo) => {
    dispatch(
      registerUser({
        data: {
          full_name: userInfo.fullName,
          email: userInfo.email,
          phone: userInfo.phone,
          position: userInfo.position,
          code: userInfo.code || null,
          password: userInfo.password,
          re_password: userInfo.passwordConfirmation
        },
        callback: () => {
          switch (checkRole) {
            case Role.PjO:
              navigate(PathNames.SignUpPoInfo);
              break;
            case Role.Designer:
            case Role.QA:
            case Role.Programmer:
            case Role.PdO:
              navigate(PathNames.CheckYourEmail);
              break;
            default:
              navigate(PathNames.SignUpHeadInfo);
          }
          reset();
        }
      })
    );
  };
  return status === 'pending' ? (
    <Loader className={styles.loader} />
  ) : (
    <div className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.titleBlock}>
          <Title name={'Sign up'} className={styles.title} />
          <div className={styles.subtitle}>{'Let’s get started'}</div>
        </div>
        <div className={styles.checkboxChooseContainer}>
          <PuzzleCheckbox checked={checkedCode} onChange={onChangeCheckCode} label={'Sign up with code'} />
          <PuzzleCheckbox
            checked={checkedCompany}
            onChange={onChangeCheckCompany}
            label={'Sign up and create a company'}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.inputs}>
            <Controller
              control={control}
              name="fullName"
              rules={validationRules.fullName}
              render={({ field: { onChange, value } }) => (
                <Input
                  type={'text'}
                  placeholder={'Full name'}
                  onChange={onChange}
                  value={value}
                  error={errors.fullName?.message}
                />
              )}
            />
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
                />
              )}
            />
            <Controller
              control={control}
              name="phone"
              rules={{
                required: 'Please input your phone number!',
                validate: (value) => handleValidate(value)
              }}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <>
                  <PhoneInput
                    //@ts-ignore
                    onChange={onChange}
                    className={classNames(styles.phoneInput, { [styles.inputError]: error })}
                    placeholder={'Enter phone number'}
                    value={value}
                  />
                  <div className={styles.error}>{error ? 'Phone entered incorrectly' : ''}</div>
                </>
              )}
            />
            <Controller
              control={control}
              name="position"
              rules={validationRules.position}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <PuzzleDropdown
                  options={!checkedCompany ? options : optionsHead}
                  className={styles.phoneInput}
                  placeholder={'Role in the project'}
                  value={getValueCauntry(value)}
                  onChange={(newValue) => onChange(newValue.value)}
                  error={error?.message}
                />
              )}
            />
            <Controller
              control={control}
              rules={checkedCode ? validationRules.code : undefined}
              name="code"
              render={({ field: { onChange, value } }) => (
                <Input onChange={onChange} value={value ? value : ''} placeholder={'Code'} disabled={!checkedCode} />
              )}
            />
            <div className={styles.passwordContainer}>
              <Controller
                control={control}
                name="password"
                rules={validationRules.passwordSignUp}
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
                    className={styles.inputPass}
                  />
                )}
              />
              <div className={styles.eyeIcon} onClick={onEyeClick}>
                {type !== 'password' ? <ClosedEyeIcon /> : <OpenEyeIcon />}
              </div>
            </div>
            <div className={styles.passwordContainer}>
              <Controller
                control={control}
                name="passwordConfirmation"
                rules={{
                  required: 'Please input min 9 symbols!',
                  validate: (value) => value === watch('password') || 'Passwords do not match'
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    onChange={onChange}
                    onFocus={() => {
                      clearErrors('passwordConfirmation');
                    }}
                    value={value}
                    type={typeConfirm}
                    placeholder="Confirm password"
                    error={errors.passwordConfirmation && errors.passwordConfirmation?.message}
                  />
                )}
              />
              <div className={styles.eyeIcon} onClick={onEyeClickConfirm}>
                {typeConfirm !== 'password' ? <ClosedEyeIcon /> : <OpenEyeIcon />}
              </div>
            </div>
          </div>
          <div className={styles.checkboxContainer}>
            <PuzzleCheckbox checked={checked} onChange={onChangeCheck} label={'I agree '} />
            <div className={styles.linkRules}>Terms and Conditions</div>
          </div>
          <PuzzleButton
            htmlType="submit"
            btnTitle={
              checkedCode &&
              (checkRole === Role.Designer ||
                checkRole === Role.QA ||
                checkRole === Role.PdO ||
                checkRole === Role.Programmer)
                ? 'Create account'
                : 'Next step'
            }
            btnType={PuzzleButtonTypes.TextButton}
            btnClassName={styles.button}
            btnDisabled={
              !watch('fullName') ||
              !watch('email') ||
              !watch('phone') ||
              !watch('position') ||
              !watch('password') ||
              !watch('passwordConfirmation') ||
              (checkedCode ? !watch('code') : undefined)
            }
          />
        </form>
        <div className={styles.info}>
          {'Have an account?'}
          <NavLink to={PathNames.SignIn} className={styles.link}>
            <span>{'Sign in'}</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default SignUpHead;
