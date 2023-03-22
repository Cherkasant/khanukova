import { useEffect, useMemo, useState } from 'react'
import { Column, useSortBy, useTable } from 'react-table'

import classnames from 'classnames'
import classNames from 'classnames'
import moment from 'moment'

import { useDispatch, useSelector } from 'react-redux'

import { CardTaskType } from '../../Redux/Types/tasks'
import { AddNewTaskIcon } from '../../Assets/icons/AddNewTaskIcon'
import { TableColumns } from '../constants/Table/TableData'
import { ArrowDropDownIcon } from '../../Assets/icons/ArrowDropDownIcon'
import { setSelectedModalVisible } from '../../Redux/Reducers/postReducer'
import { SortIcon } from '../../Assets/icons/SortIcon'
import { RotateSortIcon } from '../../Assets/icons/RotateSortIcon'
import PostSelector from '../../Redux/Selectors/postSelector'

import styles from './Table.module.css'

const Table = () => {
  const dispatch = useDispatch()

  const DATA: CardTaskType = []

  const task = useSelector(PostSelector.getTask)

  const [isOpened, setOpened] = useState(false)
  const onArrowClick = () => {
    setOpened(!isOpened)
  }

  const [taskInfo, setTaskInfo] = useState<CardTaskType>(DATA)
  useEffect(() => {
    if (task) {
      setTaskInfo((prevArray) => [...prevArray, task])
    }
  }, [])
  const onAddTaskClick = () => {
    dispatch(setSelectedModalVisible(true))
  }

  const COLUMNS: Array<Column> = [
    {
      Header: TableColumns.item,
      Footer: () => (
        <div className={styles.footer} onClick={onAddTaskClick}>
          <AddNewTaskIcon />
          {'Add item'}
        </div>
      ),
      accessor: 'milestone_name',
      Cell: ({ value }) => (
        <div className={styles.container} key={value}>
          <div className={styles.cell}>
            <div className={styles.arrow} onClick={onArrowClick}>
              <ArrowDropDownIcon />
            </div>
            {value}
          </div>
          <div className={styles.addTask} onClick={onAddTaskClick}>
            <AddNewTaskIcon />
          </div>
          {isOpened ? (
            <div
              className={classNames(styles.list, {
                [styles.listActive]: isOpened
              })}>
              <div className={styles.el}>{'subtask'}</div>
            </div>
          ) : null}
        </div>
      )
    },
    {
      Header: TableColumns.dependence,
      Footer: '',
      accessor: 'dependence',
      Cell: ({ value }) => <div className={styles.dependence}>{value}</div>
    },
    {
      Header: TableColumns.status,
      Footer: '',
      accessor: 'status',
      Cell: ({ value }) => <div className={styles.status}>{value}</div>
    },
    {
      Header: TableColumns.label,
      Footer: '',
      accessor: 'labels',
      Cell: (props: any) => (
        <div
          className={classnames(styles.label, {
            [styles.blue]: props.row.original.color === 'Blue',
            [styles.red]: props.row.original.color === 'Red',
            [styles.green]: props.row.original.color === 'Green',
            [styles.darkgreen]: props.row.original.color === 'Darkgreen',
            [styles.brown]: props.row.original.color === 'Brown',
            [styles.ultraviolet]: props.row.original.color === 'Fiolet',
            [styles.yellow]: props.row.original.color === 'Yellow'
          })}>
          {props.row.original.labels}
        </div>
      )
    },
    {
      Header: TableColumns.responsible,
      Footer: '',
      accessor: 'responsible',
      Cell: (props) => (
        <div className={styles.responsibleContainer}>
          <div className={styles.responsibleCell}>{props.value}</div>
        </div>
      )
    },
    {
      Header: TableColumns.duration,
      Footer: '',
      accessor: 'duration',
      Cell: ({ value }) => <div className={styles.duration}>{value} h</div>
    },
    {
      Header: TableColumns.launchDate,
      Footer: '',
      accessor: 'start_date',
      Cell: (props) => {
        return <>{moment(props.value).format('DD MMM YYYY')}</>
      }
    },
    {
      Header: TableColumns.deadline,
      Footer: '',
      accessor: 'deadline',
      Cell: (props) => {
        return <>{moment(props.value).format('DD MMM YYYY')}</>
      }
    },
    {
      Header: TableColumns.priority,
      Footer: '',
      accessor: 'priority',
      Cell: ({ value }) => <div className={styles.duration}>{value}</div>
    },
    {
      Header: TableColumns.progress,
      Footer: '',
      accessor: 'progress',
      Cell: ({ value }) => <div className={styles.duration}>{value}%</div>
    }
  ]
  const columns = useMemo(() => COLUMNS, [])
  const data = useMemo(() => taskInfo, [taskInfo])
  const { getTableProps, getTableBodyProps, headerGroups, footerGroups, rows, prepareRow } = useTable(
    { columns, data },
    useSortBy
  )
  return (
    <table {...getTableProps()} className={styles.tableContainer}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: any) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())} className={styles.tableHeader}>
                {column.render('Header')}
                {column.isSorted ? column.isSortedDesc ? <SortIcon /> : <RotateSortIcon /> : ''}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()} className={styles.tableCell}>
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
      <tfoot className={styles.tableFooter}>
        {footerGroups.map((group) => (
          <tr {...group.getFooterGroupProps()}>
            {group.headers.map((column) => (
              <td {...column.getFooterProps()} className={styles.tableCell}>
                {column.render('Footer')}
              </td>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  )
}

export default Table
