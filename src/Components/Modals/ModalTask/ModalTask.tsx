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
import {
  deleteTask,
  getAllTaskDependencies,
  getSingleProject,
  patchTask,
  setModalTask
} from '../../../Redux/Reducers/postReducer';
import postSelector from '../../../Redux/Selectors/postSelector';
import { ResponsibleCheckbox } from '../../FilteresPanel/FilterProjectScreen/constants';
import Input from '../../Input';
import PuzzleButton, { PuzzleButtonTypes } from '../../PuzzleButton';

import { Colors, Dependence, PaymentStatus, Priority, Progress, Status } from '../../constants/Modal/ModalData';

import { Close } from '../../../Assets/Table/Close';

import {
  deleteTaskComment,
  getAllMilestoneComments,
  getAllTaskComments,
  getSingleMilestoneComment,
  patchTaskComment,
  postMilestoneComment
} from '../../../Redux/Reducers/commentReducer';

import commentsSelector from '../../../Redux/Selectors/commentsSelector';

import profileSelectors from '../../../Redux/Selectors/profileSelectors';
import { Role } from '../../constants/@types';

import styles from './ModalTask.module.css';

const ModalTask = () => {
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();

  const personalInfoList = useSelector(profileSelectors.getPersonalInfo);
  const isDevTeam = personalInfoList?.role[0] === Role.DevTeam;

  const singleMilestoneComment = useSelector(commentsSelector.getSingleMilestoneComment);
  const singleProject = useSelector(postSelector.getSingleProject);
  const isVisible = useSelector(postSelector.getModalTask);
  const singleMilestone = useSelector(postSelector.getSingleMilestone);
  const singleTask = useSelector(postSelector.getSingleTask);
  const commentsMilestone = useSelector(commentsSelector.getAllMilestoneComments);
  const TASK_COMMENTS = commentsMilestone.filter((el) => el.task === singleTask?.id && el.subtask === null);
  const [editButton, setEditButton] = useState(false);

  const allTaskDependencies = useSelector(postSelector.getAllTaskDependencies);
  const ArrayOfDependencies = allTaskDependencies.map((el) => {
    return { value: el.id, label: el.task_name };
  });

  useEffect(() => {
    if (singleMilestoneComment) {
      setComment(singleMilestoneComment?.comment);
      setEditButton(true);
    }
  }, [singleMilestoneComment]);
  useEffect(() => {
    if (singleTask) {
      const progress = singleTask?.progress.toString();
      setTitle(singleTask?.task_name);
      setDescriptionValue(singleTask?.description);
      setLaunchDate(singleTask?.start_date);
      setDeadline(singleTask?.deadline);
      setPriority(singleTask?.priority);
      setDuration(singleTask?.duration);
      setLabel(singleTask?.labels);
      setColors(singleTask?.color_labels);
      setProgress(progress);
      setStatus(singleTask?.status);
      setPaymentStatus(singleTask?.payment_status);
      setLaunchDate(singleTask?.start_date);
      setDeadline(singleTask?.deadline);
      dispatch(getAllTaskComments(singleTask?.id));
    }
  }, [singleTask]);

  const onSaveClick = () => {
    if (singleTask) {
      dispatch(
        patchTask({
          id: singleTask?.id,
          data: {
            task_name: title,
            description: descriptionValue,
            attachment: null,
            responsible: [],
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
            progress: progress.value,
            status: status.value,
            payment_status: paymentStatus.value,
            project: singleProject?.id,
            milestone: singleTask?.milestone
          },
          callback: () => {
            if (id) {
              dispatch(getSingleProject(+id));
              dispatch(setModalTask(false));
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
    if (singleTask && singleMilestone) {
      dispatch(postMilestoneComment({ comment: comment, milestone: singleMilestone?.id, task: singleTask?.id }));
      dispatch(getAllMilestoneComments(singleMilestone?.id));
      setComment('');
    }
  };
  const onDeleteCommentClick = (id: number) => {
    if (singleTask && singleMilestone) {
      dispatch(
        deleteTaskComment({
          id: id,
          idTask: singleTask?.id,
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
    if (singleMilestone && singleMilestoneComment && singleTask) {
      dispatch(
        patchTaskComment({
          id: singleMilestoneComment?.id,
          idTask: singleTask?.id,
          data: { comment: comment, milestone: singleMilestone?.id, task: singleTask?.id },
          callback: () => {
            dispatch(getAllMilestoneComments(singleMilestone?.id));
          }
        })
      );
    }
    setComment('');
  };

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
    dispatch(setModalTask(false));
  };
  useEffect(() => {
    setEdit(false);
    if (singleProject && singleTask) {
      dispatch(getAllTaskDependencies({ id: singleProject?.id, TaskId: singleTask?.id }));
    }
  }, [singleProject, singleTask]);

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
  const onDeleteTaskClick = () => {
    if (singleTask) {
      dispatch(
        deleteTask({
          id: singleTask?.id,
          callback: () => {
            if (id) {
              dispatch(getSingleProject(+id));
              dispatch(setModalTask(false));
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
              <div className={styles.deleteContainer} onClick={onDeleteTaskClick}>
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
                {TASK_COMMENTS.map((el) => (
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
                  disabled={isDevTeam}
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
                  className={classNames(styles.cascader, { [styles.disabledCascader]: isDevTeam })}
                  popupClassName={styles.popup}
                  placeholder={'Add dependence'}
                  maxTagCount={'responsive'}
                  showArrow={true}
                  suffixIcon={!isDevTeam ? <ArrowDropDownIcon /> : null}
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

export default ModalTask;
