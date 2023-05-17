import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import 'react-dropdown/style.css';
import Dropdown from 'react-dropdown';

import { CloseModalIcon } from '../../../Assets/icons/CloseModalIcon';
import { AddDocRes } from '../../../Assets/icons/AddDocRes';
import AddDocIcon from '../../../Assets/icons/AddDocIcon';
import DocumentIcon from '../../../Assets/icons/DocumentIcon';
import Plas from '../../../Assets/icons/Plas';
import { EditTitleIcon } from '../../../Assets/icons/EditTitleIcon';
import ProfileDocIcons from '../../../Assets/icons/ProfileDocIcon';
import { dataFn } from '../../../utils';
import Input from '../../Input';
import PuzzleButton, { PuzzleButtonTypes } from '../../PuzzleButton';

import { Colors } from './Colors';
import EditorHtml from './EditorHtml';

import styles from './ModalDocuments.module.css';

type ModalDocumentsProps = {
  addDocRef: React.RefObject<HTMLDivElement>;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ModalDocuments: React.FC<ModalDocumentsProps> = ({ modal, setModal, addDocRef }) => {
  const [valueEditor, setValueEditor] = useState('');
  const [title, setTitle] = useState('');
  const [titleDown, setTitleDown] = useState('');
  const [priority, setPriority] = useState<any>(null);
  const [labels, setLabels] = useState('');
  const [edit, setEdit] = useState(false);
  const [fileInput, setFileInput] = useState<FileList | null>(null);
  const [link, setLink] = useState('');
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
    setValueEditor('');
    setLink('');
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
        <div className={styles.inputWrap}>
          <input className={styles.inputLink} value={link} onChange={(e) => setLink(e.target.value)} type="text" />
          <div className={styles.addLink}>
            {link ? (
              <div style={{ color: '#212121', fontWeight: 400, fontSize: '14px', lineHeight: '17px' }}> {link}</div>
            ) : (
              <>
                <Plas className={styles.plas} /> Add link
              </>
            )}
          </div>
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
        <div className={styles.desc}>
          Discription documents
          <div>
            <EditorHtml valueEditor={valueEditor} onChange={setValueEditor} />
          </div>
        </div>
        <div className={styles.attanchment}>
          Attanchment
          <div className={styles.label} onClick={() => inputRef.current.click()}>
            <AddDocIcon />
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
        <div className={styles.documents}>
          {files.map((value, index) => (
            <div key={index} className={styles.document}>
              <AddDocRes />
              <div
                className={styles.close}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteDocumetsHandler(value.name);
                }}>
                <CloseModalIcon />
              </div>
              <div> {value.name.length < 21 ? value.name : `${value.name.slice(0, 15)} ...`}</div>
            </div>
          ))}
        </div>
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
