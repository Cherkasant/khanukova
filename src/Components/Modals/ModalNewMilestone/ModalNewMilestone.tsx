import type { DatePickerProps } from 'antd';

import { Cascader, DatePicker, Upload } from 'antd';
import 'antd/README.md';
import classNames from 'classnames';
import React, { ChangeEvent, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { ArrowDropDownIcon } from '../../../Assets/Table/ArrowDropDownIcon';
import { AttachmentIcon } from '../../../Assets/icons/AttachmentIcon';
import { CalendarIcon } from '../../../Assets/icons/CalendarIcon';
import { CloseModalIcon } from '../../../Assets/icons/CloseModalIcon';
import { DownloadIcon } from '../../../Assets/icons/DownloadIcon';
import { EditTitleIcon } from '../../../Assets/icons/EditTitleIcon';
import {
  getAllNotCreatedMilestoneDependencies,
  getSingleProjectData,
  postMilestoneCard,
  setSelectedModalVisible
} from '../../../Redux/Reducers/postReducer';
import postSelector from '../../../Redux/Selectors/postSelector';
import Input from '../../Input';
import PuzzleButton, { PuzzleButtonTypes } from '../../PuzzleButton';
import { Colors, Dependence, PaymentStatus, Priority, Progress, Status } from '../../constants/Modal/ModalData';

import { Close } from '../../../Assets/Table/Close';

import styles from './ModalNewMilestone.module.css';

const ModalNewMilestone = () => {
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();
  const allResponsible = useSelector(postSelector.getAllResponsible);
  const checkbox = allResponsible.map((el) => {
    return { value: el.nickname, label: el.nickname };
  });
  const projectTitle = useSelector(postSelector.getProjectTitle);
  const singleProject = useSelector(postSelector.getSingleProject);
  const isVisible = useSelector(postSelector.getModal);
  const allMilestoneDependencies = useSelector(postSelector.getAllNotCreatedMilestoneDependencies);
  const ArrayOfDependencies = allMilestoneDependencies.map((el) => {
    return { value: el.id, label: el.milestone_name };
  });

  const onSaveClick = () => {
    dispatch(
      postMilestoneCard({
        data: {
          milestone_name: title,
          description: descriptionValue,
          attachment: null,
          responsible_data: [],
          priority: priority.value,
          start_date: launchDate,
          deadline: deadline,
          duration: duration,
          labels: label,
          color_labels: colors.value,
          dependence:
            dependence.length === 0
              ? []
              : dependence
                  .toString()
                  .split(',')
                  .map((el: string) => parseInt(el)),
          progress: +progress.value,
          status: status.value,
          payment_status: paymentStatus.value,
          project: singleProject?.id
        },
        callback: () => {
          if (id) {
            dispatch(getSingleProjectData(+id));
          }
        }
      })
    );
    dispatch(setSelectedModalVisible(false));
  };
  const [attachment, setAttachment] = useState('');
  const [launchDate, setLaunchDate] = useState('');
  const [deadline, setDeadline] = useState('');
  const [label, setLabel] = useState('');
  const [duration, setDuration] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');

  const onChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionValue(event.target.value);
  };
  const [comment, setComment] = useState('');
  const onChangeComment = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };
  const [responsible, setResponsible] = useState<any>(null);
  const [priority, setPriority] = useState<any>(null);
  const [status, setStatus] = useState<any>(null);
  const [paymentStatus, setPaymentStatus] = useState<any>(null);
  const [dependence, setDependence] = useState<any>([]);
  const [progress, setProgress] = useState<any>(null);
  const [colors, setColors] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [edit, setEdit] = useState(false);

  const onEditClick = () => {
    setEdit(!edit);
  };
  const onCancelClick = () => {
    dispatch(setSelectedModalVisible(false));
  };
  useEffect(() => {
    setEdit(false);
    if (singleProject) {
      dispatch(getAllNotCreatedMilestoneDependencies({ id: singleProject?.id }));
    }
  }, [singleProject]);

  const onChangeDeadline: DatePickerProps['onChange'] = (date, dateString) => {
    setDeadline(dateString);
  };
  const onChangeLaunch: DatePickerProps['onChange'] = (date, dateString) => {
    setLaunchDate(dateString);
  };

  return (
    <div
      className={classNames(styles.wrapModal, {
        [styles.showModal]: isVisible
      })}>
      <div
        className={classNames(styles.modal, {
          [styles.activeModal]: isVisible
        })}>
        <div className={styles.container}>
          <div className={styles.milestone}>{projectTitle}</div>

          <div className={styles.icon} onClick={onCancelClick}>
            <CloseModalIcon />
          </div>
          <div className={styles.titleContainer}>
            <Input
              value={title}
              onChange={(value) => setTitle(value)}
              className={classNames(styles.titleInput, { [styles.widthInput]: edit })}
              placeholder={'New milestone'}
              disabled={!edit}
            />
            {!edit ? (
              <div className={styles.editIcon} onClick={onEditClick}>
                <EditTitleIcon />
              </div>
            ) : null}
          </div>
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
            </div>

            <div className={styles.attachmentContainer}>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture"
                className="upload-list-inline"
                onChange={(info) => setAttachment(info.file.name)}>
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
          </div>

          <div className={styles.rightBlock}>
            <div className={styles.title}>{'Responsible'}</div>
            <div className={styles.inputsBlock}>
              <div>
                <Cascader
                  options={checkbox}
                  multiple={true}
                  onChange={setResponsible}
                  value={responsible}
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
                  arrowClosed={<ArrowDropDownIcon />}
                  arrowOpen={<Close />}
                />
              </div>
              <div className={styles.startDateContainer}>
                <div className={styles.title}>{'Start date'}</div>
                <DatePicker
                  format="DD.MM.YYYY"
                  placeholder="None"
                  suffixIcon={<CalendarIcon />}
                  className={styles.datepicker}
                  onChange={onChangeLaunch}
                />
              </div>

              <div className={styles.startDateContainer}>
                <div className={styles.startDateContainer}>
                  <div className={styles.title}>{'Deadline'}</div>
                  <DatePicker
                    format="DD.MM.YYYY"
                    placeholder="None"
                    suffixIcon={<CalendarIcon />}
                    className={styles.datepicker}
                    onChange={onChangeDeadline}
                  />
                </div>
              </div>
              <div>
                <div className={styles.title}>{'Duration'}</div>
                <Input
                  value={duration}
                  onChange={(value) => setDuration(value)}
                  type={'text'}
                  className={styles.label}
                  placeholder={'Enter duration,h'}
                />
              </div>
              <div>
                <div className={styles.title}>{'Labels'}</div>
                <Input
                  value={label}
                  onChange={(value) => setLabel(value)}
                  type={'text'}
                  className={styles.label}
                  placeholder={'Enter labels'}
                />
              </div>
              <div>
                <div className={styles.title}>{'Color labels'}</div>
                <Dropdown
                  options={Colors}
                  onChange={setColors}
                  value={colors}
                  placeholder="Select color"
                  className={styles.dropdownContainer}
                  controlClassName={styles.dropdownControl}
                  placeholderClassName={styles.dropdownPlaceholder}
                  arrowClosed={<ArrowDropDownIcon />}
                  arrowOpen={<Close />}
                />
              </div>
              <div>
                <div className={styles.title}>{'Dependence'}</div>
                <Cascader
                  options={ArrayOfDependencies}
                  multiple={true}
                  onChange={setDependence}
                  defaultValue={[]}
                  value={dependence}
                  className={styles.cascader}
                  popupClassName={styles.popup}
                  placeholder={'Select'}
                  maxTagCount={'responsive'}
                  showArrow={true}
                  suffixIcon={<ArrowDropDownIcon />}
                />
              </div>
              <div>
                <div className={styles.title}>{'Progress'}</div>
                <Dropdown
                  options={Progress}
                  onChange={setProgress}
                  value={progress}
                  placeholder={'Select progress'}
                  className={styles.dropdownContainer}
                  controlClassName={styles.dropdownControl}
                  placeholderClassName={styles.dropdownPlaceholder}
                  arrowClosed={<ArrowDropDownIcon />}
                  arrowOpen={<Close />}
                />
              </div>
              <div>
                <div className={styles.title}>{'Status'}</div>
                <Dropdown
                  options={Status}
                  onChange={setStatus}
                  value={status}
                  placeholder={'Select status'}
                  className={styles.dropdownContainer}
                  controlClassName={styles.dropdownControl}
                  placeholderClassName={styles.dropdownPlaceholder}
                  arrowClosed={<ArrowDropDownIcon />}
                  arrowOpen={<Close />}
                />
              </div>
              <div>
                <div className={styles.title}>{'Payment status'}</div>
                <Dropdown
                  options={PaymentStatus}
                  onChange={setPaymentStatus}
                  value={paymentStatus}
                  placeholder={'Select status'}
                  className={styles.dropdownContainer}
                  controlClassName={styles.dropdownControl}
                  placeholderClassName={styles.dropdownPlaceholder}
                  arrowClosed={<ArrowDropDownIcon />}
                  arrowOpen={<Close />}
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

export default ModalNewMilestone;
