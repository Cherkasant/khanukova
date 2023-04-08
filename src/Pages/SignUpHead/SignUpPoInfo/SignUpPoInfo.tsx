import { Form, Checkbox, Radio } from 'antd';

import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import Input from '../../../Components/Input';
import { PathNames } from '../../Router/Router';
import { registerPoInfo } from '../../../Redux/Reducers/authReducer';
import PuzzleButton, { PuzzleButtonTypes } from '../../../Components/PuzzleButton';
import Title from '../../../Components/Title';
import authSelectors from '../../../Redux/Selectors/authSelectors';

import styles from './SignUpPoInfo.module.css';

const SignUpPoInfo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const idUser = useSelector(authSelectors.getUserId);

  const onSignUpPoInfo = (values: any) => {
    dispatch(
      registerPoInfo({
        data: {
          company_name: values.companyName,
          company_size: values.companySize,
          industry_choice: values.industryChoice.join(', '),
          development_team: values.developmentTeam,
          use_outsourcing: values.useOutsourcing,
          description_project: values.descriptionProject,
          business_requirements: values.businessRequirements,
          technological_stack: values.technologicalStack,
          link_competitor: values.linkCompetitor,
          start_project: values.startProject,
          used_outsourcing: values.usedOutsourcing,
          employees: [idUser],
          owner: idUser
        },
        callback: () => {
          navigate(PathNames.CheckYourEmail);
        }
      })
    );
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.titleBlock}>
            <Title name={'Sign up'} className={styles.title} />
            <div className={styles.subtitle}>{'Create an e-business case'}</div>
          </div>
          <Form
            onFinish={onSignUpPoInfo}
            className={styles.form}
            initialValues={{
              companyName: '',
              developmentTeam: '',
              useOutsourcing: '',
              descriptionProject: '',
              businessRequirements: '',
              technologicalStack: '',
              linkCompetitor: '',
              usedOutsourcing: ''
            }}>
            <div className={styles.infoContainer}>
              <Form.Item
                name="companyName"
                className={styles.formItem}
                rules={[{ required: true, message: 'Please input your Company name!' }]}>
                <Input title={'1. Company name'} className={styles.input} />
              </Form.Item>
              <div className={styles.companyContainer}>
                <div className={styles.companyContainerTitle}>2. Choose your company</div>
                <Form.Item
                  name="companySize"
                  className={styles.formItem}
                  rules={[{ required: true, message: 'Please choose company size' }]}>
                  <Radio.Group className={styles.companyContainerRadio}>
                    <Radio value="Startup">Startup</Radio>
                    <Radio value="Small">Small enterprise (up to 50 people)</Radio>
                    <Radio value="Middle">Mid-size company (up 200 people)</Radio>
                    <Radio value="Large">Large company (more than 200 people)</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
              <div className={styles.checkboxBlock}>
                <div className={styles.checkboxBlockTitle}>
                  3. Choose the preferable industries where you have the most successful experience and where the
                  potential clients are expected to come from*
                </div>
                <Form.Item
                  name="industryChoice"
                  className={styles.formItem}
                  rules={[{ required: true, message: 'Please choose industry' }]}>
                  <Checkbox.Group className={styles.checkboxContainer}>
                    <Checkbox value="Ecommerce">Ecommerce</Checkbox>
                    <Checkbox value="AI and Machine Learning" style={{ margin: '0' }}>
                      AI and Machine Learning
                    </Checkbox>
                    <Checkbox value="Martech (Marketing Tech)" style={{ margin: '0' }}>
                      Martech (Marketing Tech)
                    </Checkbox>
                    <Checkbox value="Live Chat software" style={{ margin: '0' }}>
                      Live Chat software
                    </Checkbox>
                    <Checkbox value="Logistics" style={{ margin: '0' }}>
                      Logistics
                    </Checkbox>
                    <Checkbox value="Data Science" style={{ margin: '0' }}>
                      Data Science
                    </Checkbox>
                    <Checkbox value="HR Software" style={{ margin: '0' }}>
                      HR Software
                    </Checkbox>
                    <Checkbox value="Webinar software" style={{ margin: '0' }}>
                      Webinar software
                    </Checkbox>
                    <Checkbox value="eLearning" style={{ margin: '0' }}>
                      eLearning
                    </Checkbox>
                    <Checkbox value="Cybersecurity" style={{ margin: '0' }}>
                      Cybersecurity
                    </Checkbox>
                    <Checkbox value="Augmented Reality" style={{ margin: '0' }}>
                      Augmented Reality
                    </Checkbox>
                    <Checkbox value="Project Management software" style={{ margin: '0' }}>
                      Project Management software
                    </Checkbox>
                    <Checkbox value="Fintech" style={{ margin: '0' }}>
                      Fintech
                    </Checkbox>
                    <Checkbox value="Blockchain" style={{ margin: '0' }}>
                      Blockchain
                    </Checkbox>
                    <Checkbox value="Marketplaces" style={{ margin: '0' }}>
                      Marketplaces
                    </Checkbox>
                    <Checkbox value="Point of sale software" style={{ margin: '0' }}>
                      Point of sale software
                    </Checkbox>
                    <Checkbox value="Mobile Development" style={{ margin: '0' }}>
                      Mobile Development
                    </Checkbox>
                    <Checkbox value="Voice recognition" style={{ margin: '0' }}>
                      Voice recognition
                    </Checkbox>
                    <Checkbox value="CRM software" style={{ margin: '0' }}>
                      CRM software
                    </Checkbox>
                    <Checkbox value="Game Development" style={{ margin: '0' }}>
                      Game Development
                    </Checkbox>
                    <Checkbox value="Video (Face) recognition" style={{ margin: '0' }}>
                      Video (Face) recognition
                    </Checkbox>
                    <Checkbox value="ERP software" style={{ margin: '0' }}>
                      ERP software
                    </Checkbox>
                  </Checkbox.Group>
                </Form.Item>
              </div>
              <Form.Item
                name="developmentTeam"
                className={styles.formItem}
                rules={[{ required: true, message: 'Please input this value!' }]}>
                <Input
                  title={'4. Do you already have a tech expert or an internal development team for your project?'}
                  className={styles.input}
                />
              </Form.Item>
              <Form.Item
                name="useOutsourcing"
                className={styles.formItem}
                rules={[{ required: true, message: 'Please input this value!' }]}>
                <Input
                  title={
                    '5. Are you willing to use outsourcing services (software development including management responsibilities) or outstaffing (directly manage the work of their dedicated external team)?*'
                  }
                  className={styles.input}
                />
              </Form.Item>
              <Form.Item
                name="descriptionProject"
                className={styles.formItem}
                rules={[{ required: true, message: 'Please input project description!' }]}>
                <Input
                  title={
                    '6. Please provide a brief. project description (Product Features) in three sentences (maximum)'
                  }
                  className={styles.input}
                />
              </Form.Item>
              <Form.Item
                name="businessRequirements"
                className={styles.formItem}
                rules={[{ required: true, message: 'Please input business requirements description!' }]}>
                <Input
                  title={'7. Do you have product business requirements description ready for your project'}
                  className={styles.input}
                />
              </Form.Item>
              <Form.Item
                name="technologicalStack"
                className={styles.formItem}
                rules={[{ required: true, message: 'Please input echnological/software stack!' }]}>
                <Input
                  title={'8. Do you have a technological/software stack in mind for your project?'}
                  className={styles.input}
                />
              </Form.Item>
              <Form.Item
                name="linkCompetitor"
                className={styles.formItem}
                rules={[{ required: true, message: "Please input link to your competitor's project!" }]}>
                <Input
                  title={
                    "9. Please provide a link to your competitor's project that is similar to one you are willing to develop."
                  }
                  className={styles.input}
                />
              </Form.Item>
              <div className={styles.companyContainer}>
                <div className={styles.companyContainerTitle}>
                  10. When are you willing to start your project (choose one)?
                </div>
                <Form.Item
                  name="startProject"
                  className={styles.formItem}
                  rules={[{ required: true, message: 'Please choose when are you willing to start your project' }]}>
                  <Radio.Group className={styles.companyContainerRadio}>
                    <Radio value="This month">This month</Radio>
                    <Radio value="In a month">In a month</Radio>
                    <Radio value="In three month time">In three month time</Radio>
                    <Radio value="Yesterday">Yesterday</Radio>
                  </Radio.Group>
                </Form.Item>
              </div>
              <Form.Item
                name="usedOutsourcing"
                className={styles.formItem}
                rules={[{ required: true, message: 'Please input this value!' }]}>
                <Input
                  title={'11. Have you ever used outsourcing/outstaffing software development services before?'}
                  className={styles.input}
                />
              </Form.Item>
            </div>
            <Form.Item className={styles.formItem}>
              <PuzzleButton
                htmlType="submit"
                btnTitle={'Create an Account'}
                btnType={PuzzleButtonTypes.TextButton}
                btnClassName={styles.button}
              />
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default SignUpPoInfo;
