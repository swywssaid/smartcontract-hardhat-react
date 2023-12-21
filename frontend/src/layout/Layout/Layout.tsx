import Sidebar from "@layout/Sidebar/Sidebar";
import React from "react";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import Header from "@layout/Header/Header";
import { useSelector } from "react-redux";
import { RootState } from "@redux/app/store";
import Footer from "@layout/Footer/Footer";

// overview 레이아웃
function Layout() {
  const { isSidebarOpen } = useSelector(
    (state: RootState) => state.sidebarOpen
  );
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <div className={isSidebarOpen ? styles.container : styles.sidebarClose}>
        <Header />
        <div className={styles.content}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
