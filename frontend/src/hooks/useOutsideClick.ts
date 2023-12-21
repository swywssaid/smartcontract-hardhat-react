import { useEffect, RefObject, useCallback } from "react";

// 모달 바깥 클릭 시 닫히게 만드는 커스텀 훅
function useOutsideClick(
  ref: RefObject<HTMLElement>,
  callback: () => void,
  avatarRef: any
) {
  const handleClickOutside = useCallback(
    (e: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node) &&
        !avatarRef.current.contains(e.target as Node)
      ) {
        callback();
      }
    },
    [ref, callback, avatarRef]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, callback, handleClickOutside]);
}

export default useOutsideClick;
