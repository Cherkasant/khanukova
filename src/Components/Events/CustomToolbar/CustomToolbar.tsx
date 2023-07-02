import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import styles from './CustomToolbar.module.css';

type viewType = 'month' | 'week' | 'day';

const CustomToolbar = ({
  onNavigate,
  label,
  onView
}: {
  onNavigate: (navigate: 'PREV' | 'NEXT' | 'TODAY') => void;
  label: string;
  onView: (view: viewType) => void;
}) => {
  const [currentView, setCurrentView] = useState<viewType>('month');

  const handlePrev = () => {
    onNavigate('PREV');
  };

  const handleNext = () => {
    onNavigate('NEXT');
  };

  const handleToday = () => {
    onNavigate('TODAY');
  };

  const handleViewChange = (view: viewType) => {
    onView(view);
    setCurrentView(view);
  };

  return (
    <div className={styles.toolbar}>
      <button className={styles.today} onClick={handleToday}>
        Today
      </button>
      <div className={styles.navigation}>
        <IconButton onClick={handlePrev}>
          <ChevronLeftIcon className={styles.arrow} />
        </IconButton>
        <IconButton onClick={handleNext}>
          <ChevronRightIcon className={styles.arrow} />
        </IconButton>
      </div>
      <span className={styles.data}>{label}</span>
      <div className={styles.viewButtons}>
        <button onClick={() => handleViewChange('month')} className={currentView === 'month' ? styles.active : ''}>
          Month
        </button>
        <button onClick={() => handleViewChange('week')} className={currentView === 'week' ? styles.active : ''}>
          Week
        </button>
        <button onClick={() => handleViewChange('day')} className={currentView === 'day' ? styles.active : ''}>
          Day
        </button>
      </div>
    </div>
  );
};

export default CustomToolbar;
