import React, { ChangeEvent, FC, useState } from "react";
import ReactModal, { Props } from "react-modal";
import "react-dropdown/style.css";
import styles from "./ModalEcase.module.css";
import { CloseModalIcon } from "../../Assets/icons/CloseModalIcon";
import { AttachmentIcon } from "../../Assets/icons/AttachmentIcon";
import Dropdown from "react-dropdown";
import "react-datepicker/dist/react-datepicker.css";
import Button, { ButtonTypes } from "../Button";
import { List, Upload } from "antd";
import { DownloadIcon } from "../../Assets/icons/DownloadIcon";
import { useDispatch } from "react-redux";
import { setEcaseModalVisible } from "../../Redux/Reducers/postReducer";
import {
  ClientsRequestStatus,
  Priority,
  responsibleOptions,
} from "../constants/Modal/ModalData";
import { EcaseData } from "../constants/Modal/EcaseData";

const ModalEcase: FC<Props> = (props) => {
  const dispatch = useDispatch();
  const onSaveClick = () => {
    dispatch(setEcaseModalVisible(false));
  };

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

  const onCancelClick = () => {
    dispatch(setEcaseModalVisible(false));
  };
  return (
    <ReactModal
      className={styles.modal}
      overlayClassName={styles.overlay}
      {...props}
    >
      <div className={styles.container}>
        <div className={styles.milestone}>{"E-case details"}</div>
        <div className={styles.icon} onClick={props.onRequestClose}>
          <CloseModalIcon />
        </div>
        <div className={styles.titleContainer}>{"opened 08/02/2023 "}</div>
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
            <div className={styles.title}>{"Discription"}</div>
            <textarea
              className={styles.descriptionInput}
              placeholder={"Write"}
              value={descriptionValue}
              onChange={onChangeDescription}
            />
            <Button
              title={"Submit new"}
              type={ButtonTypes.TextButton}
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
            <Button
              title={"Comment"}
              type={ButtonTypes.TextButton}
              className={styles.submitBtn}
              disabled={!comment}
            />
          </div>
        </div>

        <div className={styles.rightBlock}>
          <div className={styles.inputsBlock}>
            <div>
              <div className={styles.title}>{"Responsible"}</div>
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
              <div className={styles.title}>{"Status"}</div>
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
              <Button
                title={"Cancel"}
                type={ButtonTypes.TextButton}
                className={styles.cancelBtn}
                onClick={onCancelClick}
              />
              <Button
                title={"Save"}
                type={ButtonTypes.TextButton}
                className={styles.saveBtn}
                onClick={onSaveClick}
              />
            </div>
          </div>
        </div>
      </div>
    </ReactModal>
  );
};

export default ModalEcase;
