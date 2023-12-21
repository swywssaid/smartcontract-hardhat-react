import { RootState } from "@redux/app/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

// 로그인 권한이 없는 라우트
const PublicRoute = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth);
  return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
};
export default PublicRoute;
