import React, { useMemo } from 'react'
import { Column, useTable } from 'react-table'
import styles from './DevTeamTable.module.css'
import PuzzleButton, { PuzzleButtonTypes } from '../PuzzleButton'
import { TrashIcon } from '../../Assets/icons/TrashIcon'
import { EditTitleIcon } from '../../Assets/icons/EditTitleIcon'
import { useNavigate } from 'react-router'
import { PathNames } from '../../Pages/Router/Router'

const DevTeamTable = () => {
	const navigate = useNavigate()
	const data = useMemo(
		() => [
			{
				name: 'Pever Anna',
				position: 'Developer',
				email: 'anna@gmail.com',
				project: 'Project name, Mobile App',
				button: '',
				telegram: ''
			},
			{
				name: 'Noir Bella',
				position: 'QA Engineer ',
				email: 'bella@gmail.com',
				project: 'Game',
				button: '',
				telegram: '@nov_bell'
			},
			{
				name: 'Irian Mihail',
				position: 'UX Designer',
				email: 'ir777@gmail.com',
				project: 'Project name, Mobile App',
				button: '',
				telegram: '@ir777'
			}
		],
		[]
	)

	const columns: Array<Column> = useMemo(
		() => [
			{
				Header: () => <div className={styles.headerName}>{'Name'}</div>,
				accessor: 'name',
				Cell: (props: any) => (
					<div className={styles.nameContainer}>
						<div className={styles.avatar}>
							{props.row.original.name.split(' ')[0][0]}
							{props.row.original.name.split(' ')[1][0]}
						</div>
						<div className={styles.infoContainer}>
							<div
								className={styles.name}
								onClick={() => navigate(PathNames.ProfileDevTeam)}
							>
								{props.row.original.name}{' '}
							</div>
							<div className={styles.telegram}>
								{props.row.original.telegram}
							</div>
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
				Cell: ({ value }) => <div className={styles.headerName}>{value}</div>
			},
			{
				Header: '',
				accessor: 'button',
				Cell: () => (
					<div className={styles.buttonContainer}>
						<div className={styles.btnBlock}>
							<PuzzleButton
								btnTitle={'Reject'}
								btnType={PuzzleButtonTypes.TextButton}
								btnClassName={styles.btn}
								btnDisabled={true}
							/>
							<PuzzleButton
								btnTitle={'Approve'}
								btnType={PuzzleButtonTypes.TextButton}
								btnClassName={styles.btn}
								btnDisabled={true}
							/>
						</div>

						<div className={styles.iconContainer}>
							<TrashIcon />
							<EditTitleIcon />
						</div>
					</div>
				)
			}
		],
		[]
	)

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({ columns, data })

	return (
		<table {...getTableProps()} className={styles.tableContainer}>
			<thead>
				{headerGroups.map(headerGroup => (
					<tr {...headerGroup.getHeaderGroupProps()}>
						{headerGroup.headers.map(column => (
							<th {...column.getHeaderProps()} className={styles.tableHeader}>
								{column.render('Header')}
							</th>
						))}
					</tr>
				))}
			</thead>
			<tbody {...getTableBodyProps()}>
				{rows.map(row => {
					prepareRow(row)
					return (
						<tr {...row.getRowProps()}>
							{row.cells.map(cell => {
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
		</table>
	)
}
export default DevTeamTable
