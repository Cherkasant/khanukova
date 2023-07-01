import React, { useEffect, useMemo, useState } from 'react';

import { Column, useTable } from 'react-table';

import { useNavigate } from 'react-router';

import { useSelector } from 'react-redux';

import { PathNames } from '../../Pages/Router/Router';

import { DeleteDevIcon } from '../../Assets/ProfilePage/DeleteDevIcon';

import { SelectProjectIcon } from '../../Assets/ProfilePage/SelectProjectIcon';

import profileSelectors from '../../Redux/Selectors/profileSelectors';

import { ArrayOfEmployees } from '../../Redux/Types/profile';

import styles from './DevTeamTable.module.css';

const DevTeamTable = () => {
  const allDevTeamEmployees = useSelector(profileSelectors.getAllDevTeamEmplyees);
  const navigate = useNavigate();
  const [showProjects, setShowProjects] = useState(false);
  const onSelectProjectClick = () => {
    setShowProjects(!showProjects);
  };
  const [devTeam, setDevTeam] = useState<ArrayOfEmployees>([]);
  useEffect(() => {
    if (allDevTeamEmployees) {
      setDevTeam(allDevTeamEmployees);
    }
  }, [allDevTeamEmployees]);
  const data = useMemo(() => devTeam, [devTeam]);

  const columns: Array<Column> = useMemo(
    () => [
      {
        Header: () => <div className={styles.headerName}>{'Name'}</div>,
        accessor: 'full_name',
        Cell: (props: any) => (
          <div className={styles.nameContainer}>
            <div className={styles.avatar}>
              <img src={props.row.original.account_photo} alt={''} />
              {/*{props.row.original.full_name.split(' ')[0][0]}*/}
              {/*{props.row.original.full_name.split(' ')[1][0]}*/}
            </div>
            <div className={styles.infoContainer}>
              <div className={styles.name} onClick={() => navigate(PathNames.ProfileDevTeam)}>
                {props.row.original.full_name}{' '}
              </div>
              <div className={styles.telegram}>{'telegram'}</div>
            </div>
          </div>
        )
      },
      {
        Header: () => <div className={styles.headerName}>{'Positions'}</div>,
        accessor: 'position',
        Cell: ({ value }) => <div className={styles.headerName}>{value}</div>
      },
      {
        Header: () => <div className={styles.headerName}>{'Email'}</div>,
        accessor: 'email',
        Cell: ({ value }) => <div className={styles.headerName}>{value}</div>
      },

      {
        Header: () => <div className={styles.headerName}>{'Project'}</div>,
        accessor: 'project',
        Cell: (props) => (
          <div className={styles.projectContainer}>
            <div className={styles.icon} onClick={() => {}}>
              <SelectProjectIcon />
              {/*<div className={styles.dropdown}>*/}
              {/*  {props.row.original.project.map((el: any) => (*/}
              {/*    <div key={el} className={styles.dropdown_item}>*/}
              {/*      {el}*/}
              {/*    </div>*/}
              {/*  ))}*/}
              {/*</div>*/}

              <div className={styles.headerName}>
                {props.row.original.project.map((el: any) => el.project_name).join()}
              </div>
            </div>
            <div className={styles.iconContainer}>
              <DeleteDevIcon />
            </div>
          </div>
        )
      }
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

  return (
    <table {...getTableProps()} className={styles.tableContainer}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()} className={styles.tableHeader}>
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} className={styles.border}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()} className={styles.tableCell}>
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
export default DevTeamTable;
