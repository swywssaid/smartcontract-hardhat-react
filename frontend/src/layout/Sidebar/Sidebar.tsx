import styles from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import cn from "classnames";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import { Divider } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "@redux/app/store";

function Sidebar() {
  const { isSidebarOpen } = useSelector(
    (state: RootState) => state.sidebarOpen
  );
  const pages = [
    { id: 1, name: "Overview", path: "/", icon: <DashboardIcon /> },
    { id: 2, name: "Dashboard", path: "/dashboard", icon: <PeopleIcon /> },
  ];

  return (
    <div className={isSidebarOpen ? styles.wrapper : styles.sidebarClose}>
      <h2>OntheCafe</h2>
      <Divider component="li" sx={{ borderColor: "#2f3746" }} />
      <ul>
        {pages.map((page) => (
          <li key={page.id}>
            <NavLink
              to={page.path}
              className={({ isActive }) => cn(isActive && styles.active)}
            >
              {page.icon}
              {page.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
