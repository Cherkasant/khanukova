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

import { Close } from '../../../Assets/Table/Close';

import 'moment/locale/en-gb';

import { ArrowDropDownIcon } from '../../../Assets/Table/ArrowDropDownIcon';
import { AttachmentIcon } from '../../../Assets/icons/AttachmentIcon';
import { CalendarIcon } from '../../../Assets/icons/CalendarIcon';
import { CloseModalIcon } from '../../../Assets/icons/CloseModalIcon';
import { DeleteIcon } from '../../../Assets/icons/DeleteIcon';
import { EditTitleIcon } from '../../../Assets/icons/EditTitleIcon';
import {
  addResponsible,
  deleteMilestone,
  getAllMilestoneDependencies,
  getAllResponsible,
  getSingleProject,
  patchMilestone,
  setModalMilestone
} from '../../../Redux/Reducers/postReducer';
import postSelector from '../../../Redux/Selectors/postSelector';
import Input from '../../Input';
import PuzzleButton, { PuzzleButtonTypes } from '../../PuzzleButton';
import { Colors, Dependence, PaymentStatus, Priority, Progress, Status } from '../../constants/Modal/ModalData';

import { DownloadAllIcon } from '../../../Assets/Milestone/DownloadAllIcon';

import {
  deleteMilestoneComment,
  getAllMilestoneComments,
  getSingleMilestoneComment,
  patchMilestoneComment,
  postMilestoneComment
} from '../../../Redux/Reducers/commentReducer';

import commentsSelector from '../../../Redux/Selectors/commentsSelector';

import styles from './ModalMilestone.module.css';

