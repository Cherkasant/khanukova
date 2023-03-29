import { useState } from 'react'

import classNames from 'classnames'

import Input from '../Input'
import { SearchIcon } from '../../Assets/icons/SearchIcon'
import AccordionDoc from '../AccordionDoc'
import ModalDocuments from '../ModalDocuments'

import styles from './Documents.module.css'

const Documents = () => {
  const [inputSearch, setInputSearch] = useState('')
  const [modal, setModal] = useState(false)

  const onChange = (value: string) => {
    setInputSearch(value)
  }
  return (
    <div className={styles.wrap}>
      <div className={styles.searchContainer}>
        <Input value={inputSearch} onChange={onChange} placeholder={'Project name'} className={styles.searchInput} />
        <div className={styles.icon}>
          <SearchIcon />
        </div>
      </div>
      <div className={styles.milestoneWrap}>
        <AccordionDoc modal={modal} setModal={setModal} />
      </div>
      <div className={classNames(styles.wrapModal, { [styles.showModal]: modal })}>
        <ModalDocuments modal={modal} setModal={setModal} />
      </div>
    </div>
  )
}

export default Documents
