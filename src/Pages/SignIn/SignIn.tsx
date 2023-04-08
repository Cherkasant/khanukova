import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { Form } from 'antd';

import Input from '../../Components/Input';
import Title from '../../Components/Title';
import { PathNames } from '../Router/Router';
import Checkbox from '../../Components/Checkbox';
import { ClosedEyeIcon } from '../../Assets/icons/ClosedEyeIcon';
import { OpenEyeIcon } from '../../Assets/icons/OpenEyeIcon';
import { PasswordTypes } from '../../Components/constants/@types';
import { signInUser } from '../../Redux/Reducers/authReducer';
import PuzzleButton, { PuzzleButtonTypes } from '../../Components/PuzzleButton';

import styles from './SignIn.module.css';

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSignIn = (values: any) => {
    dispatch(
      signInUser({
        data: { email: values.email, password: values.password },
        callback: () => {
          navigate(PathNames.Home);
        }
      })
    );
  };
  const [form] = Form.useForm();
  const checkEmail = Form.useWatch('email', form);
  const checkPassword = Form.useWatch('password', form);
  const [checked, setChecked] = useState(false);
  const [type, setType] = useState(PasswordTypes.Password);
  const onEyeClick = () => {
    type === PasswordTypes.Password ? setType(PasswordTypes.Text) : setType(PasswordTypes.Password);
  };
  const onChangeCheck = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.test}>
          <div className={styles.titleBlock}>
            <Title name={'Login to account'} className={styles.title} />
            <div className={styles.subtitle}>{'Please enter your login details to sign in'}</div>
          </div>
          <Form onFinish={onSignIn} className={styles.form} form={form} initialValues={{ email: '', password: '' }}>
            <div className={styles.inputs}>
              <Form.Item
                name="email"
                rules={[{ required: true, message: 'Please input your email!' }]}
                className={styles.formItem}>
                <Input type={'email'} placeholder={'Email'} />
              </Form.Item>
              <div className={styles.passwordContainer}>
                <Form.Item
                  name="password"
                  rules={[{ required: true, message: 'Please input your password!' }]}
                  className={styles.formItem}>
                  <Input type={type} value={checkPassword} placeholder={'Password'} />
                </Form.Item>
                <div className={styles.eyeIcon} onClick={onEyeClick}>
                  {checkPassword && type !== 'password' ? <ClosedEyeIcon /> : <OpenEyeIcon />}
                </div>
              </div>
            </div>

            <div className={styles.checkboxContainer}>
              <Checkbox isChecked={checked} handleChange={onChangeCheck} label={'Remember me'} />

              <div className={styles.line} onClick={() => navigate(PathNames.PasswordRequestPage)}>
                Forgot your password?
              </div>
            </div>
            <Form.Item className={styles.formItem}>
              <PuzzleButton
                htmlType="submit"
                btnTitle={'Login'}
                btnType={PuzzleButtonTypes.TextButton}
                btnClassName={styles.button}
                btnDisabled={!(checkEmail && checkPassword)}
              />
            </Form.Item>
          </Form>
          <div className={styles.info}>
            {'Don`t have an account?'}
            <NavLink to={PathNames.SignUp} className={styles.link}>
              <span>{'Create an Account'}</span>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