const ModalMilestone = () => {
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();
  const allDependencies = useSelector(postSelector.getAllMilestoneDependencies);
  const ArrayOfDependencies = allDependencies.map((el) => {
    return { value: el.id.toString(), label: el.milestone_name };
  });
  const allResponsible = useSelector(postSelector.getAllResponsible);
  const checkbox = allResponsible.map((el) => {
    return { value: el.id, label: el.nickname };
  });

  const singleMilestoneComment = useSelector(commentsSelector.getSingleMilestoneComment);
  const singleProject = useSelector(postSelector.getSingleProject);
  const isVisible = useSelector(postSelector.getModalMilestone);
  const singleMilestone = useSelector(postSelector.getSingleMilestone);
  const commentsMilestone = useSelector(commentsSelector.getAllMilestoneComments);
  const COMMENTS_LIST = commentsMilestone.filter((el) => el.task === null);
  const [refreshComments, setRefreshComments] = useState(false);
  const [editButton, setEditButton] = useState(false);
  const defaultResponsible = singleMilestone?.responsible_data.map((el) => {
    return el.id;
  });
  useEffect(() => {
    if (refreshComments && singleMilestone) {
      dispatch(getAllMilestoneComments(singleMilestone?.id));
    }
  }, [refreshComments]);
  useEffect(() => {
    if (singleMilestoneComment) {
      setComment(singleMilestoneComment?.comment);
      setEditButton(true);
    }
  }, [singleMilestoneComment]);
  useEffect(() => {
    if (singleMilestone) {
      const progress = singleMilestone?.progress.toString();
      setTitle(singleMilestone?.milestone_name);
      setDescriptionValue(singleMilestone?.description);
      setLaunchDate(singleMilestone?.start_date);
      setDeadline(singleMilestone?.deadline);
      setPriority(singleMilestone?.priority);
      setDuration(singleMilestone?.duration);
      setLabel(singleMilestone?.labels);
      setColors(singleMilestone?.color_labels);
      setProgress(progress);
      setResponsible(singleMilestone?.responsible_data.map((el) => el.nickname));
      setStatus(singleMilestone?.status);
      setPaymentStatus(singleMilestone?.payment_status);
      setLaunchDate(singleMilestone?.start_date);
      setDeadline(singleMilestone?.deadline);
      // setDependence(singleMilestone?.dependence_name);
      dispatch(getAllMilestoneComments(singleMilestone?.id));
    }
  }, [singleMilestone]);

  const onSaveClick = () => {
    if (singleMilestone) {
      dispatch(
        patchMilestone({
          id: singleMilestone?.id,
          data: {
            milestone_name: title,
            description: descriptionValue,
            attachment: null,
            responsible_data: responsible.label,
            priority: priority.value,
            start_date: launchDate,
            deadline: deadline,
            duration: duration,
            labels: label,
            color_labels: colors.value,
            dependence: dependence
              ? dependence
                  .toString()
                  .split(',')
                  .map((el: string) => parseInt(el))
              : [],
            progress: progress.value,
            status: status.value,
            payment_status: paymentStatus.value,
            project: singleProject?.id
          },
          callback: () => {
            if (id) {
              dispatch(getSingleProject(+id));
              dispatch(setModalMilestone(false));
            }
          }
        })
      );
    }
  };
  const [attachment, setAttachment] = useState('');
  const [launchDate, setLaunchDate] = useState<any>('');
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
    if (singleMilestone) {
      dispatch(postMilestoneComment({ comment: comment, milestone: singleMilestone?.id }));
      dispatch(getAllMilestoneComments(singleMilestone?.id));
      setComment('');
    }
  };
  const onDeleteCommentClick = (id: number) => {
    if (singleMilestone) {
      dispatch(
        deleteMilestoneComment({
          id: id,
          idMilestone: singleMilestone?.id,
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
    if (singleMilestone && singleMilestoneComment) {
      dispatch(
        patchMilestoneComment({
          id: singleMilestoneComment?.id,
          idMilestone: singleMilestone?.id,
          data: { comment: comment, milestone: singleMilestone?.id },
          callback: () => {
            dispatch(getAllMilestoneComments(singleMilestone?.id));
          }
        })
      );
    }
    setComment('');
  };
  const [responsible, setResponsible] = useState<any>(null);
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
    dispatch(setModalMilestone(false));
  };
  useEffect(() => {
    setEdit(false);
    if (singleProject && singleMilestone) {
      dispatch(getAllResponsible(singleProject?.id));
      dispatch(getAllMilestoneDependencies({ id: singleProject?.id, milestoneId: singleMilestone?.id }));
    }
  }, [singleProject, singleMilestone]);

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

  const onDeleteMilestoneClick = () => {
    if (singleMilestone) {
      dispatch(
        deleteMilestone({
          id: singleMilestone?.id,
          callback: () => {
            if (id) {
              dispatch(getSingleProject(+id));
              dispatch(setModalMilestone(false));
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
            {singleProject?.project_name}
            <div className={styles.deleteContainer} onClick={onDeleteMilestoneClick}>
              <DeleteIcon />
              {'Delete from project'}
            </div>
          </div>
          <div className={styles.icon} onClick={onCancelClick}>
            <CloseModalIcon />
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
                <DownloadAllIcon />
              </div>
            </div>
            <div className={styles.commentContainer}>
              <div className={styles.title}>{'Comments'}</div>
              <div className={styles.commentList}>
                {COMMENTS_LIST.map((el) => (
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
                  options={checkbox}
                  multiple={true}
                  onChange={setResponsible}
                  value={responsible}
                  defaultValue={responsible}
                  onDropdownVisibleChange={(open: boolean) =>
                    open === false
                      ? dispatch(
                          addResponsible({
                            id: singleMilestone?.id,
                            data: { responsible_add: [] },
                            callback: () => {
                              console.log('check');
                            }
                          })
                        )
                      : null
                  }
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
                  placeholder="Nothing selected"
                  className={styles.dropdownContainer}
                  controlClassName={styles.dropdownControl}
                  placeholderClassName={styles.dropdownPlaceholder}
                  arrowClosed={<ArrowDropDownIcon />}
                  arrowOpen={<Close />}
                  menuClassName={styles.dropdownMenu}
                />
              </div>
              <div className={styles.startDateContainer}>
                <div className={styles.title}>{'Start date'}</div>
                <DatePicker
                  value={dayjs(launchDate, 'DD.MM.YYYY')}
                  format="DD.MM.YYYY"
                  placeholder="Nothing selected"
                  suffixIcon={<CalendarIcon />}
                  className={styles.datepicker}
                  onChange={onChangeLaunch}
                />
              </div>

              <div className={styles.startDateContainer}>
                <div className={styles.startDateContainer}>
                  <div className={styles.title}>{'Deadline'}</div>
                  <DatePicker
                    value={dayjs(deadline, 'DD.MM.YYYY')}
                    format="DD.MM.YYYY"
                    placeholder="Nothing selected"
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
                  placeholder={'Enter duration'}
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
                  placeholder="Nothing selected"
                  className={styles.dropdownContainer}
                  controlClassName={styles.dropdownControl}
                  placeholderClassName={styles.dropdownPlaceholder}
                  arrowClosed={<ArrowDropDownIcon />}
                  arrowOpen={<Close />}
                  menuClassName={styles.dropdownMenu}
                />
              </div>
              <div>
                <div className={styles.title}>{'Dependence'}</div>
                <Cascader
                  options={ArrayOfDependencies}
                  multiple={true}
                  onChange={setDependence}
                  defaultValue={dependence}
                  value={dependence}
                  className={styles.cascader}
                  popupClassName={styles.popup}
                  placeholder={'Add dependence'}
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
                  placeholder="Nothing selected"
                  className={styles.dropdownContainer}
                  controlClassName={styles.dropdownControl}
                  placeholderClassName={styles.dropdownPlaceholder}
                  arrowClosed={<ArrowDropDownIcon />}
                  arrowOpen={<Close />}
                  menuClassName={styles.dropdownMenu}
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
                  controlClassName={styles.dropdownControl}
                  placeholderClassName={styles.dropdownPlaceholder}
                  arrowClosed={<ArrowDropDownIcon />}
                  arrowOpen={<Close />}
                  // menuClassName={styles.dropdownMenuStatus}
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

export default ModalMilestone;
