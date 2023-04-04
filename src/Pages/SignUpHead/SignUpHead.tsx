import { Form } from 'antd';
import 'intl-tel-input/build/css/intlTelInput.css';
import { ChangeEvent, useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';

import { ClosedEyeIcon } from '../../Assets/icons/ClosedEyeIcon';
import { OpenEyeIcon } from '../../Assets/icons/OpenEyeIcon';
import Checkbox from '../../Components/Checkbox';
import Input from '../../Components/Input';
import PuzzleButton, { PuzzleButtonTypes } from '../../Components/PuzzleButton';
import Title from '../../Components/Title';
import { PasswordTypes } from '../../Components/constants/@types';
import { registerUser } from '../../Redux/Reducers/authReducer';
import { PathNames } from '../Router/Router';

import styles from './SignUpHead.module.css';

export enum Role {
  PO = 'productOwner',
  CEO = 'ceo',
  CTO = 'cto',
  PM = 'projectManger',
  Designer = 'designer',
  QA = 'qa',
  Programmer = 'programmer'
}

const options = [
  { value: Role.PO, label: 'Product Owner' },
  { value: Role.CEO, label: 'CEO' },
  { value: Role.CTO, label: 'CTO' },
  { value: Role.PM, label: 'Project Manager' },
  { value: Role.Designer, label: 'Designer' },
  { value: Role.QA, label: 'QA' },
  { value: Role.Programmer, label: 'Programmer' }
];

const SignUpHead = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const checkPassword = Form.useWatch('password', form);
  const checkPasswordConfirm = Form.useWatch('passwordConfirmation', form);
  const checkRole = Form.useWatch('userStatus', form);

  const [type, setType] = useState(PasswordTypes.Password);
  const onEyeClick = () => {
    type === PasswordTypes.Password ? setType(PasswordTypes.Text) : setType(PasswordTypes.Password);
  };
  const [typeConfirm, setTypeConfirm] = useState(PasswordTypes.Password);
  const onEyeClickConfirm = () => {
    typeConfirm === PasswordTypes.Password
      ? setTypeConfirm(PasswordTypes.Text)
      : setTypeConfirm(PasswordTypes.Password);
  };

  const [checked, setChecked] = useState(false);
  const onChangeCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const [value, setValue] = useState<any>();

  const onSignUp = (values: any) => {
    dispatch(
      registerUser({
        data: {
          full_name: values.fullName,
          email: values.email,
          phone: values.phone,
          position: values.userStatus.label,
          code: null,
          password: values.password,
          re_password: values.passwordConfirmation
        },
        callback: () => {
          switch (checkRole.value) {
            case Role.PO:
              navigate(PathNames.SignUpPoInfo);
              break;

            case Role.Designer:
            case Role.QA:
            case Role.Programmer:
              navigate(PathNames.CheckYourEmail);
              break;

            default:
              navigate(PathNames.SignUpHeadInfo);
          }
        }
      })
    );
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.test}>
          <div className={styles.titleBlock}>
            <Title name={'Sign up'} className={styles.title} />
            <div className={styles.subtitle}>{'Let’s get started'}</div>
          </div>
          <Form
            onFinish={onSignUp}
            form={form}
            className={styles.form}
            initialValues={{
              fullName: '',
              email: '',
              code: '',
              password: '',
              passwordConfirmation: ''
            }}>
            <div className={styles.inputs}>
              <Form.Item
                name="fullName"
                className={styles.formItem}
                rules={[{ required: true, message: 'Please input your full name!' }]}>
                <Input type={'text'} placeholder={'Full name'} />
              </Form.Item>
              <Form.Item
                name="email"
                className={styles.formItem}
                rules={[{ required: true, message: 'Please input your email!' }]}>
                <Input type={'email'} placeholder={'Email'} />
              </Form.Item>
              <Form.Item
                name="phone"
                className={styles.formItem}
                rules={[
                  {
                    required: true,
                    message: 'Please input your phone number!'
                  }
                ]}>
                <PhoneInput
                  placeholder="Enter phone number"
                  value={value}
                  onChange={setValue}
                  className={styles.phoneInput}
                />
              </Form.Item>
              <Form.Item
                name="userStatus"
                className={styles.formItem}
                rules={[
                  {
                    required: true,
                    message: 'Please select users role in the project!'
                  }
                ]}>
                <Dropdown
                  options={options}
                  placeholder="Role in the project"
                  className={styles.dropdownContainer}
                  controlClassName={styles.dropdownControl}
                  placeholderClassName={styles.dropdownPlaceholder}
                  arrowClassName={styles.dropdownArrow}
                  arrowClosed={<span className={styles.arrowClosed} />}
                  arrowOpen={<span className={styles.arrowOpen} />}
                  menuClassName={styles.dropdownMenu}
                  value={checkRole}
                />
              </Form.Item>

              {checkRole?.value === Role.Programmer ||
              checkRole?.value === Role.Designer ||
              checkRole?.value === Role.QA ? (
                <Form.Item name="code" className={styles.formItem}>
                  <Input type={'text'} placeholder={'Code'} />
                </Form.Item>
              ) : null}

              <div className={styles.passwordContainer}>
                <Form.Item
                  name="password"
                  className={styles.formItem}
                  rules={[{ required: true, message: 'Please input your password!' }]}>
                  <Input type={type} value={checkPassword} placeholder={'Password'} />
                </Form.Item>
                <div className={styles.eyeIcon} onClick={onEyeClick}>
                  {checkPassword && type !== 'password' ? <ClosedEyeIcon /> : <OpenEyeIcon />}
                </div>
              </div>
              <div className={styles.passwordContainer}>
                <Form.Item
                  name="passwordConfirmation"
                  className={styles.formItem}
                  rules={[
                    {
                      required: true,
                      message: 'Please confirm your password!'
                    }
                  ]}>
                  <Input type={typeConfirm} value={checkPasswordConfirm} placeholder={'Confirm password'} />
                </Form.Item>
                <div className={styles.eyeIcon} onClick={onEyeClickConfirm}>
                  {checkPasswordConfirm && typeConfirm !== 'password' ? <ClosedEyeIcon /> : <OpenEyeIcon />}
                </div>
              </div>
            </div>
            <div className={styles.checkboxContainer}>
              <Checkbox isChecked={checked} handleChange={onChangeCheck} label={'I agree '} />

              <div className={styles.line}>Terms and Conditions</div>
            </div>
            <Form.Item className={styles.formItem}>
              <PuzzleButton
                htmlType="submit"
                btnTitle={
                  checkRole?.value === Role.Designer ||
                  checkRole?.value === Role.QA ||
                  checkRole?.value === Role.Programmer
                    ? 'Create account'
                    : 'Next step'
                }
                btnType={PuzzleButtonTypes.TextButton}
                btnClassName={styles.button}
                btnDisabled={!(checkPassword === checkPasswordConfirm) || !checked}
              />
            </Form.Item>
          </Form>
          <div className={styles.info}>
            {'Have an account?'}
            <NavLink to={PathNames.SignIn} className={styles.link}>
              <span>{'Sign in'}</span>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUpHead;
