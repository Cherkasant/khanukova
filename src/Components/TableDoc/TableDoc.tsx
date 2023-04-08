import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import classNames from 'classnames';

import DocumentIcon from '../../Assets/icons/DocumentIcon';
import ProfileDocIcons from '../../Assets/icons/ProfileDocIcon';

import styles from './TableDoc.module.css';

type TableDocType = {
  docArr: any
}
const titleDoc = ['Title', 'Create by', 'Created time', 'Label'];
const TableDoc: React.FC<TableDocType> = ({ docArr }) => {
  return (
    <TableContainer sx={{ marginBottom: '12px' }}>
      <Table sx={{ minWidth: 650, backgroundColor: 'transparent' }} aria-label="a dense table">
        <TableHead>
          <TableRow>
            {titleDoc.map((value, index) => (
              <TableCell
                key={index}
                sx={{
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: '17px',
                  color: '#A3A3A3',
                  borderBottom: '1px solid #A3A3A3',
                  paddingBottom: '8px',
                  '&::first-of-type': { paddingLeft: '70px' }
                }}
                align={value === 'Title' ? 'left' : 'center'}>
                {value}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {docArr.map((value: any) => (
            <TableRow key={value.nameDoc}>
              <TableCell
                component="th"
                scope="row"
                sx={{
                  padding: '11px 0 11px 42px',
                  borderBottom: '1px solid #A3A3A3',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '19px'
                }}>
                <div className={styles.innerTitleDoc}>
                  <DocumentIcon width={'20'} height={'24'} />
                  {value.nameDoc}
                </div>
              </TableCell>
              <TableCell
                sx={{ padding: '11px 0 11px 6px', borderBottom: '1px solid #A3A3A3', fontSize: '14px' }}
                align="center">
                <div className={styles.innerCreatedDoc}>
                  <ProfileDocIcons />
                  {value.created}
                </div>
              </TableCell>
              <TableCell
                sx={{ padding: '11px 0 11px 6px', borderBottom: '1px solid #A3A3A3', fontSize: '14px' }}
                align="center">
                {value.data}
              </TableCell>
              <TableCell
                sx={{
                  padding: '11px 0 11px 6px',
                  borderBottom: '1px solid #A3A3A3',
                  fontSize: '14px'
                }}
                align="center">
                <div className={classNames(styles.label)}> {value.label}</div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableDoc;
