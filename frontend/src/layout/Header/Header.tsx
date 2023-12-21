import React, { useState, useRef } from "react";
import styles from "./Header.module.css";
import { Avatar, Button, IconButton, Typography } from "@mui/material";
import Modal from "@components/common/Modal/Modal";
import { styled } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@redux/features/auth/authSlice";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation } from "react-router-dom";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { setSidebarOpen } from "@redux/features/sidebar/sidebarOpenSlice";
import { RootState } from "@redux/app/store";

const CustomButton = styled(Button)({
  width: "90%",
  fontWeight: "regular",
  marginTop: "0.5rem",
  color: "#ffffff",
  backgroundColor: "#111927",
  borderColor: "transparent",
  borderWidth: "0.0625rem",
  borderRadius: "0.375rem",
  "&:hover": {
    backgroundColor: "#2f3746",
  },
});

function Header() {
  const [isOpened, setIsOpened] = useState(false);
  const dispatch = useDispatch();
  const avatarRef = useRef(null);
  const location = useLocation();
  const { isSidebarOpen } = useSelector(
    (state: RootState) => state.sidebarOpen
  );

  const handleSignOut = () => {
    dispatch(logout());
  };

  const closeModal = () => {
    setIsOpened(false);
  };

  const handleClickMenu = () => {
    dispatch(setSidebarOpen(!isSidebarOpen));
  };

  return (
    <header className={styles.wrapper}>
      <div className={styles.menuContainer}>
        <IconButton onClick={handleClickMenu}>
          {isSidebarOpen ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
        <Typography
          variant="h5"
          fontWeight="bold"
          color="#000000"
          style={{ paddingLeft: "1rem" }}
        >
          {location.pathname === "/"
            ? "OVERVIEW"
            : location.pathname.slice(1).toUpperCase()}
        </Typography>
      </div>
      <div className={styles.container}>
        <Avatar
          ref={avatarRef}
          className={styles.avatar}
          onClick={() => setIsOpened((prev) => !prev)}
        />
        <Modal
          isOpen={isOpened}
          title="ACCOUNT"
          description="Admin"
          onClose={closeModal}
          avatarRef={avatarRef}
        >
          <CustomButton onClick={handleSignOut}>로그아웃</CustomButton>
        </Modal>
      </div>
    </header>
  );
}

export default Header;
