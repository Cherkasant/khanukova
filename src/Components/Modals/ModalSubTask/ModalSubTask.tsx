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

import dayjs, { Dayjs } from 'dayjs';

import { ArrowDropDownIcon } from '../../../Assets/Table/ArrowDropDownIcon';
import { AttachmentIcon } from '../../../Assets/icons/AttachmentIcon';
import { CalendarIcon } from '../../../Assets/icons/CalendarIcon';
import { CloseModalIcon } from '../../../Assets/icons/CloseModalIcon';
import { DeleteIcon } from '../../../Assets/icons/DeleteIcon';
import { DownloadIcon } from '../../../Assets/icons/DownloadIcon';
import { EditTitleIcon } from '../../../Assets/icons/EditTitleIcon';
import { deleteTask, getSingleProject, patchSubTask, setModalSubTask } from '../../../Redux/Reducers/postReducer';
import postSelector from '../../../Redux/Selectors/postSelector';
import { ResponsibleCheckbox } from '../../FilteresPanel/FilterProjectScreen/constants';
import Input from '../../Input';
import PuzzleButton, { PuzzleButtonTypes } from '../../PuzzleButton';
import { Colors, Dependence, PaymentStatus, Priority, Progress, Status } from '../../constants/Modal/ModalData';

import { Close } from '../../../Assets/Table/Close';

import {
  deleteSubTaskComment,
  getAllMilestoneComments,
  getSingleMilestoneComment,
  patchSubTaskComment,
  postMilestoneComment
} from '../../../Redux/Reducers/commentReducer';
import commentsSelector from '../../../Redux/Selectors/commentsSelector';

import profileSelectors from '../../../Redux/Selectors/profileSelectors';
import { Role } from '../../constants/@types';

import styles from './ModalSubTask.module.css';

