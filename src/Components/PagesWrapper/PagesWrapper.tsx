import React from "react";
import Header from "../Header";
import UserMenu from "../Header/Menu";
import { ProSidebarProvider } from "react-pro-sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { PathNames } from "../../Pages/Router/Router";
import styles from "./PagesWrapper.module.css";
import Home from "../../Pages/Home";

const PagesWrapper = () => {
  const { pathname } = useLocation();
  return (
    <ProSidebarProvider>
      <div className={styles.container}>
        <UserMenu />
        <div className={styles.menuContainer}>
          <Header />
          {pathname === PathNames.Home ? <Home /> : <Outlet />}
        </div>
      </div>
    </ProSidebarProvider>
  );
};

export default PagesWrapper;
