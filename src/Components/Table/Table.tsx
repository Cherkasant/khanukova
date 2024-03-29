import classnames from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Column, useExpanded, useSortBy, useTable } from 'react-table';

import { Avatar } from 'antd';

import { Close } from '../../Assets/Table/Close';
import { AddNewTaskIcon } from '../../Assets/Table/AddNewTaskIcon';
import { ArrowDropDownIcon } from '../../Assets/Table/ArrowDropDownIcon';
import { RotateSortIcon } from '../../Assets/icons/RotateSortIcon';
import { SortIcon } from '../../Assets/icons/SortIcon';
import {
  getAllResponsible,
  getSingleMilestone,
  getSingleSubTask,
  getSingleTask,
  setMilestoneId,
  setProjectTitle,
  setSelectedModalVisible,
  setSubTaskModalVisible,
  setTaskId,
  setTaskModalVisible,
  setTaskTitle
} from '../../Redux/Reducers/postReducer';
import postSelector from '../../Redux/Selectors/postSelector';
import { TableColumns } from '../constants/Table/TableData';
import { AddNewSubTaskIcon } from '../../Assets/Table/AddNewSubTaskIcon';

import { ArrowDropDownTaskIcon } from '../../Assets/Table/ArrowDropDownTaskIcon';
import { CloseTask } from '../../Assets/Table/CloseTask';

import { SubTaskTypeTable, TaskTypeTable } from '../../Redux/Types/tasks';

import styles from './Table.module.css';

