import React, { ChangeEvent, FC, useState } from 'react'
import ReactModal, { Props } from 'react-modal'
import 'react-dropdown/style.css'
import styles from './ModalRequest.module.css'
import { CloseModalIcon } from '../../Assets/icons/CloseModalIcon'
import { AttachmentIcon } from '../../Assets/icons/AttachmentIcon'
import Dropdown from 'react-dropdown'
import 'react-datepicker/dist/react-datepicker.css'
import { Upload } from 'antd'
import { DownloadIcon } from '../../Assets/icons/DownloadIcon'
import { useDispatch, useSelector } from 'react-redux'
import { setRequestModalVisible } from '../../Redux/Reducers/postReducer'
import {
  ClientsRequestStatus,
  Priority,
  responsibleOptions,
} from '../constants/Modal/ModalData'
import postSelector from '../../Redux/Selectors/postSelector'
import PuzzleButton, { PuzzleButtonTypes } from '../PuzzleButton'
import classNames from 'classnames'

const ModalRequest = () => {
  const dispatch = useDispatch()
  const titleRequest = useSelector(postSelector.getRequestTitle)
  const isModalRequestVisible = useSelector(postSelector.getRequestModal)
  const onSaveClick = () => {
    dispatch(setRequestModalVisible(false))
  }

  const [descriptionValue, setDescriptionValue] = useState('')
  const onChangeDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescriptionValue(event.target.value)
  }
  const [comment, setComment] = useState('')
  const onChangeComment = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value)
  }

  const [selectedResponsibleOptions, setSelectedResponsibleOptions] =
    useState<any>(null)
  const [priority, setPriority] = useState<any>(null)
  const [status, setStatus] = useState<any>(null)

  const onCancelClick = () => {
    dispatch(setRequestModalVisible(false))
  }
  return (
    <div
      className={classNames(styles.modal, {
        [styles.activeModal]: isModalRequestVisible,
      })}
    >
      <div className={styles.container}>
        <div className={styles.milestone}>{titleRequest}</div>
        <div
          className={styles.icon}
          onClick={onCancelClick}
        >
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
              title={'Submit new'}
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
  )
}

export default ModalRequest
