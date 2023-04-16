import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import * as React from 'react';

import { useState } from 'react';
import { useSelector } from 'react-redux';

import ArrowDocIcon from '../../Assets/icons/ArrowDocIcon';
import TableDoc from '../TableDoc';
import postSelector from '../../Redux/Selectors/postSelector';

import styles from './AccordionDoc.module.css';

type AccordionDocProps = {
  addDocRef: any;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const AccordionDoc: React.FC<AccordionDocProps> = ({ setModal, addDocRef }) => {
  const milestone = useSelector(postSelector.getAllMilestones);
  const [id, setId] = useState(0);
  const [expanded, setExpanded] = React.useState<string | false>('');
  const handleChange = (panel: string, id: number) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
    setId(id);
  };

  const Accordion = styled((props: AccordionProps) => <MuiAccordion disableGutters elevation={0} square {...props} />)(
    ({ theme }) => ({
      backgroundColor: 'transparent',
      border: 0,
      '&:not(:last-child)': {
        marginBottom: '40px'
      },
      '&:before': {
        display: 'none'
      }
    })
  );

  const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary expandIcon={<ArrowDocIcon />} {...props} />
  ))(({ theme }) => ({
    backgroundColor: 'transpoernt',
    flexDirection: 'row-reverse',
    padding: 0,
    '& .MuiAccordionSummary-expandIconWrapper': {},
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
      transform: 'rotate(90deg)'
    },
    '& .MuiAccordionSummary-content': {
      margin: 0,
      marginLeft: 10
    },
    '& .MuiTypography-root': {
      padding: '10px',
      fontWeight: 700,
      fontSize: '18px',
      lineHeight: '22px',
      color: '#212121',
      backgroundColor: '#D9E1F0',
      borderRadius: '5px'
    }
  }));

  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: '14px 0 12px',
    textAlign: 'start'
  }));

  return (
    <div className={styles.accordionWrap}>
      {milestone.map((value, index) => (
        <Accordion
          expanded={expanded === value.milestone_name}
          onChange={handleChange(value.milestone_name, value.id)}
          key={index}>
          <AccordionSummary aria-controls="panel1d-content" id={value.milestone_name}>
            <Typography>{value.milestone_name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableDoc docArr={[]} />
            {/* тут потом вставить документы */}
            <div>
              <div
                ref={addDocRef}
                onClick={(event) => {
                  event.stopPropagation();
                  setModal(true);
                }}
                className={styles.addDoc}>
                + Add new documents
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default AccordionDoc;