const Table = () => {
  const dispatch = useDispatch();

  const singleProject = useSelector(postSelector.getSingleProject);
  const singleProjectData = useSelector(postSelector.getSingleProjectData);

  const [taskInfo, setTaskInfo] = useState<any>([]);
  useEffect(() => {
    if (singleProjectData) {
      const taskData = singleProjectData?.milestone_data.map((el) => {
        return {
          id: el.id,
          milestone_name: el.milestone_name,
          description: el.description,
          attachment: el.attachment,
          responsible: el.responsible_data,
          priority: el.priority,
          start_date: el.start_date,
          deadline: el.deadline,
          duration: el.duration,
          labels: el.labels,
          color_labels: el.color_labels,
          dependence: el.dependence_name,
          progress: el.progress,
          status: el.status,
          payment_status: el.payment_status,
          subRows: !el.task_data
            ? null
            : el.task_data.map((elem: TaskTypeTable) => {
                return {
                  id: elem.id,
                  milestone_name: elem.task_name,
                  description: elem.description,
                  attachment: elem.attachment,
                  responsible: elem.responsible_data,
                  priority: elem.priority,
                  start_date: elem.start_date,
                  deadline: elem.deadline,
                  duration: elem.duration,
                  labels: elem.labels,
                  color_labels: elem.color_labels,
                  dependence: elem.dependence_name,
                  progress: elem.progress,
                  status: elem.status,
                  payment_status: elem.payment_status,
                  subRows: !elem.subtask_data
                    ? null
                    : elem.subtask_data.map((element: SubTaskTypeTable) => {
                        return {
                          id: element.id,
                          milestone_name: element.sub_task_name,
                          description: element.description,
                          attachment: element.attachment,
                          responsible: element.responsible_data,
                          priority: element.priority,
                          start_date: element.start_date,
                          deadline: element.deadline,
                          duration: element.duration,
                          labels: element.labels,
                          color_labels: element.color_labels,
                          dependence: element.dependence_name,
                          progress: element.progress,
                          status: element.status,
                          payment_status: element.payment_status
                        };
                      })
                };
              })
        };
      });
      setTaskInfo(taskData);
    }
  }, [singleProjectData]);

  const COLUMNS: Array<Column> = [
    {
      Header: TableColumns.item,
      Footer: () => (
        <div
          className={styles.footer}
          onClick={() => {
            if (singleProject) {
              dispatch(setProjectTitle(singleProject?.project_name));
              dispatch(getAllResponsible(singleProject?.id));
              dispatch(setSelectedModalVisible(true));
            }
          }}>
          <AddNewTaskIcon />
          {'Add item'}
        </div>
      ),
      accessor: 'milestone_name',
      Cell: (props: any) => (
        <div className={styles.container} key={props.row.original.id}>
          <div
            className={classnames(
              styles.cell,
              {
                [styles.paddingLeftFirst]: props.row.depth === 1
              },
              {
                [styles.paddingLeftSecond]: props.row.depth === 2
              }
            )}>
            {props.row.canExpand && props.row.depth === 0 ? (
              <span {...props.row.getToggleRowExpandedProps()}>
                {props.row.isExpanded ? <Close /> : <ArrowDropDownIcon />}
              </span>
            ) : null}
            {props.row.canExpand && props.row.depth === 1 ? (
              <span {...props.row.getToggleRowExpandedProps()}>
                {props.row.isExpanded ? <CloseTask /> : <ArrowDropDownTaskIcon />}
              </span>
            ) : null}
            <div
              onClick={() => {
                if (props.row.depth === 0) {
                  dispatch(getSingleMilestone(props.row.original.id));
                }
                if (props.row.depth === 1) {
                  dispatch(getSingleTask(props.row.original.id));
                }
                if (props.row.depth === 2) {
                  dispatch(getSingleSubTask(props.row.original.id));
                }
              }}>
              {props.row.original.milestone_name}
            </div>
          </div>
          {props.row.depth === 0 ? (
            <div
              className={styles.addTask}
              onClick={() => {
                if (singleProject) {
                  dispatch(setTaskTitle(props.row.original.milestone_name));
                  dispatch(setMilestoneId(props.row.original.id));
                  dispatch(setTaskModalVisible(true));
                }
              }}>
              <AddNewTaskIcon />
            </div>
          ) : null}
          {props.row.depth === 1 ? (
            <div
              className={styles.addTask}
              onClick={() => {
                if (singleProject) {
                  dispatch(setTaskTitle(props.row.original.milestone_name));
                  dispatch(setTaskId(props.row.original.id));
                  dispatch(setSubTaskModalVisible(true));
                }
              }}>
              <AddNewSubTaskIcon />
            </div>
          ) : null}
        </div>
      )
    },

    {
      Header: TableColumns.dependence,
      Footer: '',
      accessor: 'dependence',
      Cell: ({ value }) => <div className={styles.dependence}>{value.toString()}</div>
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
            [styles.blue]: props.row.original.color_labels === 'Blue',
            [styles.red]: props.row.original.color_labels === 'Red',
            [styles.green]: props.row.original.color_labels === 'Green',
            [styles.ultraviolet]: props.row.original.color_labels === 'Fiolet',
            [styles.yellow]: props.row.original.color_labels === 'Yellow'
          })}>
          {props.row.original.labels}
        </div>
      )
    },
    {
      Header: TableColumns.responsible,
      Footer: '',
      accessor: 'responsible',
      Cell: (props: any) => (
        <div className={styles.responsibleContainer}>
          <Avatar.Group
            maxCount={2}
            maxPopoverTrigger="click"
            size={36}
            maxStyle={{ backgroundColor: '#9bacc9', cursor: 'pointer' }}>
            {props.value.map((el: any) => {
              return (
                <div key={el.id}>
                  <Avatar
                    className={styles.responsibleCell}
                    style={{ fontSize: '16px', lineHeight: '22px' }}
                    src={el.account_photo}
                    alt={''}
                    gap={4}>
                    {el.nickname}
                  </Avatar>
                </div>
              );
            })}
          </Avatar.Group>
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
      Cell: ({ value }) => {
        return <>{value}</>;
      }
    },
    {
      Header: TableColumns.deadline,
      Footer: '',
      accessor: 'deadline',
      Cell: ({ value }) => {
        return <>{value}</>;
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
  ];

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => taskInfo, [taskInfo]);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
    initialState: expanded
  } = useTable({ columns, data }, useSortBy, useExpanded);
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
          prepareRow(row);
          return (
            <React.Fragment key={row.getRowProps().key}>
              <tr>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      className={classnames(styles.tableCell, { [styles.border]: row.depth !== 0 })}
                      key={cell.getCellProps().key}>
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            </React.Fragment>
          );
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
  );
};

export default Table;
