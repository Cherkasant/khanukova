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
  docArr: any;
};

const titleDoc = ['Positions', 'Create by', 'Created time', 'Label'];
const TableDoc: React.FC<TableDocType> = ({ docArr }) => {
  return (
    <TableContainer sx={{}}>
      <Table
        sx={{ minWidth: 650, backgroundColor: '#7AA8F3', borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}
        aria-label="a dense table">
        <TableHead>
          <TableRow>
            {titleDoc.map((value, index) => (
              <TableCell
                key={index}
                sx={{
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '17px',
                  color: '#FFFFFF',
                  padding: '8.5px 10px 8.5px 20px'
                }}
                align={'left'}>
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
                  padding: '15px 10px 15px 15px',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '24px',
                  backgroundColor: 'white',
                  borderBottom: 'none'
                }}>
                <div className={styles.innerTitleDoc}>
                  <DocumentIcon width={'20'} height={'24'} />
                  {value.nameDoc}
                </div>
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: 'none',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '16px',
                  backgroundColor: 'white'
                }}
                align="left">
                <div className={styles.innerCreatedDoc}>
                  <ProfileDocIcons />
                  {value.created}
                </div>
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: 'none',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '16px',
                  backgroundColor: 'white'
                }}
                align="left">
                {value.data}
              </TableCell>
              <TableCell
                sx={{
                  borderBottom: 'none',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '16px',
                  backgroundColor: 'white'
                }}
                align="left">
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
