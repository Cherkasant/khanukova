import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import 'react-dropdown/style.css';
import Dropdown from 'react-dropdown';

import { CloseModalIcon } from '../../Assets/icons/CloseModalIcon';
import DocumentIcon from '../../Assets/icons/DocumentIcon';
import { EditTitleIcon } from '../../Assets/icons/EditTitleIcon';
import ProfileDocIcons from '../../Assets/icons/ProfileDocIcon';
import { dataFn } from '../../utils';
import Input from '../Input';
import PuzzleButton, { PuzzleButtonTypes } from '../PuzzleButton';

import styles from './ModalDocuments.module.css';
import { Colors } from './Colors';

type ModalDocumentsProps = {
  addDocRef: React.RefObject<HTMLDivElement>;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalDocuments: React.FC<ModalDocumentsProps> = ({ modal, setModal, addDocRef }) => {
  const [title, setTitle] = useState('');
  const [titleDown, setTitleDown] = useState('');
  const [priority, setPriority] = useState<any>(null);
  const [labels, setLabels] = useState('');
  const [desc, setDesc] = useState('');
  const [edit, setEdit] = useState(false);
  const [fileInput, setFileInput] = useState<FileList | null>(null);
  const inputRef = useRef<any>(null);
  const [files, setFiles] = useState<File[]>([]);
  const filesList = fileInput ? [...fileInput] : [];
  const modalRef = useRef<HTMLDivElement>(null);
  const titleModalRef = useRef<HTMLDivElement>(null);

  const onChangeKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setTitleDown(title);
      setEdit(!edit);
    }
  };
  const onEditClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setTitleDown('');
    setEdit(!edit);
  };

  const closeModal = () => {
    setLabels('');
    setPriority(null);
    setModal(false);
    setDesc('');
    setTitle('');
    setTitleDown('');
    setFileInput(null);
    setFiles([]);
  };

  const deleteDocumetsHandler = (doc: string) => {
    setFiles(files.filter((value) => value.name !== doc));
  };

  const dataArr = [
    {
      title: 'Created by',
      content: (
        <div className={styles.created}>
          <ProfileDocIcons />
          Irina Ivanova
        </div>
      )
    },
    { title: 'Created date', content: dataFn() },
    {
      title: 'Labels',
      content: (
        <Input
          value={labels}
          placeholder={'Enter labels'}
          className={styles.contentInput}
          onChange={(labels) => setLabels(labels)}
        />
      )
    },
    {
      title: 'Color labels',
      content: (
        <Dropdown
          options={Colors}
          onChange={setPriority}
          value={priority}
          placeholder="Select priority"
          className={styles.dropdownContainer}
          controlClassName={classNames(styles.dropdownControl, { [styles.dropdownControlColor]: priority })}
          placeholderClassName={styles.dropdownPlaceholder}
          arrowClosed={<span className={styles.arrowClosed} />}
          arrowOpen={<span className={styles.arrowOpen} />}
          menuClassName={styles.dropdownMenu}
        />
      )
    },
    {
      title: 'Link documents',
      content: (
        <div>
          <div className={styles.label} onClick={() => (!files.length ? inputRef.current.click() : null)}>
            {!files.length
              ? '+ Add new documents'
              : files.map((value, index) => (
                  <div key={index} className={styles.doc}>
                    {value.name}
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteDocumetsHandler(value.name);
                      }}
                      className={styles.deleteDoc}>
                      x
                    </span>
                  </div>
                ))}
          </div>
          <input
            ref={inputRef}
            onChange={(e) => setFileInput(e.target.files)}
            type="file"
            className={styles.inputFile}
            id="myfile"
            name="myfile"
            multiple
          />
        </div>
      )
    }
  ];

  useEffect(() => {
    if (fileInput) {
      setFiles(filesList);
    }
  }, [fileInput]);

  useEffect(() => {
    const eventModal = (e: MouseEvent) => {
      const _e = e as MouseEvent & {
        target: HTMLElement;
      };
      if (
        !addDocRef.current?.contains(_e.target) &&
        !modalRef.current?.contains(_e.target) &&
        !titleModalRef.current?.contains(_e.target)
      ) {
        setModal(false);
        closeModal();
      }
    };
    document.body.addEventListener('click', eventModal);
    return () => {
      document.body.removeEventListener('click', eventModal);
    };
  }, []);

  return (
    <div ref={modalRef} className={classNames(styles.wrap, { [styles.activeModal]: modal })}>
      <div>
        <div className={classNames(styles.titleContainer, { [styles.titleContainerDiv]: titleDown })}>
          <div className={classNames(styles.popoverTitle)}>
            {'Please enter a documents name and press Enter to get started'}
          </div>
          <DocumentIcon width={'25'} height={'28'} />
          {!titleDown ? (
            <Input
              value={title}
              onChange={(value) => setTitle(value)}
              onKeyDown={onChangeKeyDown}
              className={styles.title}
              placeholder={'New Documents'}
              disabled={!edit}
            />
          ) : (
            <div className={styles.titleDiv}>{title}</div>
          )}
          {!edit ? (
            <div
              ref={titleModalRef}
              className={classNames(styles.edit, { [styles.editDiv]: titleDown })}
              onClick={onEditClick}>
              <EditTitleIcon />
            </div>
          ) : null}
        </div>
        <div className={styles.innerData}>
          {dataArr.map((value, index) => (
            <div className={styles.itemData} key={index}>
              <div className={styles.titleData}>{value.title}</div> {value.content}
            </div>
          ))}
        </div>
        <div className={styles.desc}>Discription documents</div>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className={styles.textarea}
          placeholder={'Write'}
          readOnly={false}
        />
      </div>

      <div className={styles.buttonsContainer}>
        <PuzzleButton
          btnTitle={'Cancel'}
          btnType={PuzzleButtonTypes.TextButton}
          btnClassName={styles.cancelBtn}
          onClick={closeModal}
        />
        <PuzzleButton
          btnTitle={'Save'}
          btnType={PuzzleButtonTypes.TextButton}
          btnClassName={styles.saveBtn}
          onClick={() => {}}
        />
      </div>
      <div className={styles.icon} onClick={closeModal}>
        <CloseModalIcon />
      </div>
    </div>
  );
};

export default ModalDocuments;
