import React, { ChangeEvent, FC, useEffect, useState } from "react";
import ReactModal, { Props } from "react-modal";
import "react-dropdown/style.css";
import styles from "./NewTask.module.css";
import { CloseModalIcon } from "../../Assets/icons/CloseModalIcon";
import { AttachmentIcon } from "../../Assets/icons/AttachmentIcon";
import Dropdown from "react-dropdown";
import Input from "../Input";
import "react-datepicker/dist/react-datepicker.css";
import PuzzleButton, { PuzzleButtonTypes } from "../PuzzleButton";
import { DatePicker, Upload } from "antd";
import { CalendarIcon } from "../../Assets/icons/CalendarIcon";
import { DownloadIcon } from "../../Assets/icons/DownloadIcon";
import { EditTitleIcon } from "../../Assets/icons/EditTitleIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  setSelectedModalVisible,
  setTaskCard,
} from "../../Redux/Reducers/postReducer";
import postSelector from "../../Redux/Selectors/postSelector";
import {
  Colors,
  Dependence,
  PaymentStatus,
  Priority,
  Progress,
  responsibleOptions,
  Status,
} from "../constants/Modal/ModalData";

const NewTask: FC<Props> = (props) => {
  const dispatch = useDispatch();
  const milestone = useSelector(postSelector.getTitleMilestone);
  const onSaveClick = () => {
    dispatch(
      setTaskCard({
        item: title,
        dependence: "",
        status: status.value,
        label: label,
        duration: duration,
        responsible: selectedResponsibleOptions.value,
        launchDate: launchDate,
        deadline: deadline,
        priority: priority.value,
        progress: progress.value,
        color: colors.value,
      })
    );
    dispatch(setSelectedModalVisible(false));
  };
  const [launchDate, setLaunchDate] = useState("");
  const [deadline, setDeadline] = useState("");
  const [label, setLabel] = useState("");
  const [duration, setDuration] = useState("");
  const [descriptionValue, setDescriptionValue] = useState("");
  const onChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionValue(event.target.value);
  };
  const [comment, setComment] = useState("");
  const onChangeComment = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const [selectedResponsibleOptions, setSelectedResponsibleOptions] =
    useState<any>(null);
  const [priority, setPriority] = useState<any>(null);
  const [status, setStatus] = useState<any>(null);
  const [paymentStatus, setPaymentStatus] = useState<any>(null);
  const [dependence, setDependence] = useState<any>(null);
  const [progress, setProgress] = useState<any>(null);
  const [colors, setColors] = useState<any>(null);
  const [title, setTitle] = useState("");
  const [edit, setEdit] = useState(false);
  const onEditClick = () => {
    setEdit(!edit);
  };
  const onCancelClick = () => {
    dispatch(setSelectedModalVisible(false));
  };
  useEffect(() => {
    setEdit(false);
    setTitle("Title");
  }, []);
  return (
    <ReactModal
      className={styles.modal}
      overlayClassName={styles.overlay}
      {...props}
    >
      <div className={styles.container}>
        <div className={styles.milestone}>{milestone}</div>
        <div className={styles.icon} onClick={props.onRequestClose}>
          <CloseModalIcon />
        </div>
        <div className={styles.titleContainer}>
          <Input
            value={title}
            onChange={(value) => setTitle(value)}
            className={styles.titleInput}
            placeholder={"Title"}
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
            <div className={styles.title}>{"Discription"}</div>
            <textarea
              className={styles.descriptionInput}
              placeholder={"Write"}
              value={descriptionValue}
              onChange={onChangeDescription}
            />
            <PuzzleButton
              title={"Submit new"}
              type={PuzzleButtonTypes.TextButton}
              className={styles.submitBtn}
              disabled={!descriptionValue}
            />
          </div>

          <div>
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture"
              className="upload-list-inline"
            >
              <div className={styles.attachmentBlock}>
                <div className={styles.title}>{"Attanchment"}</div>
                <AttachmentIcon />
              </div>
            </Upload>
          </div>
          <div className={styles.blockDownload}>
            <div className={styles.downloadBtn}>
              {"Download all"}
              <DownloadIcon />
            </div>
          </div>
          <div className={styles.commentContainer}>
            <div className={styles.title}>{"Comments"}</div>
            <textarea
              className={styles.commentInput}
              placeholder={"Write comment"}
              value={comment}
              onChange={onChangeComment}
            />
            <PuzzleButton
              title={"Comment"}
              type={PuzzleButtonTypes.TextButton}
              className={styles.submitBtn}
              disabled={!comment}
            />
          </div>
        </div>

        <div className={styles.rightBlock}>
          <div className={styles.title}>{"Responsible"}</div>
          <div className={styles.inputsBlock}>
            <div>
              <Dropdown
                options={responsibleOptions}
                onChange={setSelectedResponsibleOptions}
                value={selectedResponsibleOptions}
                placeholder="Add responsible"
                className={styles.dropdownContainer}
                controlClassName={styles.dropdownControl}
                placeholderClassName={styles.dropdownPlaceholder}
                arrowClosed={<span className={styles.arrowClosed} />}
                arrowOpen={<span className={styles.arrowOpen} />}
                menuClassName={styles.dropdownMenu}
              />
            </div>
            <div>
              <div className={styles.title}>{"Priority"}</div>
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
              <div className={styles.title}>{"Start date"}</div>
              <DatePicker
                format="DD.MM.YYYY"
                placeholder="Nothing selected"
                suffixIcon={<CalendarIcon />}
                className={styles.datepicker}
                onChange={(value: any) => {
                  const startDate = new Date(value).toLocaleDateString();
                  setLaunchDate(startDate);
                }}
              />
            </div>

            <div className={styles.startDateContainer}>
              <div className={styles.startDateContainer}>
                <div className={styles.title}>{"Deadline"}</div>
                <DatePicker
                  format="DD.MM.YYYY"
                  placeholder="Nothing selected"
                  suffixIcon={<CalendarIcon />}
                  onChange={(value: any) => {
                    const deadline = new Date(value).toLocaleDateString();
                    setDeadline(deadline);
                  }}
                />
              </div>
            </div>
            <div>
              <div className={styles.title}>{"Duration"}</div>
              <Input
                value={duration}
                onChange={(value) => setDuration(value)}
                type={"text"}
                className={styles.label}
                placeholder={"Enter duration"}
              />
            </div>
            <div>
              <div className={styles.title}>{"Labels"}</div>
              <Input
                value={label}
                onChange={(value) => setLabel(value)}
                type={"text"}
                className={styles.label}
                placeholder={"Enter labels"}
              />
            </div>
            <div>
              <div className={styles.title}>{"Color labels"}</div>

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
              <div className={styles.title}>{"Dependence"}</div>
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
              <div className={styles.title}>{"Progress"}</div>
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
              <div className={styles.title}>{"Status"}</div>
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
              <div className={styles.title}>{"Payment status"}</div>
              <Dropdown
                options={PaymentStatus}
                onChange={setPaymentStatus}
                value={paymentStatus}
                placeholder="Select  status"
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
                btnTitle={"Cancel"}
                btnType={PuzzleButtonTypes.TextButton}
                btnClassName={styles.cancelBtn}
                onClick={onCancelClick}
              />
              <PuzzleButton
                btnTitle={"Save"}
                btnType={PuzzleButtonTypes.TextButton}
                btnClassName={styles.saveBtn}
                onClick={onSaveClick}
              />
            </div>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default NewTask;