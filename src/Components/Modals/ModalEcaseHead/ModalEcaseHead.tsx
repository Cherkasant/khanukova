import React, { FC, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';

import { CloseModalIcon } from '../../../Assets/icons/CloseModalIcon';

import profileSelectors from '../../../Redux/Selectors/profileSelectors';
import { getECaseListReducer } from '../../../Redux/Reducers/profileReducer';

import { setEcaseHeadModalVisible } from '../../../Redux/Reducers/postReducer';

import postSelector from '../../../Redux/Selectors/postSelector';

import styles from './ModalEcaseHead.module.css';

type ModalEcaseHeadProps = {
  modal?: boolean;
};

const ModalEcaseHead: FC<ModalEcaseHeadProps> = ({ modal }) => {
  const dispatch = useDispatch();
  const isModalHeadEcaseVisible = useSelector(postSelector.getEcaseHeadModal);

  const onCloseClick = () => {
    dispatch(setEcaseHeadModalVisible(false));
  };

  const ECaseList = useSelector(profileSelectors.getECaseList);

  useEffect(() => {
    if (!ECaseList) {
      dispatch(getECaseListReducer());
    }
  }, [ECaseList]);

  const [activeModal, setActiveModal] = useState(false);

  const onScreenClick = () => {
    setActiveModal(false);
  };

  const EcaseData = [
    { name: '1. Company name', answer: ECaseList?.company_name },
    { name: '2. Company size ', answer: ECaseList?.company_size },
    { name: '3. Industries ', answer: ECaseList?.industry_choice },
    {
      name: '4. Already have a teach experience?',
      answer: ECaseList?.development_team
    },
    {
      name: '5. Willing to use outsiursing/ outstaffing',
      answer: ECaseList?.use_outsourcing
    },
    {
      name: '6. Project description ready?',
      answer: ECaseList?.description_project
    },
    {
      name: '7. Business requirements for the product',
      answer: ECaseList?.business_requirements
    },
    { name: '8. Technological stack:', answer: ECaseList?.technological_stack },
    {
      name: "9. Link to your competitor's project:",
      answer: ECaseList?.link_competitor
    },
    { name: '10. Start project ', answer: ECaseList?.start_project },
    {
      name: '11. Used outsiursing/outstaffing before',
      answer: ECaseList?.used_outsourcing
    }
  ];

  return (
    <div
      className={classNames(styles.wrapModal, {
        [styles.showModal]: isModalHeadEcaseVisible
      })}
      onClick={onCloseClick}>
      <div
        className={classNames(styles.modal, {
          [styles.activeModal]: isModalHeadEcaseVisible
        })}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
        <div className={styles.wrap}>
          <div className={styles.closeIcon}>
            <div className={styles.icon} onClick={onCloseClick}>
              <CloseModalIcon />
            </div>
          </div>

          <div className={styles.container}>
            <div className={styles.containerTitle}>E-case details</div>
            <div className={styles.containerEcaseData}>
              {EcaseData.map(({ name, answer }) => {
                return (
                  <div key={name} className={styles.containerAnswer}>
                    <div className={styles.name}>{name}</div>
                    <div className={styles.answer}>{answer}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEcaseHead;
