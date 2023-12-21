import React, { useRef } from "react";
import styles from "./Modal.module.css";
import { Divider } from "@mui/material";
import cn from "classnames";
import useOutsideClick from "@hooks/useOutsideClick";

interface ModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  children: React.ReactNode;
  onClose: () => void; // Add the onClose prop
  avatarRef: any;
}

// 모달 컴포넌트
function Modal({
  isOpen,
  title,
  description,
  children,
  onClose,
  avatarRef,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useOutsideClick(modalRef, onClose, avatarRef);
  return (
    <div
      ref={modalRef}
      className={cn(styles.wrapper, { [styles.open]: isOpen })}
    >
      <h3>{title}</h3>
      <p>{description}</p>
      <Divider />
      <div className={styles.buttonContainer}>{children}</div>
    </div>
  );
}

export default Modal;
