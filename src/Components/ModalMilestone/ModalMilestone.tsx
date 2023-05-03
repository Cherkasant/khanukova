import type { DatePickerProps } from 'antd';

import { Cascader, DatePicker, Upload } from 'antd';
import 'antd/README.md';
import classNames from 'classnames';
import { ChangeEvent, useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import dayjs, { Dayjs } from 'dayjs';

import 'moment/locale/en-gb';

import { ArrowDropDownIcon } from '../../Assets/icons/ArrowDropDownIcon';
import { AttachmentIcon } from '../../Assets/icons/AttachmentIcon';
import { CalendarIcon } from '../../Assets/icons/CalendarIcon';
import { CloseModalIcon } from '../../Assets/icons/CloseModalIcon';
import { DeleteIcon } from '../../Assets/icons/DeleteIcon';
import { DownloadIcon } from '../../Assets/icons/DownloadIcon';
import { EditTitleIcon } from '../../Assets/icons/EditTitleIcon';
import { deleteMilestone, getSingleProject, patchMilestone, setModalMilestone } from '../../Redux/Reducers/postReducer';
import postSelector from '../../Redux/Selectors/postSelector';
import { ResponsibleCheckbox } from '../FilteresPanel/FilterProjectScreen/constants';
import Input from '../Input';
import PuzzleButton, { PuzzleButtonTypes } from '../PuzzleButton';
import { Colors, Dependence, PaymentStatus, Priority, Progress, Status } from '../constants/Modal/ModalData';

import styles from './ModalMilestone.module.css';

const ModalMilestone = () => {
  const params = useParams();
  const { id } = params;
  const dispatch = useDispatch();
  const singleProject = useSelector(postSelector.getSingleProject);
  const isVisible = useSelector(postSelector.getModalMilestone);
  const singleMilestone = useSelector(postSelector.getSingleMilestone);

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
      setStatus(singleMilestone?.status);
      setPaymentStatus(singleMilestone?.payment_status);
      setLaunchDate(singleMilestone?.start_date);
      setDeadline(singleMilestone?.deadline);
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
            <div className={styles.title}>{'Responsible'}</div>
            <div className={styles.inputsBlock}>
              <div>
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
                  placeholder="Nothing selected"
                  className={styles.dropdownContainer}
                  controlClassName={styles.dropdownControl}
                  placeholderClassName={styles.dropdownPlaceholder}
                  arrowClosed={<span className={styles.arrowClosed} />}
                  arrowOpen={<span className={styles.arrowOpen} />}
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
                  arrowClosed={<span className={styles.arrowClosed} />}
                  arrowOpen={<span className={styles.arrowOpen} />}
                  menuClassName={styles.dropdownMenu}
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
                  controlClassName={styles.dropdownControl}
                  placeholderClassName={styles.dropdownPlaceholder}
                  arrowClosed={<span className={styles.arrowClosed} />}
                  arrowOpen={<span className={styles.arrowOpen} />}
                  menuClassName={styles.dropdownMenu}
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
                  arrowClosed={<span className={styles.arrowClosed} />}
                  arrowOpen={<span className={styles.arrowOpen} />}
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
                  arrowClosed={<span className={styles.arrowClosed} />}
                  arrowOpen={<span className={styles.arrowOpen} />}
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
                  arrowClosed={<span className={styles.arrowClosed} />}
                  arrowOpen={<span className={styles.arrowOpen} />}
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