const ModalSubTask = () => {
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();
  const singleMilestoneComment = useSelector(commentsSelector.getSingleMilestoneComment);
  const singleProject = useSelector(postSelector.getSingleProject);
  const isVisible = useSelector(postSelector.getModalSubTask);
  const singleSubTask = useSelector(postSelector.getSingleSubTask);
  const singleMilestone = useSelector(postSelector.getSingleMilestone);
  const singleTask = useSelector(postSelector.getSingleTask);
  const commentsMilestone = useSelector(commentsSelector.getAllMilestoneComments);
  const SUBTASK_COMMENTS = commentsMilestone.filter((el) => el.subtask === singleSubTask?.id);
  const [editButton, setEditButton] = useState(false);
  useEffect(() => {
    if (singleMilestoneComment) {
      setComment(singleMilestoneComment?.comment);
      setEditButton(true);
    }
  }, [singleMilestoneComment]);
  useEffect(() => {
    if (singleSubTask) {
      const progress = singleSubTask?.progress.toString();
      setTitle(singleSubTask?.sub_task_name);
      setDescriptionValue(singleSubTask?.description);
      setLaunchDate(singleSubTask?.start_date);
      setDeadline(singleSubTask?.deadline);
      setPriority(singleSubTask?.priority);
      setDuration(singleSubTask?.duration);
      setLabel(singleSubTask?.labels);
      setColors(singleSubTask?.color_labels);
      setProgress(progress);
      setStatus(singleSubTask?.status);
      setPaymentStatus(singleSubTask?.payment_status);
      setLaunchDate(singleSubTask?.start_date);
      setDeadline(singleSubTask?.deadline);
      // dispatch(getAllMilestoneComments(singleMilestone?.id));
    }
  }, [singleSubTask]);

  const onSaveClick = () => {
    if (singleSubTask) {
      dispatch(
        patchSubTask({
          id: singleSubTask?.id,
          data: {
            sub_task_name: title,
            description: descriptionValue,
            attachment: null,
            responsible: [],
            priority: priority.value,
            start_date: launchDate,
            deadline: deadline,
            duration: duration,
            labels: label,
            color_labels: colors.value,
            dependence: [],
            progress: progress.value,
            status: status.value,
            payment_status: paymentStatus.value,
            project: singleProject?.id,
            task: singleSubTask?.task
          },
          callback: () => {
            if (id) {
              dispatch(getSingleProject(+id));
              dispatch(setModalSubTask(false));
            }
          }
        })
      );
    }
  };
  const [attachment, setAttachment] = useState('');
  const [launchDate, setLaunchDate] = useState('');
  const [deadline, setDeadline] = useState<any>('');
  const [label, setLabel] = useState<any>('');
  const [duration, setDuration] = useState<any>('');
  const [descriptionValue, setDescriptionValue] = useState<any>('');

  const onChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionValue(event.target.value);
  };
  const [comment, setComment] = useState('');
  const onChangeComment = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };
  const onCommentClick = () => {
    if (singleTask && singleMilestone && singleSubTask) {
      dispatch(
        postMilestoneComment({
          comment: comment,
          milestone: singleMilestone?.id,
          task: singleTask?.id,
          subtask: singleSubTask?.id
        })
      );
      dispatch(getAllMilestoneComments(singleMilestone?.id));
      setComment('');
    }
  };
  const onDeleteCommentClick = (id: number) => {
    if (singleSubTask && singleMilestone) {
      dispatch(
        deleteSubTaskComment({
          id: id,
          idSubTask: singleSubTask?.id,
          callback: () => {
            dispatch(getAllMilestoneComments(singleMilestone?.id));
          }
        })
      );
    }
  };
  const onEditCommentClick = (id: number) => {
    if (singleMilestone) {
      dispatch(getSingleMilestoneComment({ id: id, idMilestone: singleMilestone?.id }));
    }
  };
  const onEditButtonClick = () => {
    if (singleMilestone && singleMilestoneComment && singleTask && singleSubTask) {
      dispatch(
        patchSubTaskComment({
          id: singleMilestoneComment?.id,
          idSubTask: singleMilestone?.id,
          data: { comment: comment, milestone: singleMilestone?.id, task: singleTask?.id, subtask: singleSubTask?.id },
          callback: () => {
            dispatch(getAllMilestoneComments(singleMilestone?.id));
          }
        })
      );
    }
    setComment('');
  };

  const personalInfoList = useSelector(profileSelectors.getPersonalInfo);
  const isDevTeam = personalInfoList?.role[0] === Role.DevTeam;

  const [priority, setPriority] = useState<any>(null);
  const [status, setStatus] = useState<any>(null);
  const [paymentStatus, setPaymentStatus] = useState<any>(null);
  const [dependence, setDependence] = useState<any>(null);
  const [progress, setProgress] = useState<any>(null);
  const [colors, setColors] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [edit, setEdit] = useState(false);
  const onEditClick = () => {
    setEdit(!edit);
  };
  const onCancelClick = () => {
    dispatch(setModalSubTask(false));
  };
  useEffect(() => {
    setEdit(false);
    // setTitle('Title');
  }, []);

  const onChangeDeadline: DatePickerProps['onChange'] = (date: Dayjs | null) => {
    setFinishDate(date);
  };
  const onChangeLaunch: DatePickerProps['onChange'] = (date: Dayjs | null) => {
    setStartDate(date);
  };
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(new Date()));
  const [finishDate, setFinishDate] = useState<Dayjs | null>(dayjs(new Date()));
  useEffect(() => {
    if (startDate) {
      setLaunchDate(startDate?.format('DD.MM.YYYY'));
    }
    if (finishDate) {
      setDeadline(finishDate?.format('DD.MM.YYYY'));
    }
  }, [startDate, finishDate]);

  const onDeleteSubTaskClick = () => {
    if (singleSubTask) {
      dispatch(
        deleteTask({
          id: singleSubTask?.id,
          callback: () => {
            if (id) {
              dispatch(getSingleProject(+id));
              dispatch(setModalSubTask(false));
            }
          }
        })
      );
    }
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
          <div className={styles.milestone}>
            <div className={styles.projectTitleBlock}>
              {singleProject?.project_name}
              <div className={styles.deleteContainer} onClick={onDeleteSubTaskClick}>
                <DeleteIcon />
                {'Delete from project'}
              </div>
            </div>
            <div className={styles.icon} onClick={onCancelClick}>
              <CloseModalIcon />
            </div>
          </div>
          <div className={styles.titleContainer}>
            {!edit ? (
              <div className={styles.titleDiv}>{title}</div>
            ) : (
              <Input
                value={title}
                onChange={(value) => setTitle(value)}
                className={styles.titleInput}
                placeholder={'Title'}
                disabled={!edit}
              />
            )}
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
                className={classNames(styles.descriptionInput, {
                  [styles.disabled]: isDevTeam
                })}
                placeholder={'Write'}
                value={descriptionValue}
                onChange={onChangeDescription}
                disabled={isDevTeam}
              />
              {/*<PuzzleButton*/}
              {/*  title={"Submit new"}*/}
              {/*  type={PuzzleButtonTypes.TextButton}*/}
              {/*  className={styles.submitBtn}*/}
              {/*  disabled={!descriptionValue}*/}
              {/*/>*/}
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
            <div className={styles.commentContainer}>
              <div className={styles.title}>{'Comments'}</div>
              <div className={styles.commentList}>
                {SUBTASK_COMMENTS.map((el) => (
                  <div key={el.id} className={styles.commentBlock}>
                    <div className={styles.commentHeader}>
                      <div className={styles.avatarContainer}>
                        <div className={styles.commentAvatar}>{'NB'}</div>
                        <div className={styles.commentOwner}>{'Nina Beta'}</div>
                      </div>
                      <div className={styles.editContainer}>
                        <div className={styles.editButton} onClick={() => onEditCommentClick(el.id)}>
                          {'Edit'}
                        </div>
                        <div className={styles.editButton} onClick={() => onDeleteCommentClick(el.id)}>
                          {'Delete'}
                        </div>
                      </div>
                    </div>
                    <div className={styles.textComment}>{el.comment}</div>
                  </div>
                ))}
              </div>
              <textarea
                className={styles.commentInput}
                placeholder={'Write comment'}
                value={comment}
                onChange={onChangeComment}
              />
              <div className={styles.commentsButton}>
                {editButton ? (
                  <PuzzleButton
                    btnTitle={'Edit'}
                    btnType={PuzzleButtonTypes.TextButton}
                    btnClassName={styles.submitBtn}
                    onClick={onEditButtonClick}
                  />
                ) : null}
                <PuzzleButton
                  btnTitle={'Comment'}
                  btnType={PuzzleButtonTypes.TextButton}
                  btnClassName={styles.submitBtn}
                  onClick={onCommentClick}
                />
              </div>
            </div>
          </div>

          <div className={styles.rightBlock}>
            <div className={styles.title}>{'Responsible'}</div>
            <div className={styles.inputsBlock}>
              <div>
                <Cascader
                  options={ResponsibleCheckbox}
                  multiple={true}
                  className={classNames(styles.cascader, { [styles.disabledCascader]: isDevTeam })}
                  popupClassName={styles.popup}
                  placeholder={'Add responsible'}
                  maxTagCount={'responsive'}
                  showArrow={true}
                  suffixIcon={!isDevTeam ? <ArrowDropDownIcon /> : null}
                  disabled={isDevTeam}
                />
              </div>
              <div>
                <div className={styles.title}>{'Priority'}</div>
                <Dropdown
                  options={Priority}
                  onChange={setPriority}
                  value={priority}
                  placeholder="Nothing selected"
                  className={styles.dropdownContainer}
                  controlClassName={classNames(styles.dropdownControl, { [styles.disabledInput]: isDevTeam })}
                  placeholderClassName={styles.dropdownPlaceholder}
                  arrowClosed={!isDevTeam ? <ArrowDropDownIcon /> : null}
                  arrowOpen={!isDevTeam ? <Close /> : null}
                  menuClassName={styles.dropdownMenu}
                  disabled={isDevTeam}
                />
              </div>
              <div className={styles.startDateContainer}>
                <div className={styles.title}>{'Start date'}</div>
                <DatePicker
                  value={dayjs(launchDate, 'DD.MM.YYYY')}
                  format="DD.MM.YYYY"
                  placeholder="Nothing selected"
                  suffixIcon={!isDevTeam ? <CalendarIcon /> : null}
                  className={classNames(styles.datepicker, { [styles.disabledDatepicker]: isDevTeam })}
                  onChange={onChangeLaunch}
                  disabled={isDevTeam}
                />
              </div>

              <div className={styles.startDateContainer}>
                <div className={styles.startDateContainer}>
                  <div className={styles.title}>{'Deadline'}</div>
                  <DatePicker
                    value={dayjs(deadline, 'DD.MM.YYYY')}
                    format="DD.MM.YYYY"
                    placeholder="Nothing selected"
                    suffixIcon={!isDevTeam ? <CalendarIcon /> : null}
                    className={classNames(styles.datepicker, { [styles.disabledDatepicker]: isDevTeam })}
                    onChange={onChangeDeadline}
                    disabled={isDevTeam}
                  />
                </div>
              </div>
              <div>
                <div className={styles.title}>{'Duration'}</div>
                <Input
                  value={duration}
                  onChange={(value) => setDuration(value)}
                  type={'text'}
                  className={classNames(styles.label, { [styles.disabledSelect]: isDevTeam })}
                  placeholder={'Enter duration'}
                  disabled={isDevTeam}
                />
              </div>
              <div>
                <div className={styles.title}>{'Labels'}</div>
                <Input
                  value={label}
                  onChange={(value) => setLabel(value)}
                  type={'text'}
                  className={classNames(styles.label, { [styles.disabledSelect]: isDevTeam })}
                  placeholder={'Enter labels'}
                  disabled={isDevTeam}
                />
              </div>
              <div>
                <div className={styles.title}>{'Color labels'}</div>

                <Dropdown
                  options={Colors}
                  onChange={setColors}
                  value={colors}
                  placeholder="Nothing selected"
                  className={styles.dropdownContainer}
                  controlClassName={classNames(styles.dropdownControl, { [styles.disabledInput]: isDevTeam })}
                  placeholderClassName={styles.dropdownPlaceholder}
                  arrowClosed={!isDevTeam ? <ArrowDropDownIcon /> : null}
                  arrowOpen={!isDevTeam ? <Close /> : null}
                  menuClassName={styles.dropdownMenu}
                  disabled={isDevTeam}
                />
              </div>
              <div>
                <div className={styles.title}>{'Dependence'}</div>
                <Dropdown
                  options={Dependence}
                  onChange={setDependence}
                  value={dependence}
                  placeholder="Nothing selected"
                  className={styles.dropdownContainer}
                  controlClassName={classNames(styles.dropdownControl, { [styles.disabledInput]: isDevTeam })}
                  placeholderClassName={styles.dropdownPlaceholder}
                  arrowClosed={!isDevTeam ? <ArrowDropDownIcon /> : null}
                  arrowOpen={!isDevTeam ? <Close /> : null}
                  menuClassName={styles.dropdownMenu}
                  disabled={isDevTeam}
                />
              </div>
              <div>
                <div className={styles.title}>{'Progress'}</div>
                <Dropdown
                  options={Progress}
                  onChange={setProgress}
                  value={progress}
                  placeholder="Nothing selected"
                  className={styles.dropdownContainer}
                  controlClassName={classNames(styles.dropdownControl, { [styles.disabledInput]: isDevTeam })}
                  placeholderClassName={styles.dropdownPlaceholder}
                  arrowClosed={!isDevTeam ? <ArrowDropDownIcon /> : null}
                  arrowOpen={!isDevTeam ? <Close /> : null}
                  disabled={isDevTeam}
                />
              </div>
              <div>
                <div className={styles.title}>{'Status'}</div>
                <Dropdown
                  options={Status}
                  onChange={setStatus}
                  value={status}
                  placeholder="Nothing selected"
                  className={styles.dropdownContainer}
                  controlClassName={classNames(styles.dropdownControl, { [styles.disabledInput]: isDevTeam })}
                  placeholderClassName={styles.dropdownPlaceholder}
                  arrowClosed={!isDevTeam ? <ArrowDropDownIcon /> : null}
                  arrowOpen={!isDevTeam ? <Close /> : null}
                  disabled={isDevTeam}
                />
              </div>
              <div>
                <div className={styles.title}>{'Payment status'}</div>
                <Dropdown
                  options={PaymentStatus}
                  onChange={setPaymentStatus}
                  value={paymentStatus}
                  placeholder="Select status"
                  className={styles.dropdownContainer}
                  controlClassName={classNames(styles.dropdownControl, { [styles.disabledInput]: isDevTeam })}
                  placeholderClassName={styles.dropdownPlaceholder}
                  arrowClosed={!isDevTeam ? <ArrowDropDownIcon /> : null}
                  arrowOpen={!isDevTeam ? <Close /> : null}
                  disabled={isDevTeam}
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

export default ModalSubTask;
