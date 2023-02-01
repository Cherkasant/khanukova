import React, { useEffect, useMemo, useState } from "react";
import { Column, useSortBy, useTable } from "react-table";
import styles from "./Table.module.css";
import { TableColumns } from "../constants/Table/TableData";
import { ArrowDropDownIcon } from "../../Assets/icons/ArrowDropDownIcon";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedModalVisible } from "../../Redux/Reducers/postReducer";
import PostSelector from "../../Redux/Selectors/postSelector";
import { CardTaskType } from "../../Redux/Types/tasks";
import { AddNewTaskIcon } from "../../Assets/icons/AddNewTaskIcon";
import classnames from "classnames";
import { SortIcon } from "../../Assets/icons/SortIcon";
import { RotateSortIcon } from "../../Assets/icons/RotateSortIcon";

const Table = () => {
  const DATA: CardTaskType = [
    {
      deadline: "1/31/2023",
      dependence: "",
      duration: "132",
      item: "Test 1",
      label: "Check",
      launchDate: "1/1/2023",
      priority: "Medium",
      progress: "20%",
      responsible: "User2",
      status: "To Do",
      color: "Blue",
    },
    {
      deadline: "1/31/2023",
      dependence: "test1",
      duration: "132",
      item: "Test 2",
      label: "Check",
      launchDate: "1/1/2023",
      priority: "Medium",
      progress: "20%",
      responsible: "User2",
      status: "To Do",
      color: "Red",
    },
    {
      deadline: "1/31/2023",
      dependence: "test 2",
      duration: "132",
      item: "Test 3",
      label: "Check",
      launchDate: "1/1/2023",
      priority: "Medium",
      progress: "20%",
      responsible: "User2",
      status: "Ready for QA",
      color: "Fiolet",
    },
    {
      deadline: "1/31/2023",
      dependence: "test 3",
      duration: "132",
      item: "Test 4",
      label: "Check",
      launchDate: "1/1/2023",
      priority: "Medium",
      progress: "30%",
      responsible: "User2",
      status: "On Hold",
      color: "Green",
    },
  ];
  const [taskInfo, setTaskInfo] = useState<CardTaskType>(DATA);
  const task = useSelector(PostSelector.getTask);
  useEffect(() => {
    if (task) {
      // @ts-ignore
      setTaskInfo(taskInfo.push(task));
    }
  }, [task]);

  const dispatch = useDispatch();

  const onAddTaskClick = () => {
    dispatch(setSelectedModalVisible(true));
  };

  const COLUMNS: Array<Column> = [
    {
      Header: TableColumns.item,
      Footer: () => (
        <div className={styles.footer} onClick={onAddTaskClick}>
          <AddNewTaskIcon />
          {"Add item"}
        </div>
      ),
      accessor: "item",
      Cell: ({ value }) => (
        <div className={styles.container}>
          <div className={styles.cell}>
            <ArrowDropDownIcon />
            {value}
          </div>
          <div className={styles.addTask} onClick={onAddTaskClick}>
            <AddNewTaskIcon key={value} />
          </div>
        </div>
      ),
    },
    {
      Header: TableColumns.dependence,
      Footer: "",
      accessor: "dependence",
      Cell: ({ value }) => <div className={styles.dependence}>{value}</div>,
    },
    {
      Header: TableColumns.status,
      Footer: "",
      accessor: "status",
      Cell: ({ value }) => <div className={styles.status}>{value}</div>,
    },
    {
      Header: TableColumns.label,
      Footer: "",
      accessor: "label",
      Cell: (props: any) => (
        <div
          className={classnames(styles.label, {
            [styles.blue]: props.row.original.color === "Blue",
            [styles.red]: props.row.original.color === "Red",
            [styles.green]: props.row.original.color === "Green",
            [styles.darkgreen]: props.row.original.color === "Darkgreen",
            [styles.brown]: props.row.original.color === "Brown",
            [styles.ultraviolet]: props.row.original.color === "Fiolet",
            [styles.yellow]: props.row.original.color === "Yellow",
          })}
        >
          {props.row.original.label}
        </div>
      ),
    },
    {
      Header: TableColumns.responsible,
      Footer: "",
      accessor: "responsible",
      Cell: ({ value }) => (
        <div className={styles.responsibleContainer}>
          <div className={styles.responsibleCell}>{value[0]}</div>
        </div>
      ),
    },
    {
      Header: TableColumns.duration,
      Footer: "",
      accessor: "duration",
      Cell: ({ value }) => <div className={styles.duration}>{value} h</div>,
    },
    {
      Header: TableColumns.launchDate,
      Footer: "",
      accessor: "launchDate",
      //@ts-ignore
      Cell: ({ value }) => {
        return format(new Date(value), "dd MMM yyyy");
      },
    },
    {
      Header: TableColumns.deadline,
      Footer: "",
      accessor: "deadline",
      //@ts-ignore
      Cell: ({ value }) => {
        return format(new Date(value), "dd MMM yyyy");
      },
    },
    {
      Header: TableColumns.priority,
      Footer: "",
      accessor: "priority",
      Cell: ({ value }) => <div className={styles.duration}>{value}</div>,
    },
    {
      Header: TableColumns.progress,
      Footer: "",
      accessor: "progress",
      Cell: ({ value }) => <div className={styles.duration}>{value}</div>,
    },
  ];
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => DATA, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data }, useSortBy);
  return (
    <table {...getTableProps()} className={styles.tableContainer}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column: any) => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                className={styles.tableHeader}
              >
                {column.render("Header")}
                {column.isSorted ? (
                  column.isSortedDesc ? (
                    <SortIcon />
                  ) : (
                    <RotateSortIcon />
                  )
                ) : (
                  ""
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()} className={styles.tableCell}>
                    {cell.render("Cell", { color: "Blue" })}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
      <tfoot className={styles.tableFooter}>
        {footerGroups.map((group) => (
          <tr {...group.getFooterGroupProps()}>
            {group.headers.map((column) => (
              <td {...column.getFooterProps()} className={styles.tableCell}>
                {column.render("Footer")}
              </td>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
};

export default Table;
