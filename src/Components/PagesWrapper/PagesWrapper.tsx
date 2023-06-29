import { ProSidebarProvider } from 'react-pro-sidebar';
import { Outlet, useLocation } from 'react-router-dom';

import Header from '../Header';
import { PathNames } from '../../Pages/Router/Router';
import Home from '../../Pages/Home';
import UserMenu from '../Header/Menu';

import styles from './PagesWrapper.module.css';

const PagesWrapper = () => {
  const { pathname } = useLocation();
  return (
    <ProSidebarProvider>
      <div className={styles.container}>
        <Header />
        <div className={styles.menuContainer}>
          <UserMenu />
          <div className={styles.main}>{pathname === PathNames.Home ? <Home /> : <Outlet />}</div>
        </div>
      </div>
    </ProSidebarProvider>
  );
};

export default PagesWrapper;
