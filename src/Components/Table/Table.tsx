import React, { useEffect, useMemo, useState } from "react";
import { Column, useExpanded, useTable } from "react-table";
import styles from "./Table.module.css";
import { TableColumns } from "../constants/Table/TableData";
import { ArrowDropDownIcon } from "../../Assets/icons/ArrowDropDownIcon";
import { AddRoundIcon } from "../../Assets/icons/AddRoundIcon";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedModalVisible } from "../../Redux/Reducers/postReducer";
import PostSelector from "../../Redux/Selectors/postSelector";
import { CardTaskType } from "../../Redux/Types/tasks";

const Table = () => {
  const DATA: CardTaskType = [
    {
      deadline: "1/31/2023",
      dependence: "",
      duration: "132",
      item: "123123231",
      label: "check",
      launchDate: "1/1/2023",
      priority: "Medium",
      progress: "20%",
      responsible: "User2",
      status: "To Do",
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
  console.log(taskInfo);

  const dispatch = useDispatch();

  const onAddTaskClick = () => {
    dispatch(setSelectedModalVisible(true));
  };
  const COLUMNS: Array<Column> = [
    {
      Header: TableColumns.item,
      Footer: "+Add new",
      accessor: "item",
      Cell: ({ value }) => (
        <div className={styles.container}>
          <div className={styles.cell}>
            <ArrowDropDownIcon />
            {value}
          </div>
          <div className={styles.addTask} onClick={onAddTaskClick}>
            <AddRoundIcon key={value} />
          </div>
        </div>
      ),
    },
    {
      Header: TableColumns.dependence,
      Footer: "",
      accessor: "dependence",
    },
    {
      Header: TableColumns.status,
      Footer: "",
      accessor: "status",
    },
    {
      Header: TableColumns.label,
      Footer: "",
      accessor: "label",
      Cell: ({ value }) => <div className={styles.label}>{value}</div>,
    },
    {
      Header: TableColumns.responsible,
      Footer: "",
      accessor: "responsible",
    },
    {
      Header: TableColumns.duration,
      Footer: "",
      accessor: "duration",
      Cell: ({ value }) => <div>{value} h</div>,
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
    },
    {
      Header: TableColumns.progress,
      Footer: "",
      accessor: "progress",
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
  } = useTable({ columns, data }, useExpanded);
  return (
    <table {...getTableProps()} className={styles.tableContainer}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} className={styles.tableHeader}>
                {column.render("Header")}
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
                    {cell.render("Cell")}
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
