import { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';

import { Navigate, View } from 'react-big-calendar';

import PrevIcon from '../../../Assets/icons/PrevIcon';
import NextIcon from '../../../Assets/icons/NextIcon';

import styles from './SmallCalendarToolbar.module.css';

interface SmallCalendarToolbarProps {
  onNavigate: (navigate: 'PREV' | 'NEXT' | 'TODAY') => void;
  label: string;
  activeView: View;
  onView: (view: View) => void;
}

const SmallCalendarToolbar = ({ onNavigate, label, activeView, onView }: SmallCalendarToolbarProps) => {
  const [currentView, setCurrentView] = useState<View>(activeView);

  useEffect(() => {
    onView(currentView);
  }, []);

  const handleViewChange = (view: View) => {
    onView(view);
    setCurrentView(view);
  };

  const formattedLabel = label.replace(/\b0(?=\d)/g, '');

  return (
    <div className={styles.toolbar}>
      <button className={styles.today} onClick={() => onNavigate(Navigate.TODAY)}>
        Today
      </button>
      <div className={styles.navigation}>
        <IconButton onClick={() => onNavigate(Navigate.PREVIOUS)}>
          <PrevIcon />
        </IconButton>
        <IconButton onClick={() => onNavigate(Navigate.NEXT)}>
          <NextIcon />
        </IconButton>
      </div>
      <span className={styles.data}>
        <strong>{formattedLabel}</strong>
      </span>
      <div className={styles.viewButtons}>
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

export default SmallCalendarToolbar;
