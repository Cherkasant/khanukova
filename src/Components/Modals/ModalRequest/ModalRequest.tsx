import React, { ChangeEvent, useState } from 'react';
import 'react-dropdown/style.css';
import Dropdown from 'react-dropdown';
import classNames from 'classnames';
import { Cascader, Upload } from 'antd';

import { useDispatch, useSelector } from 'react-redux';

import { CloseModalIcon } from '../../../Assets/icons/CloseModalIcon';
import { AttachmentIcon } from '../../../Assets/icons/AttachmentIcon';
import { DownloadIcon } from '../../../Assets/icons/DownloadIcon';
import 'react-datepicker/dist/react-datepicker.css';
import { setRequestModalVisible } from '../../../Redux/Reducers/postReducer';
import { ClientsRequestStatus, Priority } from '../../constants/Modal/ModalData';
import postSelector from '../../../Redux/Selectors/postSelector';
import PuzzleButton, { PuzzleButtonTypes } from '../../PuzzleButton';
import { LabelCheckbox } from '../../FilteresPanel/FilterProjectScreen/constants';
import { ArrowDropDownIcon } from '../../../Assets/Table/ArrowDropDownIcon';

import { Close } from '../../../Assets/Table/Close';

import styles from './ModalRequest.module.css';

const ModalRequest = () => {
  const dispatch = useDispatch();
  const titleRequest = useSelector(postSelector.getRequestTitle);
  const isModalRequestVisible = useSelector(postSelector.getRequestModal);
  const onSaveClick = () => {
    dispatch(setRequestModalVisible(false));
  };

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
    dispatch(setRequestModalVisible(false));
  };
  return (
    <div
      className={classNames(styles.wrapModal, {
        [styles.showModal]: isModalRequestVisible
      })}>
      <div
        className={classNames(styles.modal, {
          [styles.activeModal]: isModalRequestVisible
        })}>
        <div className={styles.container}>
          <div className={styles.milestone}>{titleRequest}</div>
          <div className={styles.icon} onClick={onCancelClick}>
            <CloseModalIcon />
          </div>
          <div className={styles.titleContainer}>{'opened 08/02/2023 '}</div>
        </div>
        <div className={styles.mainBlock}>
          <div className={styles.leftBlock}>
            <div className={styles.descriptionContainer}>
              <div className={styles.title}>{'Description'}</div>
              <textarea
                className={styles.descriptionInput}
                placeholder={'Write'}
                value={descriptionValue}
                onChange={onChangeDescription}
              />
              <PuzzleButton
                btnTitle={'Submit new'}
                btnType={PuzzleButtonTypes.TextButton}
                btnClassName={styles.submitBtn}
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
                btnTitle={'Comment'}
                btnType={PuzzleButtonTypes.TextButton}
                btnClassName={styles.submitBtn}
              />
            </div>
          </div>
          <div className={styles.rightBlock}>
            <div className={styles.inputsBlock}>
              <div className={styles.titleBox}>
                <div className={styles.title}>{'Responsible'}</div>
                <Cascader
                  options={LabelCheckbox}
                  multiple={true}
                  className={styles.cascader}
                  popupClassName={styles.popup}
                  placeholder={'Add responsible'}
                  maxTagCount={'responsive'}
                  showArrow={true}
                  suffixIcon={<ArrowDropDownIcon />}
                />
              </div>
              <div className={styles.titleBox}>
                <div className={styles.title}>{'Priority'}</div>
                <Dropdown
                  options={Priority}
                  onChange={setPriority}
                  value={priority}
                  placeholder="Select priority"
                  className={styles.dropdownContainer}
                  controlClassName={styles.dropdownControl}
                  placeholderClassName={styles.dropdownPlaceholder}
                  arrowClosed={<ArrowDropDownIcon />}
                  arrowOpen={<Close />}
                  menuClassName={styles.dropdownMenu}
                />
              </div>
              <div className={styles.titleBox}>
                <div className={styles.title}>{'Status'}</div>
                <Dropdown
                  options={ClientsRequestStatus}
                  onChange={setStatus}
                  value={status}
                  placeholder="Nothing selected"
                  className={styles.dropdownContainer}
                  controlClassName={styles.dropdownControl}
                  placeholderClassName={styles.dropdownPlaceholder}
                  arrowClosed={<ArrowDropDownIcon />}
                  arrowOpen={<Close />}
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

export default ModalRequest;
