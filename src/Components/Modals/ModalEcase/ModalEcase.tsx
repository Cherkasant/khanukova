import { ChangeEvent, useEffect, useState } from 'react';

import 'react-dropdown/style.css';
import Dropdown from 'react-dropdown';

import classNames from 'classnames';
import { Cascader, List, Upload } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { CloseModalIcon } from '../../../Assets/icons/CloseModalIcon';
import { AttachmentIcon } from '../../../Assets/icons/AttachmentIcon';
import 'react-datepicker/dist/react-datepicker.css';

import { DownloadIcon } from '../../../Assets/icons/DownloadIcon';
import { setEcaseModalVisible } from '../../../Redux/Reducers/postReducer';
import { ClientsRequestStatus, Priority } from '../../constants/Modal/ModalData';
import PuzzleButton, { PuzzleButtonTypes } from '../../PuzzleButton';
import profileSelectors from '../../../Redux/Selectors/profileSelectors';
import { getECaseListReducer } from '../../../Redux/Reducers/profileReducer';
import postSelector from '../../../Redux/Selectors/postSelector';
import { ResponsibleCheckbox } from '../../FilteresPanel/FilterProjectScreen/constants';
import { ArrowDropDownIcon } from '../../../Assets/icons/ArrowDropDownIcon';

import styles from './ModalEcase.module.css';

const ModalEcase = () => {
  const dispatch = useDispatch();
  const onSaveClick = () => {
    dispatch(setEcaseModalVisible(false));
  };
  const isModalEcaseVisible = useSelector(postSelector.getEcaseModal);
  const ECaseList = useSelector(profileSelectors.getECaseList);

  useEffect(() => {
    if (!ECaseList) {
      dispatch(getECaseListReducer());
    }
  }, [ECaseList]);

  const [descriptionValue, setDescriptionValue] = useState('');
  const onChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionValue(event.target.value);
  };
  const [comment, setComment] = useState('');
  const onChangeComment = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const [priority, setPriority] = useState<any>(null);
  const [status, setStatus] = useState<any>(null);

  const onCancelClick = () => {
    dispatch(setEcaseModalVisible(false));
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
        [styles.showModal]: isModalEcaseVisible
      })}>
      <div
        className={classNames(styles.modal, {
          [styles.activeModal]: isModalEcaseVisible
        })}>
        <div className={styles.container}>
          <div className={styles.milestone}>{'E-case details'}</div>
          <div className={styles.icon} onClick={onCancelClick}>
            <CloseModalIcon />
          </div>
          <div className={styles.titleContainer}>{'opened 08/02/2023 '}</div>
        </div>
        <div className={styles.mainBlock}>
          <div className={styles.leftBlock}>
            <div className={styles.companyInfoBlock}>
              <List
                className={styles.list}
                dataSource={EcaseData}
                renderItem={(item) => (
                  <List.Item className={styles.listContainer} key={item.name}>
                    <div className={styles.nameList}>{item.name}</div>
                    <div className={styles.answerList}>{item.answer}</div>
                  </List.Item>
                )}
              />
            </div>
            <div className={styles.descriptionContainer}>
              <div className={styles.title}>{'Description'}</div>
              <textarea
                className={styles.descriptionInput}
                placeholder={'Write'}
                value={descriptionValue}
                onChange={onChangeDescription}
              />
              <PuzzleButton
                title={'Submit new'}
                type={PuzzleButtonTypes.TextButton}
                className={styles.submitBtn}
                disabled={!descriptionValue}
              />
            </div>

            <div className={styles.attachmentContainer}>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture"
                className="upload-list-inline">
                <div className={styles.attachmentBlock}>
                  <div className={styles.title}>{'Attachment'}</div>
                  <AttachmentIcon />
                </div>
              </Upload>
            </div>
            <div className={styles.blockDownload}>
              <div className={styles.downloadBtn}>
                {'Download all'}
                <DownloadIcon />
              </div>
            </div>
            <div className={styles.commentContainer}>
              <div className={styles.title}>{'Comments'}</div>
              <textarea
                className={styles.commentInput}
                placeholder={'Write comment'}
                value={comment}
                onChange={onChangeComment}
              />
              <PuzzleButton
                title={'Comment'}
                type={PuzzleButtonTypes.TextButton}
                className={styles.submitBtn}
                disabled={!comment}
              />
            </div>
          </div>

          <div className={styles.rightBlock}>
            <div className={styles.inputsBlock}>
              <div>
                <div className={styles.title}>{'Responsible'}</div>
                <Cascader
                  options={ResponsibleCheckbox}
                  multiple={true}
                  className={styles.cascader}
                  popupClassName={styles.popup}
                  placeholder={'Add responsible'}
                  maxTagCount={'responsive'}
                  showArrow={true}
                  suffixIcon={<ArrowDropDownIcon />}
                />
              </div>
              <div>
                <div className={styles.title}>{'Priority'}</div>
                <Dropdown
                  options={Priority}
                  onChange={setPriority}
                  value={priority}
                  placeholder="Select priority"
                  className={styles.dropdownContainer}
                  controlClassName={styles.dropdownControl}
                  placeholderClassName={styles.dropdownPlaceholder}
                  arrowClosed={<span className={styles.arrowClosed} />}
                  arrowOpen={<span className={styles.arrowOpen} />}
                  menuClassName={styles.dropdownMenu}
                />
              </div>
              <div>
                <div className={styles.title}>{'Status'}</div>
                <Dropdown
                  options={ClientsRequestStatus}
                  onChange={setStatus}
                  value={status}
                  placeholder="Nothing selected"
                  className={styles.dropdownContainer}
                  controlClassName={styles.dropdownControl}
                  placeholderClassName={styles.dropdownPlaceholder}
                  arrowClosed={<span className={styles.arrowClosed} />}
                  arrowOpen={<span className={styles.arrowOpen} />}
                  menuClassName={styles.dropdownMenu}
                />
              </div>
            </div>
            <div>
              <div className={styles.buttonsContainer}>
                <PuzzleButton
                  btnTitle={'Cancel'}
                  btnType={PuzzleButtonTypes.TextButton}
                  btnClassName={styles.cancelBtn}
                  onClick={onCancelClick}
                />
                <PuzzleButton
                  btnTitle={'Save'}
                  btnType={PuzzleButtonTypes.TextButton}
                  btnClassName={styles.saveBtn}
                  onClick={onSaveClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEcase;
