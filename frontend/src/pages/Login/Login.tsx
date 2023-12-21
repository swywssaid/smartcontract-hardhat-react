import React, { useState } from "react";
import { login } from "../../redux/features/auth/authSlice";
import { useDispatch } from "react-redux";
import styles from "./Login.module.css";

// 로그인 페이지 컴포넌트
export default function Login() {
  const [pin, setPin] = useState("");
  const dispatch = useDispatch();

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPin(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (pin === "") {
      alert("닉네임을 입력해주세요.");
    } else if (pin === "test") {
      dispatch(login(pin));
      getLocation();
    } else {
      alert("일치하는 닉네임이 없습니다.");
    }
    setPin("");
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(
        function (position) {
          alert(position.coords.latitude + " " + position.coords.longitude);
        },
        function (error) {
          console.error(error);
        },
        {
          enableHighAccuracy: false,
          maximumAge: 0,
          timeout: Infinity,
        }
      );
    } else {
      alert("GPS를 지원하지 않습니다");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h2>OntheCafe</h2>
        <p>Please Login</p>
        <form className={styles.content} onSubmit={handleSubmit}>
          <input
            className={styles.input}
            type="text"
            placeholder="닉네임을 입력해주세요."
            value={pin}
            onChange={handlePinChange}
          />
          <button className={styles.button}>로그인</button>
        </form>
      </div>
    </div>
  );
}
